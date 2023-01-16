const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const { getPathByLocale } = require(`../helpers/hooks`);

const query = (graphql) => {
  return graphql(`
  {
    ${contentModel.globalNavigation}
    ${contentModel.promoLine}
    allContentfulFaqPage(filter: { node_locale: { eq: "lt-LT" } }) {
      edges {
        node {
          contentful_id
          node_locale
          slug
          metaTitle
          forceTranslate
          categories {
            ... on ContentfulFaqCategory {
              ${contentModel.pageData}
              iconType
              ${contentModel.seo}
              ${contentModel.hero}
              content {
                ... on Node {
                  id
                  internal {
                    type
                  }
                  ... on ContentfulFaqItem {
                    ${contentModel.faqItem}
                  }
                  ... on ContentfulResourceListModule {
                    ${contentModel.resourceListModule}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `);
};

const createFaqPages = (result, createPage) => {
  const faqPages = result.data.allContentfulFaqPage.edges.map(
    (edge) => edge.node
  );
  const globalNavigation = result.data.allContentfulNavigation.edges.map(
    (edge) => edge.node
  );
  const globalPromoLine = result.data.allContentfulPromoLineModule.edges.map(
    (edge) => edge.node
  );

  faqPages.forEach((faqPage) => {
    const locale = faqPage?.forceTranslate || faqPage?.node_locale;
    if (
      faqPage?.slug &&
      faqPage?.metaTitle &&
      faqPage?.node_locale === `lt-LT`
    ) {
      const navigation = globalNavigation
        .filter((item) => item.node_locale === locale)
        .shift();
      const promoLine = globalPromoLine
        .filter((item) => item.node_locale === locale)
        .shift();

      const rootPath = getPathByLocale(locale, faqPage?.slug);

      faqPage.categories.forEach((faqCategory) => {
        const categoryPath = `${rootPath}/${faqCategory.slug}`;

        createPage({
          path: categoryPath,
          component: path.resolve(`./src/templates/faqPage.jsx`),
          context: {
            ...faqCategory,
            node_locale: locale || faqPage.node_locale,
            categories: faqPage?.categories || [],
            navigation,
            promoLine,
            rootPath,
          },
        });
      });
    }
  });
};

module.exports = {
  query,
  createFaqPages,
};
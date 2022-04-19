import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Title, Meta } from "react-head";

// Components.
import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import Section from "../../components/Section";
import LinkCollection from "../../components/LinkCollection";
import LinkCollectionItem from "../../components/LinkCollection/LinkCollectionItem";
import NavigationGroup from "../../components/NavigationGroup";

// Constants.
import { NAVIGATION_HOW_CAN_I_HELP } from "../../constants/Navigation";

const Page = ({ data }) => {
  const crumbs = [`Kaip galiu padėti?`];
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  return (
    <Layout pagePath="/kaip-galiu-padeti/">
      <Title>Kaip galiu padėti?</Title>

      {!!content && (
        <Constraint>
          <NavigationGroup crumbs={crumbs} />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <Meta name="description" content={content.excerpt} />
        </Constraint>
      )}

      <Section className="LinksCollectionWrapper">
        <Constraint>
          <LinkCollection>
            {NAVIGATION_HOW_CAN_I_HELP.map((item) => {
              return (
                <LinkCollectionItem
                  key={item.pathname}
                  to={item.pathname}
                  text={item.title}
                />
              );
            })}
          </LinkCollection>
        </Constraint>
      </Section>
    </Layout>
  );
};

export const query = graphql`
  query {
    contents: allFile(
      filter: {
        sourceInstanceName: { eq: "page-contents" }
        absolutePath: { regex: "//src/content/pages/kaip-galiu-padeti.md$/" }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
            }
            html
            excerpt(format: PLAIN, pruneLength: 160)
          }
        }
      }
    }
  }
`;

Page.propTypes = {
  data: PropTypes.shape({
    contents: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
              }),
            }),
            html: PropTypes.string,
            excerpt: PropTypes.string,
          }),
        })
      ),
    }),
  }),
};

export default Page;

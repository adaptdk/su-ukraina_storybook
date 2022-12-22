import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import Section from "../components/Section";
import HeroBanner from "../components/HeroBanner";
import Button from "../components/Button";
import LinkCollectionWithImage from "../components/LinkCollectionWithImage";
import PartnerList from "../components/PartnerList";
import Partner from "../components/Partner";
import {
  NAVIGATION_ITEM_REFUGEE_GUIDE,
  NAVIGATION_MAIN_MENU_ALT,
} from "../constants/Navigation";

import {
  gatsbyImagePropType,
  localePropType,
  navigationPropTypes,
} from "../helpers/genericPropTypes";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Constraint from "../components/Constraint";
import CtaCard from "../components/CtaCard";
import PromoLine from "../components/PromoLine";
import { getTranslatedText } from "../utils/getTranslatedText";
import { filterPartners } from "../utils/filters";

const HomePage = ({ path, pageContext }) => {
  const {
    navigation,
    metaTitle,
    metaDescription,
    heroImage,
    heroTitle,
    heroCtaCards,
    mainSectionHeading,
    mainSectionImage,
    mainSectionLinks,
    informationPartners,
    contentPartners,
    technologyPartners,
    institutionPartners,
  } = pageContext;

  const partners = [
    {
      heading: getTranslatedText(`partners.informationHeading`),
      data: filterPartners(informationPartners),
    },
    {
      heading: getTranslatedText(`partners.contentHeading`),
      data: filterPartners(contentPartners),
    },
    {
      heading: getTranslatedText(`partners.technologyHeading`),
      data: filterPartners(technologyPartners),
    },
    {
      heading: getTranslatedText(`partners.institutionHeading`),
      data: filterPartners(institutionPartners),
    },
  ];

  return (
    <Layout
      pagePath={path}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      navigation={navigation}
    >
      {heroImage && (
        <Section className="HeroSection">
          <GatsbyImage
            className="HeroSection__background"
            image={getImage(heroImage)}
            alt=""
          />
          <HeroBanner title={heroTitle}>
            <Constraint className="HeroBanner__inner">
              {heroCtaCards?.at(0) &&
                heroCtaCards.map((item) => {
                  return (
                    <CtaCard
                      key={item.id}
                      title={item.label}
                      link={item.url}
                      iconHandle={item.iconType}
                    />
                  );
                })}
            </Constraint>
          </HeroBanner>
        </Section>
      )}

      {/* @todo: connect to contentful */}
      <Section>
        <PromoLine
          title="Вся важлива інформація для громадян України"
          titleLink={NAVIGATION_ITEM_REFUGEE_GUIDE.slug}
          large={true}
        >
          {NAVIGATION_MAIN_MENU_ALT.map((item) => {
            return (
              <Button
                key={item.slug}
                endIcon={`arrow-blue`}
                to={item.slug}
                color={`secondary`}
                target="_blank"
                rel="noopener"
              >
                {item.altTitle || item.title}
              </Button>
            );
          })}
        </PromoLine>
      </Section>

      {mainSectionLinks && mainSectionHeading && (
        <Section className="BeVigilantSection">
          <Constraint>
            <LinkCollectionWithImage
              image={mainSectionImage}
              title={mainSectionHeading}
            >
              {mainSectionLinks.map(({ id, url, label }) => {
                if (!label || !url) {
                  return null;
                }
                return (
                  <li key={id}>
                    <Button
                      endIcon={`arrow-blue`}
                      to={url}
                      color={`transparent`}
                    >
                      {label}
                    </Button>
                  </li>
                );
              })}
            </LinkCollectionWithImage>
          </Constraint>
        </Section>
      )}

      {/* @todo: maybe clean this up */}
      {/* basically here we check if atleast one partner item has the necessary data */}
      {partners.some((obj) => {
        return obj.data?.at(0);
      }) && (
        <Section className="PartnerSection">
          <Constraint>
            <h2 className="Section__title">
              {getTranslatedText(`partners.heading`)}
            </h2>

            {partners.map((partner) => {
              if (!partner.data?.at(0)) {
                return null;
              }
              return (
                <div key={partner.heading} className="PartnerSection__category">
                  <h3>{partner.heading}</h3>
                  <PartnerList>
                    {partner.data.map((partner, i) => {
                      return (
                        <Partner
                          key={i}
                          title={partner.title}
                          logo={partner.logo}
                          website={partner.website}
                        />
                      );
                    })}
                  </PartnerList>
                </div>
              );
            })}
          </Constraint>
        </Section>
      )}
    </Layout>
  );
};

const partnerPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    logo: gatsbyImagePropType.isRequired,
  })
);

HomePage.propTypes = {
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.shape({
    navigation: navigationPropTypes.isRequired,
    id: PropTypes.string.isRequired,
    node_locale: localePropType.isRequired,
    metaTitle: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    heroTitle: PropTypes.string.isRequired,
    heroImage: gatsbyImagePropType.isRequired,
    heroCtaCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        iconType: PropTypes.oneOf([`volunteer`, `donate`, `ua-flag`]),
      })
    ),
    mainSectionHeading: PropTypes.string.isRequired,
    mainSectionImage: gatsbyImagePropType.isRequired,
    mainSectionLinks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    informationPartners: partnerPropTypes,
    contentPartners: partnerPropTypes,
    technologyPartners: partnerPropTypes,
    institutionPartners: partnerPropTypes,
  }),
};

HomePage.defaultProps = {
  pageContext: {
    informationPartners: [],
    contentPartners: [],
    technologyPartners: [],
    institutionPartners: [],
  },
};

export default HomePage;

import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb } from "gatsby-plugin-breadcrumb";

import "./Breadcrumbs.css";
import { kebabCaseToTitleCase } from "../../helpers/formatting";
import { getTranslatedText } from "../../utils/getTranslatedText";

const Breadcrumbs = ({ crumbs }) => {
  const formattedCrumbs = crumbs.map(({ pathname, crumbLabel }) => {
    if (pathname === `/`) {
      return {
        // need to have pathname without trailing slash, because we're excluding
        // both /ua/ & /en/ pathnames below
        pathname: getTranslatedText(`pagePath.homeNoTrailing`),
        crumbLabel: getTranslatedText(`labels.homePage`),
      };
    }
    return { pathname, crumbLabel: kebabCaseToTitleCase(crumbLabel) };
  });

  return (
    <div className="Breadcrumbs">
      <Breadcrumb crumbs={formattedCrumbs} hiddenCrumbs={[`/ua/`, `/en/`]} />
    </div>
  );
};

Breadcrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      crumbLabel: PropTypes.string.isRequired,
    })
  ),
};

export default Breadcrumbs;

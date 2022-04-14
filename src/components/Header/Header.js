import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

// Components.
import Constraint from "../Constraint";
import Button from "../Button";

// SVGs.
import Logo from "../../images/logos/su-ukraina--original.svg";

// Constants.
import {
  NAVIGATION_MAIN_MENU,
  NAVIGATION_MAIN_MENU_ALT,
  NAVIGATION_EXTERNAL_LINK_PROVIDE_HELP,
} from "../../constants/Navigation";

// Helpers
import { isUkrainianPage } from "../../helpers/handlers";

// Style.
import "./Header.css";

const Header = ({ noSticky }) => {
  const [headerHeight, setHeaderHeight] = React.useState(null);
  const location = useLocation();
  const altHeader = isUkrainianPage(location.pathname);

  const headerRef = React.useRef(null);
  const pathname = location.pathname;

  React.useLayoutEffect(() => {
    const resetHeaderHeight = () => {
      const newHeight = headerRef.current?.offsetHeight;
      if (newHeight !== headerHeight) {
        setHeaderHeight(newHeight);
      }
    };

    resetHeaderHeight();
    window.addEventListener(`resize`, resetHeaderHeight);
    return () => {
      window.removeEventListener(`resize`, resetHeaderHeight);
    };
  }, []);

  const closeMenuOnSameLink = (nextPathName) => {
    if (typeof window === `undefined`) {
      return;
    }
    const menuTriggerElement = document.getElementById(`menu-sensor`);
    if (nextPathName === window.location.pathname) {
      menuTriggerElement.click();
    }
  };

  const mainMenu = () => {
    if (altHeader) {
      return NAVIGATION_MAIN_MENU_ALT;
    }
    return NAVIGATION_MAIN_MENU;
  };

  return (
    <div
      className={`Header ${noSticky ? `Header--no-sticky` : ``}`}
      ref={headerRef}
    >
      <Constraint className="Header__content">
        <Link to="/">
          <img
            className="Header__logo"
            src={Logo}
            alt="SuUkraina.lt"
            height="40"
            width="235"
          />
        </Link>
        <input type="checkbox" name="menu-sensor" id="menu-sensor" />
        <label className="Header__menu-trigger" htmlFor="menu-sensor">
          <span></span>Navigacija
        </label>
        <nav className="Header__nav" aria-label="Pagrindinė navigacija">
          <ul className="Header__menu">
            {mainMenu().map((item) => {
              return (
                <li
                  key={item.pathname}
                  className={
                    pathname.includes(item.pathname)
                      ? `Header__menu-link is-active`
                      : `Header__menu-link`
                  }
                >
                  <Link
                    aria-haspopup={!!item.children}
                    to={item.pathname}
                    onClick={() => {
                      closeMenuOnSameLink(item.pathname);
                    }}
                  >
                    {item.title}
                  </Link>
                  {item.children && (
                    <ul>
                      {item.children.map((subItem) => {
                        return (
                          <li key={subItem.pathname}>
                            <Link
                              to={subItem.pathname}
                              onClick={() => {
                                closeMenuOnSameLink(subItem.pathname);
                              }}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
            {altHeader && (
              <li>
                <Button
                  className="Header__menu-help-btn"
                  startIcon={`edit`}
                  href={NAVIGATION_EXTERNAL_LINK_PROVIDE_HELP.url}
                  color={`primary`}
                  target="_blank"
                  rel="noopener"
                >
                  {NAVIGATION_EXTERNAL_LINK_PROVIDE_HELP.title}
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </Constraint>
    </div>
  );
};

Header.propTypes = {
  noSticky: PropTypes.bool,
  altHeader: PropTypes.bool,
};

export default Header;

// Styles ----------------------------------
import "components/Header/Header.scss";

// Components ----------------------------------
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

// Images ----------------------------------
import logo from "assets/images/logo.svg";

const Header = () => {
  const [opened, setOpened] = useState(false);

  const openHandler = () => {
    const old = opened;
    setOpened(!old);
  };

  return (
    <header>
      <Link to="/" exact>
        <img src={logo} alt="LOGO" className="logo" />
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink className="header__link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="header__link" to="/types">
              Types
            </NavLink>
          </li>
        </ul>
      </nav>

      {opened && (
        <React.Fragment>
          <div className="mobileNav">
            <NavLink
              className="header__mobile__link"
              to="/"
              onClick={openHandler}
            >
              Home
            </NavLink>
            <NavLink
              className="header__mobile__link"
              to="/types"
              onClick={openHandler}
            >
              Types
            </NavLink>
          </div>

          <div className="modal" onClick={openHandler}></div>
        </React.Fragment>
      )}

      <div
        className={opened ? "hamburger open" : "hamburger"}
        onClick={openHandler}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;

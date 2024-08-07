import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";

import { ROOT_ROUTE, TESTING_ROUTE, SETTINGS_ROUTE } from "../../shared/utils/routes";

import LogoIcon from "../../assets/icons/logo.png";
import QuizIcon from "../../assets/icons/quiz.svg";
import LibraryIcon from "../../assets/icons/library.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import './navbar.sass'

const buttons = [
  [LibraryIcon, "Библиотека", ROOT_ROUTE],
  [QuizIcon, "Тестирование", TESTING_ROUTE],
  [SettingsIcon, "Настройки", SETTINGS_ROUTE],
] as [any, string, string][];

const createNavButton = ([icon, title, route]: [any, string, string]) => {
  return (
    <li className="navbar__nav">
      <a href={route} className="navbar__nav-link">
        <img
          className="navbar__nav-icon"
          src={icon}
          alt="icon"
        />
        <div className="navbar__nav-description">{title}</div>
      </a>
    </li>
  );
};

export const NavBar = observer(() => {
  const { user } = useContext(Context);
  return (
    <>
      <nav className="navbar">
        <div className="navbar__brand">
          <a href={ROOT_ROUTE}>
            <img
              className="navbar__logo"
              src={LogoIcon}
              alt="logo"
            />
          </a>
        </div>
        <ul className="navbar__list">
          { buttons.map(createNavButton) }
        </ul>
      </nav>
    </>
  );
});

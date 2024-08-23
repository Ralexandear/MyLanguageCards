import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";

import { ROOT_ROUTE, TESTING_ROUTE, SETTINGS_ROUTE } from "../../shared/utils/routes";

import LogoIcon from "../../assets/icons/logo.png";
import './navbar.sass'
import { Container, Row, Button, Navbar } from "react-bootstrap";


const buttons = [
  ['library', 'library_books', "Мои наборы", ROOT_ROUTE],
  ['add', 'add_circle', "Новая карточка", TESTING_ROUTE],
  // ['stats', 'monitoring', "Статистика", SETTINGS_ROUTE],
  ['settings-desktop', 'manage_accounts', 'Настройки', SETTINGS_ROUTE]
] as string[][];

const createNavButton = (key: number, [id, icon, title, route]: string[]) => {
  const elemId = 'btn_' + id
  return (
    <li className="navbar__nav button p-2" key={key} id={elemId}>
      <a href={route} className="navbar__nav-link">
        <span className="material-symbols-outlined navbar__nav-icon d-flex flex-column justify-content-center align-items-center">
        {icon}
        </span>
        <div className="navbar__nav-description d-none d-lg-flex flex-column justify-content-center">{title}</div>        
      </a>
    </li>
  );
};

export const NavBar = observer(() => {
  const { user, vocabularies } = useContext(Context);
  const selectedVocabulary = user.selectedVocabularyId ? vocabularies.getById(user.selectedVocabularyId) : null;

  return (
    <>
      <Navbar className="bg-body-tertiary justify-content-between position-fixed top-0 px-3 d-flex d-sm-none">
        <div className="navbar__brand d-sm-flex justify-content-center">
            <a href={ROOT_ROUTE}>
              <img
                className="navbar__logo d-sm-none"
                src={LogoIcon}
                alt="logo"
              />
            </a>
          </div>
          <a href={SETTINGS_ROUTE}>
            <span className="material-symbols-outlined navbar__nav-icon d-flex flex-column justify-content-center align-items-center">
              manage_accounts
            </span>
          </a>
      </Navbar>
      <Navbar className="bg-body-tertiary justify-content-between py-3">
        <div className="w-100">
          <div className="navbar__brand d-sm-flex justify-content-center">
            <a href={ROOT_ROUTE}>
              <img
                className="navbar__logo d-none d-sm-block"
                src={LogoIcon}
                alt="logo"
              />
            </a>
          </div>
          <ul className="navbar__list px-sm-3">
            { buttons.map((e, el) => createNavButton(el, e)) }
          </ul>
        </div>
        <div>
        {
          selectedVocabulary
          &&
            <Button variant="light" id="btn_select-language" onClick={() => user.selectedVocabularyId = null} className="d-none d-sm-block">
              <div>
                { vocabularies.languages.getById(selectedVocabulary._learningLanguageId)._label }
              </div>
            </Button>
        }
        </div>
        </Navbar>
    </>
  );
});

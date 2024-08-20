import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";

import { ROOT_ROUTE, TESTING_ROUTE, SETTINGS_ROUTE } from "../../shared/utils/routes";

import LogoIcon from "../../assets/icons/logo.png";
import './navbar.sass'
import { Container, Row, Button } from "react-bootstrap";


const buttons = [
  ['add', 'add_circle', "Новая карточка", TESTING_ROUTE],
  ['library', 'library_books', "Мои наборы", ROOT_ROUTE],
  ['stats', 'monitoring', "Статистика", SETTINGS_ROUTE],
  ['settings', 'manage_accounts', 'Настройки', SETTINGS_ROUTE]
] as string[][];

const createNavButton = ([id, icon, title, route]: string[]) => {
  const elemId = 'btn_' + id
  return (
    <li className="navbar__nav button p-2" key={icon + title} id={elemId}>
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
      <nav className="navbar py-3">
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
          <ul className="navbar__list px-3">
            { buttons.map(createNavButton) }
          </ul>
        </div>
        {
          selectedVocabulary
          &&
          // <button className="button p-3" >
            <Button variant="light" id="btn_select-language" onClick={() => user.selectedVocabularyId = null}>
              {
                [selectedVocabulary._sourceLanguageId, selectedVocabulary._targetLanguageId].map((e, el, arr) => {
                  return <div className={el === arr.length - 1 ? '' : 'mb-2'}>{vocabularies.languages.getById(e)._label}</div>
                })
              }
            </Button>
          //{/* </button> */}
        }
      </nav>
    </>
  );
});

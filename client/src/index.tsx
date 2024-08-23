import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import { ContextAttributes } from "./interfaces/ContextAttributes";
import "./styles/style.sass"
import VocabularyStore from "./store/VocabularyStore";
import GroupStore from "./store/GroupStore";

export const Context = createContext({} as ContextAttributes);

const rootElement = document.getElementById("root") as HTMLElement
const root = ReactDOM.createRoot( rootElement );

root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      vocabularies: new VocabularyStore(),
      groups: new GroupStore()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
);

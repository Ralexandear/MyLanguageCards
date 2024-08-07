import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import { ContextAttributes } from "./interfaces/ContextAttributes";
import './styles/reset.scss'
import './styles/normalize.scss'
import './styles/main.sass'

export const Context = createContext({} as ContextAttributes);

const rootElement = document.getElementById("root") as HTMLElement
const root = ReactDOM.createRoot( rootElement );

root.render(
  <React.StrictMode>
    <Context.Provider value={{ user: new UserStore() }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
);

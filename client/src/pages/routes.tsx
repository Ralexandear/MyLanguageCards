import Auth from "./Auth";
import Dashboard from "./Dashboard";
import {
  REGISTRATION_ROUTE,
  ROOT_ROUTE,
  VOCABULARY_ROUTE,
} from "../shared/utils/routes";
import Vocabulary from "./Vocabulary";

export const authRoutes = [
  {
    path: ROOT_ROUTE,
    Component: Dashboard,
  },
  {
    path: VOCABULARY_ROUTE,
    Component: Vocabulary,
  },
  // {
  //   path: VOCABULARY_ROUTE + '/:id',
  //   Component: Vocabulary
  // },
  // {
  //   path: CARDS_ROUTE,
  //   Component: Cards
  // }
];

export const publicRoutes = [
  {
    path: ROOT_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
];

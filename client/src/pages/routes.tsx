import Auth from "./Auth";
import {
  REGISTRATION_ROUTE,
  ROOT_ROUTE,
} from "../shared/utils/routes";
import { Dashboard } from "./Dashboard";

export const authRoutes = [
  {
    path: ROOT_ROUTE,
    Component: Dashboard,
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

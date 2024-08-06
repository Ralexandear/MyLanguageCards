import { CARDS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, VOCABULARY_ROUTE } from "./utils/consts"
import Cards from "./pages/Cards"
import Vocabularies from "./pages/Vocabularies"
import Auth from "./pages/Auth"
import Vocabulary from "./pages/Vocabulary"



export const authRoutes = [
  {
    path: VOCABULARY_ROUTE,
    Component: Vocabularies
  },
  {
    path: VOCABULARY_ROUTE + '/:id',
    Component: Vocabulary
  },
  {
    path: CARDS_ROUTE,
    Component: Cards
  }
]



export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
 
]
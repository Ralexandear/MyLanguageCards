import GroupStore from "../store/GroupStore";
import UserStore from "../store/UserStore";
import VocabularyStore from "../store/VocabularyStore";

export interface ContextAttributes {
  user: UserStore;
  vocabularies: VocabularyStore;
  groups: GroupStore
}

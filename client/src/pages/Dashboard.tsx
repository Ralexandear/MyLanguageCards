import React, { useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import SelectLanguagePopup from "../components/selectLanguagePopup/SelectLanguagePopup";

const buildButton = () => {
  
}

export const Dashboard = observer(() => {
  const { user } = useContext(Context);
  const vocabularyIsSelected = Boolean(user.selectedVocabulary)

  return <>
    <SelectLanguagePopup />
    <div>Home screen</div>
  </>;
})

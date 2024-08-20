import React, { useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import SelectLanguagePopup from "../components/selectLanguagePopup/SelectLanguagePopup";
import { Col, Container, Row } from "react-bootstrap";
import VocabularyCardRow from "../components/vocabularyCardRow/VocabularyCardRow";

const buildButton = () => {
  
}

export const Dashboard = observer(() => {
  const { user } = useContext(Context);

  return <>
    <SelectLanguagePopup />
    <Container>
      <VocabularyCardRow />
    </Container>
  </>;
})

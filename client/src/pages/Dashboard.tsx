import React, { useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import SelectLanguagePopup from "../components/SelectLanguagePopup";
import { Col, Container, Row } from "react-bootstrap";
import GroupCardMenu from "../components/GroupCardMenu";

const buildButton = () => {
  
}

export const Dashboard = observer(() => {
  const { user } = useContext(Context);

  return <>
    <SelectLanguagePopup />
    <Container className="d-flex flex-column gap-3 py-5">
      <GroupCardMenu />
    </Container>
  </>;
})

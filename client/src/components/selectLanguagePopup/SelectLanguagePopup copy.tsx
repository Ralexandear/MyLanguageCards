import React, { useState, useContext } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { ApiVocabularyAttributes } from '../../shared/interfaces/server/api/apiVocabularyInterfaces';
import { Context } from '../..';
import './SelectLanguagePopup.sass';
import addIcon from '../../assets/icons/addPlus.svg';

export const SelectLanguagePopup = observer(() => {
  const { user } = useContext(Context);
  const handleSelectLanguage = (vocabulary: ApiVocabularyAttributes) => {
    user.selectedVocabulary = vocabulary;
  };

  const languages = [
    [1, "🇬🇧 English"],
    [2, "🇷🇺 Русский"],
    [3, "🇷🇸 Srbski"]
  ] as [number, string][];

  const selectedVocabulary = null; // user.selectedVocabulary
  const [show, setShow] = useState(Boolean(!selectedVocabulary));
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [selectedPrimaryLanguage, setSelectedPrimaryLanguage] = useState<string | null>(null);
  const [selectedLearningLanguage, setSelectedLearningLanguage] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateNewClick = () => {
    setShowCreateMenu(true); // показать меню создания
  };

  const handleCreateMenuClose = () => {
    setShowCreateMenu(false); // скрыть меню создания
  };

  const getLanguagesDropdown = (onClick: (label: string | null) => void, excludeLanguage?: string | null) => {
    const buttons = languages.reduce((acc, [_, label]) => {
      if (label !== excludeLanguage) acc.push(
        <Dropdown.Item 
          className='mb-1' 
          onClick={() => onClick(label)}
          key={label}
        >
          {label}
        </Dropdown.Item>
      );
      return acc;
    }, [] as JSX.Element[]);

    // Убираем последний отступ, если он есть
    if (buttons.length > 0) {
      buttons[buttons.length - 1] = React.cloneElement(buttons[buttons.length - 1], { className: '' });
    }

    return buttons;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        fullscreen="sm-down"
        size='md'
        keyboard={false}
        dialogClassName="modal__select-language"
        centered
      >
        { showCreateMenu ?
          (
            <>
              <Modal.Header>
                <Modal.Title>Выберите словарь</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Button onClick={handleCreateMenuClose}>
                  + Создать новый
                </Button>
              </Modal.Body>
            </>
          )
          :
          (
            <>
              <Modal.Header closeButton>
                <Modal.Title>Создайте новый словарь</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group>
                    <Container>
                      <Row className='align-items-center'>
                        <Col>
                          <Dropdown>
                            <Dropdown.Toggle variant='light' className='w-100'>
                              {selectedPrimaryLanguage || 'Основной язык'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              { getLanguagesDropdown(setSelectedPrimaryLanguage, selectedLearningLanguage) }
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>
                        <Col>
                          <Dropdown>
                            <Dropdown.Toggle variant='light' className='w-100'>
                              {selectedLearningLanguage || 'Язык для изучения'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              { getLanguagesDropdown(setSelectedLearningLanguage, selectedPrimaryLanguage) }
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>
                      </Row>
                    </Container>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
            </>
          )
        }
      </Modal>
    </>
  );
});

export default SelectLanguagePopup;
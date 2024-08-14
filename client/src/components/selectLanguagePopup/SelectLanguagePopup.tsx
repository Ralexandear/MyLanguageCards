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
  const [showCreateMenu, setShowCreateMenu] = useState(true);
  const [selectedPrimaryLanguage, setSelectedPrimaryLanguage] = useState<string | null>(null);
  const [selectedLearningLanguage, setSelectedLearningLanguage] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);

  const isSaveDisabled = ! (selectedPrimaryLanguage && selectedLearningLanguage);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateMenuOpen = () => {
    setShowCreateMenu(true); // показать меню создания
  };

  const handleCreateMenuClose = () => {
    setSelectedPrimaryLanguage(null)
    setSelectedLearningLanguage(null)
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
    console.log(form.checkValidity())
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
        id='create_vocabulary_modal'
        centered
      >
        { showCreateMenu ?
          (
            <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Modal.Header>
                  <Modal.Title>Создайте новый словарь</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                      <Container>
                        <Row className='align-items-center'>
                          <Col>
                            <Dropdown>
                              <Dropdown.Toggle variant='light' className='w-100 d-flex align-items-center justify-content-center'>
                                {selectedPrimaryLanguage || 'Основной язык'}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                { getLanguagesDropdown(setSelectedPrimaryLanguage, selectedLearningLanguage) }
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                          <Col>
                            <Dropdown>
                              <Dropdown.Toggle variant='light' className='w-100 d-flex align-items-center justify-content-center'>
                                {selectedLearningLanguage || 'Язык для изучения'}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                { getLanguagesDropdown(setSelectedLearningLanguage, selectedPrimaryLanguage) }
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                      </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-secondary" onClick={handleCreateMenuClose} className='d-flex'>
                    Назад
                  </Button>
                  <Button variant="outline-success" type='submit' className='d-flex' disabled={isSaveDisabled}>
                    <span className="material-symbols-outlined pe-1">save</span>
                    Сохранить
                  </Button>
                </Modal.Footer>
              </Form.Group>
            </Form>
            </>
          )
          :
          (
            <>
              <Modal.Header>
                <Modal.Title>Выберите словарь</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {'⚠️ Словари не найдены'}
              </Modal.Body>
              <Modal.Footer>
                <Button variant='outline-secondary' onClick={handleCreateMenuOpen} className='d-flex'>
                  <span className="material-symbols-outlined pe-1">add</span>
                  Создать новый
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
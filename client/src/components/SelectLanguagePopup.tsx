import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import Icon from './Icon';
import Buttons from './buttons/Buttons';

export const SelectLanguagePopup = observer(() => {
  const { user, vocabularies } = useContext(Context);

  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const usedLanguagesIds = new Set( [...vocabularies.getListOfLearningLanguagesIds(), user.primaryLanguageId] )
  const [selectedLearningLanguageId, setSelectedLearningLanguage] = useState<number | null>(
    (user.selectedVocabularyId && vocabularies.getById( user.selectedVocabularyId)._learningLanguageId )|| null
  );

  // Управление состоянием модального окна
  const [showModal, setShowModal] = useState(! selectedLearningLanguageId);

  // Sync the selected learning language when the selectedVocabularyId changes
  useEffect(() => {
    const selectedVocabulary = user.selectedVocabularyId
      ? vocabularies.getById(user.selectedVocabularyId)
      : null;

    setSelectedLearningLanguage(selectedVocabulary?._learningLanguageId || null);
  }, [user.selectedVocabularyId, vocabularies]);


  // Следим за изменением selectedLearningLanguageId
  useEffect(() => {
    if (!selectedLearningLanguageId) {
      setShowModal(true);
    }
  }, [selectedLearningLanguageId]);

  const isSaveDisabled = ! selectedLearningLanguageId;


  const handleCreateMenuOpen = () => {
    setShowCreateMenu(true);
  };

  const handleCreateMenuClose = () => {
    setSelectedLearningLanguage(null);
    setShowCreateMenu(false);
  };

  const languageList = vocabularies.languageList;

  const getLanguagesDropdown = (onClick: (languageId: number | null) => void) => {
    const elemAcc = new Array<JSX.Element>();
    let elemLength = 0;

    for (const [languageId, languageLabel] of Object.entries(languageList)) {
      if ( usedLanguagesIds.has( +languageId) ) continue;
      elemLength = elemAcc.push(
        <Dropdown.Item 
          className='mb-1' 
          onClick={() => onClick(+languageId)}
          key={languageId}
        >
          {languageLabel}
        </Dropdown.Item>
      );
    }

    if (elemLength) {
      elemAcc[elemLength - 1] = React.cloneElement(elemAcc[elemLength - 1], { className: '' });
    }

    return elemAcc;
  };

  const handleVocabularyCreation = () => {
    if (selectedLearningLanguageId === null) {
      return console.error('one of required parameters is missing');
    }

    vocabularies.addVocabulary({ userId: 1, learningLanguageId: selectedLearningLanguageId });
    handleCreateMenuClose();
  };

  const handleSelectedVocabulary = (vocabularyId: number) => {
    user.selectedVocabularyId = vocabularyId;
    setShowModal(false); // Закрываем модальное окно после выбора словаря
  };

  const getVocabulariesSelectButtons = () => {
    const list = vocabularies.list;
    const listLength = list.length;
    
    if (!listLength) return;
    
    return list.map((e, el) => (
      <Row key={e.id}>
        <Button 
          variant='outline-secondary' 
          className={[el === listLength - 1 ? '' : 'mb-2', 'py-2'].join(' ')} 
          onClick={() => handleSelectedVocabulary(e.id)}
        >
          { languageList[e._learningLanguageId] }
        </Button>
      </Row>
    ));
  };

  return (
    <>
      <Modal
        show={showModal}
        backdrop="static"
        fullscreen="sm-down"
        //@ts-ignore parameter md exists but not described at bootstrap types!
        size='md'
        keyboard={false}
        dialogClassName="modal__select-language"
        id='create_vocabulary_modal'
        centered
      >
        { showCreateMenu ? (
            <>
              <Modal.Header>
                <Modal.Title>Создайте новый словарь</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row className='align-items-center'>
                    {/* <Col>
                      <Dropdown>
                        <Dropdown.Toggle variant='light' className='w-100 d-flex align-items-center justify-content-center  py-2'>
                          { (selectedPrimaryLanguageId && languageList[selectedPrimaryLanguageId]) || 'Основной язык' }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          { getLanguagesDropdown(setSelectedPrimaryLanguage, selectedLearningLanguageId) }
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col> */}
                    <Col>
                      <Dropdown>
                        <Dropdown.Toggle variant='light' className='w-100 d-flex align-items-center justify-content-center py-2'>
                          { (selectedLearningLanguageId && languageList[selectedLearningLanguageId]) || 'Язык для изучения' }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          { getLanguagesDropdown(setSelectedLearningLanguage) }
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Buttons.Back style={{minHeight: 38}} />
                <Buttons.Save style={{minHeight: 38}} type='button' className='d-flex align-items-center' disabled={isSaveDisabled} onClick={handleVocabularyCreation} />
              </Modal.Footer>
            </>
          ) : (
            <>
              <Modal.Header>
                <Modal.Title>Выберите словарь</Modal.Title>
              </Modal.Header>
              <Modal.Body className='d-flex justify-content-center'>
                <Col xs={6}>
                  { getVocabulariesSelectButtons() || '⚠️ Словари не найдены' }
                </Col>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='outline-secondary' onClick={handleCreateMenuOpen} className='d-flex align-items-center'>
                  <Icon type='add' className="pe-1" />
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
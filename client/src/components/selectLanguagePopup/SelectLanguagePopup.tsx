import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import './SelectLanguagePopup.sass';

export const SelectLanguagePopup = observer(() => {
  const { user, vocabularies } = useContext(Context);
  const { selectedVocabularyId } = user;

  // Управление состоянием модального окна
  const [showModal, setShowModal] = useState(!selectedVocabularyId);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [selectedPrimaryLanguageId, setSelectedPrimaryLanguage] = useState<number | null>(null);
  const [selectedLearningLanguageId, setSelectedLearningLanguage] = useState<number | null>(null);
  const [validated, setValidated] = useState(false);

  // Следим за изменением selectedVocabularyId
  useEffect(() => {
    if (!selectedVocabularyId) {
      setShowModal(true);
    }
  }, [selectedVocabularyId]);

  const isSaveDisabled = !(selectedPrimaryLanguageId && selectedLearningLanguageId);

  const closeModal = () => setShowModal(false);

  const handleCreateMenuOpen = () => {
    setShowCreateMenu(true);
  };

  const handleCreateMenuClose = () => {
    setSelectedPrimaryLanguage(null);
    setSelectedLearningLanguage(null);
    setShowCreateMenu(false);
  };

  const languageList = vocabularies.languageList;

  const getLanguagesDropdown = (onClick: (languageId: number | null) => void, excludeLanguageId?: number | null) => {
    const elemAcc = new Array<JSX.Element>();
    let elemLength = 0;

    for (const [languageId, languageLabel] of Object.entries(languageList)) {
      if (+languageId === excludeLanguageId) continue;
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
    if (selectedLearningLanguageId === null || selectedPrimaryLanguageId === null) {
      return console.error('one of required parameters is missing');
    }

    vocabularies.addVocabulary({userId: 1, sourceLanguageId: selectedPrimaryLanguageId, targetLanguageId: selectedLearningLanguageId});
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
          className={el === listLength ? '' : 'mb-2'} 
          onClick={() => handleSelectedVocabulary(e.id)}
        >
          {[languageList[e._sourceLanguageId], languageList[e._targetLanguageId]].join(' => ')}
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
                    <Col>
                      <Dropdown>
                        <Dropdown.Toggle variant='light' className='w-100 d-flex align-items-center justify-content-center  py-2'>
                          { (selectedPrimaryLanguageId && languageList[selectedPrimaryLanguageId]) || 'Основной язык' }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          { getLanguagesDropdown(setSelectedPrimaryLanguage, selectedLearningLanguageId) }
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                    <Col>
                      <Dropdown>
                        <Dropdown.Toggle variant='light' className='w-100 d-flex align-items-center justify-content-center py-2'>
                          { (selectedLearningLanguageId && languageList[selectedLearningLanguageId]) || 'Язык для изучения' }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          { getLanguagesDropdown(setSelectedLearningLanguage, selectedPrimaryLanguageId) }
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-secondary" style={{minHeight: 38}} onClick={handleCreateMenuClose} className='d-flex align-items-center h-100'>
                <span className="material-symbols-outlined me-1 d-none">save</span>
                  Назад
                </Button>
                <Button variant="outline-success" style={{minHeight: 38}} type='button' className='d-flex align-items-center' disabled={isSaveDisabled} onClick={handleVocabularyCreation}>
                  <span className="material-symbols-outlined me-1">save</span>
                  Сохранить
                </Button>
              </Modal.Footer>
            </>
          ) : (
            <>
              <Modal.Header>
                <Modal.Title>Выберите словарь</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                { getVocabulariesSelectButtons() || '⚠️ Словари не найдены' }
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
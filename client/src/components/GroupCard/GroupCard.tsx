import React, { useContext, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import './GroupCard.sass'
import Icon from '../Icon';
import Buttons from '../buttons/Buttons';
import { Context } from '../..';

type ParamsType = {
  label?: string
}


export default function GroupCard ({label}: ParamsType) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const NewGroupForm = (onCloseButtonClick: () => void) => {
    const {groups} = useContext(Context)
    const [groupName, setGroupName] = useState('');
    const maxLength = 30;
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setGroupName(e.target.value);
    };
  
    const createNewGroup = () => {
      groups.addNewGroup(groupName)
      console.log(groups.list.length)
      flipCard()
    }
  
    return (
      <Form>
        <Buttons.Close className={['position-absolute', 'top-0', 'end-0', 'p-3']} onClick={onCloseButtonClick} />
        
        <Form.Group className='mb-2'>
          <Form.Label>Название группы</Form.Label>
          <Form.Control
            value={groupName}
            onChange={handleInputChange}
            maxLength={maxLength}
            placeholder="Введите название группы"
          />
          <Form.Text className="text-muted w-100 d-flex justify-content-end">
            {maxLength - groupName.length} / {maxLength}
          </Form.Text>
        </Form.Group>
        
        <div className='d-flex justify-content-end w-100'>
          <Buttons.Save disabled={ ! groupName } onClick={createNewGroup} />
        </div>
      </Form>
    );
  };

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''} w-auto`}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <Button
            variant="light"
            className="p-0"
            style={{ width: 290, borderRadius: 20 }}
            onClick={flipCard}
          >
            <Card style={{ height: 400, borderRadius: 20 }}>
            <Card.Body className="d-flex align-items-center justify-content-center">
              {label || <Icon type="add" style={{ fontSize: 45 }} />}
            </Card.Body>
          </Card>
          </Button>
        </div>
        <div className="flip-card-back">
          <Card style={{ height: 400, borderRadius: 20 }} className='position-relative'>
            <Card.Body className="d-flex align-items-center justify-content-center">
              { NewGroupForm(flipCard) }
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );

  
};





import { Col, Row } from 'react-bootstrap'
import GroupCard from './GroupCard/GroupCard'
import { Context } from '..'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

const elemsPerRow = 3

export const GroupCardMenu = observer(() => {
  const {groups} = useContext(Context)

  const cards = [
    ...groups.list.map(e => <GroupCard label={e._label} />),
    // <GroupCard />,
    <GroupCard />,
  ]

  

  return (
    <>
      {
        (() => {
          const row = new Array<JSX.Element>()
          let rowLength = 0

          const cardsRows = new Array<JSX.Element>()
          const createcardsRows = () => {
            cardsRows.push(
              <Row className='justify-content-center'>
                <Col md={8} className='d-flex justify-content-start gap-0 column-gap-3'>
                  {row.splice(0, elemsPerRow)}
                </Col>
              </Row>
            )
          }
            
          
          
          
          cards.forEach(e => {
            rowLength = row.push(e);
            if (rowLength === elemsPerRow) createcardsRows()
          })
          
          if (rowLength) createcardsRows()
          return cardsRows
        })()
       
      }
    </>
  )
})


export default GroupCardMenu

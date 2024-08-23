import { Button } from 'react-bootstrap'
import './Buttons.sass'
import React from 'react'
import Icon from '../Icon'

type ParamsType = {
  onClick?: () => void
  style?: React.CSSProperties
  className?: string[] | string
  disabled?: boolean
  type?:  "button" | "submit" | "reset" | undefined
  text?: string
}

const stringifyClassName = (className: string | string[] | undefined, ...defaultClassNames: string[]) => {
  defaultClassNames.push('d-flex', 'align-items-center')
  
  if (! className) return defaultClassNames.join(' ')
  else if (typeof className === 'string') return [className, ...defaultClassNames].join(' ')
  return [...className, ...defaultClassNames].join(' ')
}

class ButtonsClass {
  Save ( {onClick, style, className, disabled, type, text} : ParamsType ) {
    return (
      <Button variant="outline-success" style={style} type={type || 'button'} className={stringifyClassName(className)} disabled={disabled} onClick={onClick}>
        <Icon className='me-1' type='save' />
        {text || 'Сохранить'}
      </Button>
    )
  }

  Back ( {onClick, style, className, disabled, type, text} : ParamsType  ) {
    return (
      <Button variant="outline-secondary" style={style} type={type || 'button'} className={stringifyClassName(className)} disabled={disabled} onClick={onClick}>
        {text || 'Назад'}
      </Button>
    )
  }

  AddNew ({onClick, style, className, disabled, type, text} : ParamsType ) {
    return (
      <Button variant='outline-secondary' style={style} type={type || 'button'} className={stringifyClassName(className)} disabled={disabled} onClick={onClick}>
        <Icon type='add' className="pe-1" />
        {text || 'Создать новый'}
      </Button>
    )
  }

  Close ({onClick, style, className, disabled, type, text} : ParamsType ) {
    const defaultStyle: React.CSSProperties = {
      background: 'transparent',
      border: 'none',
      color: 'inherit'
    }



    return (
      <button style={{...defaultStyle, ...style}} type={type || 'button'} className={stringifyClassName(className)} disabled={disabled} onClick={onClick}>
        <Icon type='close'/>
        {text}
      </button>
    )
  }
}

export const Buttons = new ButtonsClass()
export default Buttons


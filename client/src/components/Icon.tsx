import React from 'react'
import { MaterialIconsType } from '../types/materialIconsType'

export default function Icon({type, className, style} : {type: MaterialIconsType, className?: string[] | string, style?: React.CSSProperties}) {
  const classArray = ["material-symbols-outlined"];
  if (className) {
    if (typeof className === 'string') classArray.push(className)
    else classArray.push(...className)
  }

  return (
    <span className={classArray.join(' ')} style={style}>{type}</span>
  )
}

import * as React from 'react'
import { ButtonBase } from '../buttons/types'
import { getStores } from '../stores'
import { Coordinate } from '../sounds/types'
import { fontFamily } from '../misc/constants'

export interface ButtonWithCoords extends ButtonBase {
  coords: Coordinate
}

interface DraggableProps {
  style?: any
  className?: string
  onTouchEnd?: any
  onTouchStart?: any
  onMouseUp?: any
  onMouseDown?: any
  onClick?: any
  selected?: boolean
}

interface Props extends DraggableProps {
  button: ButtonWithCoords
}

const Button: React.SFC<Props> = ({
  button,
  style,
  className,
  onTouchEnd,
  onTouchStart,
  onMouseDown,
  onMouseUp,
  onClick,
  selected
}) => {
  const { blockWidth, blockHeight, titleSize } = getStores().activeLayout
  return (
    <div
      {...{ className, onTouchEnd, onTouchStart, onMouseDown, onMouseUp }}
      style={{
        ...style,
        left: `${button.coords.x}px`,
        top: `${button.coords.y}px`,
        position: `absolute`,
        width: `${blockWidth}px`,
        height: `${blockHeight}px`,
        zIndex: selected ? '100' : undefined,
        opacity: 0.5,
        border: '0.5px solid black',
        fontFamily,
        fontSize: `${titleSize}px`,
        textAlign: `center`
      }}
      onClick={onClick}
    >
      {button.title}
    </div>
  )
}

export default Button

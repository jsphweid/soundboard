import * as React from 'react'
import { ButtonBase, isTabButton } from '../buttons/types'
import { getStores } from '../stores'
import { Coordinate } from '../sounds/types'
import { observer } from 'mobx-react'

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
  const { activeTabId } = getStores().tabButtons
  const highlightedStyles =
    isTabButton(button) && button.id === activeTabId
      ? {
          boxShadow: `inset 0px 0px 0px 5px #000000`
        }
      : {}
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
        boxShadow: `inset 0px 0px 0px 0.5px #000000`,
        fontSize: `${titleSize}px`,
        textAlign: `center`,
        ...highlightedStyles
      }}
      onClick={onClick}
    >
      {button.title}
    </div>
  )
}

export default observer(Button)

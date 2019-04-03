import * as React from 'react'
import { ButtonBase } from '../buttons/types'
import { fontFamily } from '../keyboard-tree/constants'
import { getStores } from '../stores'
import { Coordinate } from '../sounds/types'
import { handleKeyPressOrClick } from '../keyboard-tree/tree-events'

export interface ButtonsWithCoords extends ButtonBase {
  coords: Coordinate
}

interface Props {
  button: ButtonsWithCoords
}

const Button: React.SFC<Props> = ({ button }) => {
  const { blockWidth, blockHeight, titleSize } = getStores().activeLayout
  return (
    <div
      style={{
        left: `${button.coords.x * blockWidth}px`,
        top: `${button.coords.y * blockHeight}px`,
        position: `absolute`,
        width: `${blockWidth}px`,
        height: `${blockHeight}px`,
        opacity: 0.5,
        border: '0.5px solid black',
        fontFamily,
        fontSize: `${titleSize}px`,
        textAlign: `center`
      }}
      onClick={() => handleKeyPressOrClick(button.keyboardKey)}
    >
      {button.title}
    </div>
  )
}

export default Button

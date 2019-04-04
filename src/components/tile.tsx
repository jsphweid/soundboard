import * as React from 'react'
import { ValidKeyboardKey } from '../buttons/types'
import { getStores } from '../stores'
import { fontFamily } from '../misc/constants'

interface Props {
  keyboardKey: ValidKeyboardKey
}

const Tile: React.SFC<Props> = ({ keyboardKey }) => {
  const { blockWidth, blockHeight, keyboardKeySize } = getStores().activeLayout

  return (
    <div
      key={`tile-${keyboardKey}`}
      style={{
        backgroundColor: 'grey',
        width: blockWidth,
        height: blockHeight,
        float: 'left',
        position: 'relative',
        pointerEvents: 'none',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          position: `absolute`,
          fontSize: `${keyboardKeySize}px`,
          fontFamily,
          opacity: 0.1,
          border: '0.5px solid black',
          height: `100%`,
          width: `100%`
        }}
      >
        {keyboardKey}
      </div>
    </div>
  )
}

export default Tile

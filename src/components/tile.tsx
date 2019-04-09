import * as React from 'react'
import { observer } from 'mobx-react'
import { KeyboardKey } from '../buttons/types'

interface Props {
  keyboardKey: KeyboardKey
}

const Tile: React.SFC<Props> = observer(({ keyboardKey }) => {
  return (
    <div
      onDoubleClick={() => console.log('double click')}
      key={`tile-${keyboardKey}`}
    >
      test
    </div>
  )
})

export default Tile

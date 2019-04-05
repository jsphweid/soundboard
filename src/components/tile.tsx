import * as React from 'react'
import { ValidKeyboardKey, isValidActionKey } from '../buttons/types'
import { getStores } from '../stores'
import { fontFamily } from '../misc/constants'
import ButtonCreatorForm from './button-creation/form'
import { observer } from 'mobx-react'

interface Props {
  keyboardKey: ValidKeyboardKey
}

const Tile: React.SFC<Props> = observer(({ keyboardKey }) => {
  const { blockWidth, blockHeight, keyboardKeySize } = getStores().activeLayout
  const { activeTabId } = getStores().tabButtons
  const { registerCreator, tileWithButtonCreator } = getStores().buttonCreator
  const creator =
    tileWithButtonCreator &&
    tileWithButtonCreator.tabId === activeTabId &&
    tileWithButtonCreator.keyboardKey === keyboardKey ? (
      <ButtonCreatorForm />
    ) : null

  const onDoubleClick = isValidActionKey(keyboardKey)
    ? () => registerCreator(keyboardKey)
    : undefined

  return (
    <div
      onDoubleClick={onDoubleClick}
      key={`tile-${keyboardKey}`}
      style={{
        backgroundColor: 'grey',
        width: blockWidth,
        height: blockHeight,
        float: 'left',
        position: 'relative',
        textAlign: 'center'
      }}
    >
      {creator}
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
})

export default Tile

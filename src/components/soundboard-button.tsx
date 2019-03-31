import * as React from 'react'
import { SoundboardButtonData } from '../stores/soundboard-buttons-store'
import { getStores } from '../stores'
import { SoundInfo } from '../misc-types'
import { widthPercentText, widthPercent } from '../keyboard-tree'
import { ValidTreeThing } from '../keyboard-tree/valid-tree-thing'
import { handleKeyPressOrClick } from '../keyboard-tree/tree-events'

// TODO: maybe this means I should be doing something else
type SoundboardButtonDataExcluded = Pick<
  SoundboardButtonData,
  Exclude<keyof SoundboardButtonData, 'soundInfo'>
>

interface SoundboardButtonDataModified extends SoundboardButtonDataExcluded {
  soundInfo?: SoundInfo
}

interface Props extends SoundboardButtonDataModified {
  style?: any
  keyboardKey: ValidTreeThing
}

const SoundboardButton: React.SFC<Props> = ({
  title,
  soundInfo,
  style,
  keyboardKey
}) => {
  const styles = {
    ...style,
    position: 'absolute',
    textAlign: 'center'
    // zIndex: isMoving ? 1000 : undefined
  }

  return (
    <div
      onMouseDown={() => console.log('onMouseDown')}
      onMouseUp={() => console.log('onMouseUp')}
      onTouchEnd={() => console.log('onTouchEnd')}
      onTouchStart={() => console.log('onTouchStart')}
      onClick={() => handleKeyPressOrClick(keyboardKey)}
      style={styles}
    >
      {/* <Piece size="85%" /> */}
      {title}
    </div>
  )
}

export default SoundboardButton

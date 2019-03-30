import * as React from 'react'
import { SoundboardButtonData } from '../stores/soundboard-buttons-store'
import { getStores } from '../stores'

const SoundboardButton: React.SFC<SoundboardButtonData> = ({
  title,
  soundInfo
}) => {
  return (
    <div onClick={() => getStores().soundPlayer.triggerSound(soundInfo.id)}>
      {title}
    </div>
  )
}

export default SoundboardButton

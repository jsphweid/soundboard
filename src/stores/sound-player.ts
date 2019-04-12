import { action, observable } from 'mobx'
import { Sound } from '../sounds/types'
import URLSound from '../sounds/url-source'
import { ActionButton } from '../misc-types'
import { defaultActionButtons } from '../misc/constants'

export function makeSoundFromButton(button: ActionButton): Sound {
  switch (true) {
    default:
      return new URLSound(button)
  }
}

export default class SoundPlayer {
  @observable soundMap = new Map<string, Sound>()

  constructor() {
    if (typeof window !== 'undefined') {
      defaultActionButtons.forEach(b => {
        this.soundMap.set(b.id, makeSoundFromButton(b))
      })
    }
  }

  @action
  triggerSound(buttonId: string) {
    const sound = this.soundMap.get(buttonId)
    if (!sound) {
      console.log(`sound ${buttonId} not here......`)
      return
    }
    sound.trigger()
  }

  @action
  killAllSounds = () => {
    Array.from(this.soundMap.values()).forEach(sound => sound.stop())
  }
}

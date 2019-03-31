import { action, observable, computed } from 'mobx'
import { SoundInfo, SoundInfoTypes } from '../misc-types'
import { Sound } from '../sounds/types'
import URLSound from '../sounds/url-source'
import { mockData } from './data'

function makeSoundFromSoundInfo(soundInfo: SoundInfo): Sound {
  switch (soundInfo.type) {
    case SoundInfoTypes.UrlSound:
      return new URLSound(soundInfo.url)
  }
}

export default class SoundPlayer {
  @observable soundMap = new Map<string, Sound>()

  constructor() {
    mockData.forEach(b => {
      this.soundMap.set(b.soundInfo.id, makeSoundFromSoundInfo(b.soundInfo))
    })
  }

  @action
  triggerSound(id: string) {
    const sound = this.soundMap.get(id)
    if (!sound) {
      console.log(`sound ${id} not here......`)
      return
    }
    sound.trigger()
  }
}

import { action, observable } from 'mobx'
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

// TODO: get rid of soundId and use use main ID?

export default class SoundPlayer {
  @observable soundMap = new Map<string, Sound>()

  constructor() {
    mockData.forEach(b => {
      this.soundMap.set(
        b.soundInfo.soundInfoId,
        makeSoundFromSoundInfo(b.soundInfo)
      )
    })
  }

  @action
  triggerSound(soundInfoId: string) {
    const sound = this.soundMap.get(soundInfoId)
    if (!sound) {
      console.log(`sound ${soundInfoId} not here......`)
      return
    }
    sound.trigger()
  }
}

import { action, observable } from 'mobx'
import { SoundInfo, SoundInfoTypes } from '../misc-types'
import { Sound } from '../sounds/types'
import URLSound from '../sounds/url-source'
import { mockData, mockYoutubeData } from './data'
import YoutubeSound from '../sounds/youtube-sound'

export function makeSoundFromSoundInfo(soundInfo: SoundInfo): Sound {
  switch (soundInfo.type) {
    default:
    case SoundInfoTypes.UrlSound:
      return new URLSound(soundInfo.url)
    case SoundInfoTypes.Youtube:
      return new YoutubeSound(soundInfo.url)
  }
}

export default class SoundPlayer {
  @observable soundMap = new Map<string, Sound>()

  constructor() {
    // temp... make better way...
    mockData.forEach(b => {
      this.soundMap.set(
        b.soundInfo.soundInfoId,
        makeSoundFromSoundInfo(b.soundInfo)
      )
    })
    mockYoutubeData.forEach(b => {
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

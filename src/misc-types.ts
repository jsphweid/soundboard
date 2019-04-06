export enum SoundInfoTypes {
  UrlSound = 'Audio URL',
  Youtube = 'Youtube Sound'
}

interface BaseSoundInfo {
  type: SoundInfoTypes
  soundInfoId: string
}

export interface UrlSoundInfo extends BaseSoundInfo {
  url: string
}

// TODO: How do we guarantee that each item in the union has BaseSoundInfo?
export type SoundInfo = UrlSoundInfo // | AnotherSoundInfo

import { SoundInfoTypes } from '../misc-types'
import { makeRandomId } from '../misc/helpers'

export const mockData = [
  {
    title: 'airhorn',
    url: 'https://www.myinstants.com/media/sounds/mlg-airhorn.mp3'
  },
  {
    title: 'wolololo',
    url: 'https://www.myinstants.com/media/sounds/sound-9.mp3'
  },
  {
    title: 'laugh',
    url: 'https://www.myinstants.com/media/sounds/sitcom-laughing-1.mp3'
  },

  {
    title: 'jeopardy',
    url: 'https://www.myinstants.com/media/sounds/jeopardy-theme-lowq.mp3'
  }
].map(({ title, url }) => ({
  title,
  soundInfo: {
    type: SoundInfoTypes.UrlSound,
    url,
    soundInfoId: makeRandomId()
  }
}))

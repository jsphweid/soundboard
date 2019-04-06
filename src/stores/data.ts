import { SoundInfoTypes } from '../misc-types'
import md5 from 'blueimp-md5'
import { makeRandomId } from '../misc/helpers'

// move this to helper eventually
function makeMd5(obj: { type: SoundInfoTypes; url: string }): string {
  return md5(JSON.stringify(obj))
}

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
    soundInfoId: makeMd5({ type: SoundInfoTypes.UrlSound, url })
  }
}))

export const mockYoutubeData = [
  {
    title: 'evil morty',
    url: 'https://www.youtube.com/watch?v=Bk3lknaWI9Q',
    startSeconds: 37,
    endSeconds: 40
  }
].map(({ title, url, startSeconds, endSeconds }) => ({
  title,
  soundInfo: {
    type: SoundInfoTypes.Youtube,
    url,
    startSeconds,
    endSeconds,
    soundInfoId: makeRandomId()
  }
}))

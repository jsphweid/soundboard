import { Sound } from './types'

export default class URLSound implements Sound {
  private audioElement: HTMLAudioElement // TODO:... what is it
  constructor(url: string) {
    this.audioElement = new Audio(url)
  }

  public trigger() {
    return Promise.resolve(this.audioElement.play())
  }

  public stop() {
    console.log('implement me')
    return Promise.resolve()
  }

  public prime() {
    console.log('implement me')
    return Promise.resolve()
  }
}

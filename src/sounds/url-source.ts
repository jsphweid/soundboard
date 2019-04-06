import { Sound } from './types'

export default class URLSound implements Sound {
  private audioElement: HTMLAudioElement // TODO:... what is it
  constructor(url: string) {
    this.audioElement = new Audio(url)
  }

  private stopAndRestart() {
    this.audioElement.pause()
    this.audioElement.currentTime = 0
  }

  public trigger() {
    if (!this.audioElement.paused) {
      this.stopAndRestart()
    }
    return Promise.resolve(this.audioElement.play())
  }

  public stop() {
    return Promise.resolve(this.stopAndRestart())
  }

  public prime() {
    console.log('implement me')
    return Promise.resolve()
  }
}

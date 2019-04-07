import { Sound, AudioData } from './types'

export default class URLSound implements Sound {
  private audioElement: HTMLAudioElement // TODO:... what is it
  private start: number
  private end?: number | null
  private timer: NodeJS.Timer | undefined

  constructor(data: AudioData) {
    this.audioElement = new Audio(data.url)
    this.start = data.start || 0
    this.end = data.end
    this.audioElement.currentTime = this.start
  }

  private stopAndRestart() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.audioElement.pause()
    this.audioElement.currentTime = this.start
  }

  public trigger() {
    if (!this.audioElement.paused) {
      this.stopAndRestart()
    }
    this.audioElement.play()

    if (this.end) {
      this.timer = setTimeout(() => {
        this.stopAndRestart()
      }, (this.end - this.start) * 1000)
    }
    return Promise.resolve()
  }

  public stop() {
    return Promise.resolve(this.stopAndRestart())
  }

  public prime() {
    console.log('implement me')
    return Promise.resolve()
  }
}

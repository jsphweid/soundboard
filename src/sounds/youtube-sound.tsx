import { Sound } from './types'
import * as React from 'react'
import ReactDOM from 'react-dom'
import ReactPlayer from 'react-player'

export default class YoutubeSound implements Sound {
  private url: string
  constructor(url: string) {
    this.url = url
  }

  public trigger() {
    ReactDOM.render(
      <ReactPlayer url={this.url} playing={true} height={0} width={0} />,
      document.getElementById('player')
    )
    return Promise.resolve()
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

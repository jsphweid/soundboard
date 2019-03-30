import * as React from 'react'
import { Link } from 'gatsby'
import { getStores } from '../stores'
import { SoundboardButtonData } from '../stores/soundboard-buttons-store'
import SoundboardButton from '../components/soundboard-button'

const makeSoundboardButtons = (data: SoundboardButtonData, index: number) => (
  <SoundboardButton key={index} {...data} />
)

export default () => (
  <div>{getStores().soundboardButtons.buttons.map(makeSoundboardButtons)}</div>
)

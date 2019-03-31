import { observable } from 'mobx'
import { SoundInfo } from '../misc-types'
import { mockData } from './data'

export interface SoundboardButtonData {
  title: string
  soundInfo: SoundInfo
}

export default class SoundboardButtonsStore {
  @observable buttons: SoundboardButtonData[] = mockData
}

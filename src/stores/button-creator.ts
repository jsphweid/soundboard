import { observable, action } from 'mobx'
import { ActionKey } from '../buttons/types'
import { getStores } from '.'

export interface TileIdentifier {
  keyboardKey: ActionKey
  tabId: string
}

export default class ButtonCreator {
  @observable tileWithButtonCreator: TileIdentifier | null = null

  @action registerCreator = (keyboardKey: ActionKey) => {
    this.tileWithButtonCreator = {
      tabId: getStores().tabButtons.activeTabId,
      keyboardKey
    }
  }

  @action cancel = () => (this.tileWithButtonCreator = null)
}

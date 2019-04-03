import { observable, computed } from 'mobx'
import { ActionButton, ButtonType } from '../buttons/types'
import { mockData } from './data'
import { getStores } from '.'

export default class ActionButtonsStore {
  @observable private actionButtons: ActionButton[] = [
    {
      soundInfo: mockData[0].soundInfo,
      title: `airhorn`,
      type: ButtonType.Action,
      keyboardKey: 'q',
      tab: '1'
    },
    {
      soundInfo: mockData[1].soundInfo,
      title: `wolololo`,
      type: ButtonType.Action,
      keyboardKey: 'w',
      tab: '1'
    },
    {
      soundInfo: mockData[2].soundInfo,
      title: `laugh`,
      type: ButtonType.Action,
      keyboardKey: 'a',
      tab: '2'
    },
    {
      soundInfo: mockData[3].soundInfo,
      title: `jeopardy`,
      type: ButtonType.Action,
      keyboardKey: 'b',
      tab: '3'
    }
  ]

  @computed
  get currentButtonsInTab() {
    return this.actionButtons.filter(
      button => button.tab === getStores().tabButtons.activeTabKey
    )
  }
}

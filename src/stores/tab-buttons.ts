import { observable, action } from 'mobx'
import { TabKey, TabButton, ButtonType } from '../buttons/types'

export default class TabButtonsStore {
  @observable activeTabKey: TabKey = '1'

  @observable tabs: TabButton[] = [
    {
      type: ButtonType.Tab,
      title: 'tab 1',
      keyboardKey: '1'
    },
    {
      type: ButtonType.Tab,
      title: 'tab 2',
      keyboardKey: '2'
    },
    {
      type: ButtonType.Tab,
      title: 'tab 3',
      keyboardKey: '3'
    },
    {
      type: ButtonType.Tab,
      title: 'tab 4',
      keyboardKey: '4'
    },
    {
      type: ButtonType.Tab,
      title: 'tab 5',
      keyboardKey: '5'
    }
  ]

  @action
  changeTab(tabKey: TabKey) {
    this.activeTabKey = tabKey
  }
}

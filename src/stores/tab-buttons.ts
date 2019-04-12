import { observable, action, transaction } from 'mobx'
import { TabButton, ButtonType, KeyboardKey } from '../misc-types'

export default class TabButtonsStore {
  @observable activeTabId: string = 'tab1'

  @observable tabs: TabButton[] = [
    {
      type: ButtonType.Tab,
      title: 'tab 1',
      keyboardKey: '1',
      id: 'tab1'
    },
    {
      type: ButtonType.Tab,
      title: 'tab 2',
      keyboardKey: '2',
      id: 'tab2'
    },
    {
      type: ButtonType.Tab,
      title: 'tab 3',
      keyboardKey: '3',
      id: 'tab3'
    },
    {
      type: ButtonType.Tab,
      title: 'tab 4',
      keyboardKey: '4',
      id: 'tab4'
    },
    {
      type: ButtonType.Tab,
      title: 'tab 5',
      keyboardKey: '5',
      id: 'tab5'
    }
  ]

  @action
  changeTab(tabId: string) {
    this.activeTabId = tabId
  }

  @action
  moveTabButton(button: TabButton, destination: KeyboardKey) {
    const sourceIndex = this.tabs.findIndex(t => t.id === button.id)
    const destinationIndex = this.tabs.findIndex(
      t => t.keyboardKey === destination
    )

    if (sourceIndex > -1 && destinationIndex > -1) {
      transaction(() => {
        this.tabs[sourceIndex].keyboardKey = destination
        this.tabs[destinationIndex].keyboardKey = button.keyboardKey
      })
    }
  }

  getButtonByKeyboardKey(keyboardKey: KeyboardKey) {
    return this.tabs.find(button => button.keyboardKey === keyboardKey)
  }
}

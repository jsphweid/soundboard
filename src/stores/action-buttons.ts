import { observable, computed, action, transaction } from 'mobx'
import { ActionButton, ButtonType, ActionKey, TabKey } from '../buttons/types'
import { mockData } from './data'
import { getStores } from '.'

export default class ActionButtonsStore {
  @observable private actionButtons: ActionButton[] = [
    {
      soundInfo: mockData[0].soundInfo,
      title: `airhorn`,
      type: ButtonType.Action,
      keyboardKey: 'q',
      tabId: 'tab1',
      id: 'action1'
    },
    {
      soundInfo: mockData[1].soundInfo,
      title: `wolololo`,
      type: ButtonType.Action,
      keyboardKey: 'w',
      tabId: 'tab1',
      id: 'action2'
    },
    {
      soundInfo: mockData[2].soundInfo,
      title: `laugh`,
      type: ButtonType.Action,
      keyboardKey: 'a',
      tabId: 'tab2',
      id: 'action3'
    },
    {
      soundInfo: mockData[3].soundInfo,
      title: `jeopardy`,
      type: ButtonType.Action,
      keyboardKey: 'b',
      tabId: 'tab3',
      id: 'action4'
    }
  ]

  @computed
  get currentButtonsInTab() {
    return this.actionButtons.filter(
      button => button.tabId === getStores().tabButtons.activeTabId
    )
  }

  @action
  moveActionButton(button: ActionButton, destination: ActionKey) {
    const sourceIndex = this.actionButtons.findIndex(t => t.id === button.id)
    const destinationIndex = this.actionButtons.findIndex(
      t => t.keyboardKey === destination
    )

    if (sourceIndex > -1) {
      transaction(() => {
        if (destinationIndex > -1) {
          this.actionButtons[destinationIndex].keyboardKey = button.keyboardKey
          this.actionButtons[destinationIndex].tabId = button.tabId
        }
        this.actionButtons[
          sourceIndex
        ].tabId = getStores().tabButtons.activeTabId
        this.actionButtons[sourceIndex].keyboardKey = destination
      })
    }
  }

  public getButtonByKeyboardKey(
    keyboardKey: ActionKey,
    tabId = getStores().tabButtons.activeTabId
  ): ActionButton | undefined {
    return this.actionButtons.find(
      button => button.keyboardKey === keyboardKey && button.tabId === tabId
    )
  }

  public deleteButton(buttonId: string) {
    this.actionButtons = this.actionButtons.filter(b => b.id !== buttonId)
  }
}

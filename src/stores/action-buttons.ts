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
      tab: '1',
      id: 'action1'
    },
    {
      soundInfo: mockData[1].soundInfo,
      title: `wolololo`,
      type: ButtonType.Action,
      keyboardKey: 'w',
      tab: '1',
      id: 'action2'
    },
    {
      soundInfo: mockData[2].soundInfo,
      title: `laugh`,
      type: ButtonType.Action,
      keyboardKey: 'a',
      tab: '2',
      id: 'action3'
    },
    {
      soundInfo: mockData[3].soundInfo,
      title: `jeopardy`,
      type: ButtonType.Action,
      keyboardKey: 'b',
      tab: '3',
      id: 'action4'
    }
  ]

  @computed
  get currentButtonsInTab() {
    return this.actionButtons.filter(
      button => button.tab === getStores().tabButtons.activeTabKey
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
          this.actionButtons[destinationIndex].tab = button.tab
        }
        this.actionButtons[
          sourceIndex
        ].tab = getStores().tabButtons.activeTabKey
        this.actionButtons[sourceIndex].keyboardKey = destination
      })
    }
  }

  public getButtonByKeyboardKey(
    keyboardKey: ActionKey,
    tab = getStores().tabButtons.activeTabKey
  ): ActionButton | undefined {
    return this.actionButtons.find(
      button => button.keyboardKey === keyboardKey && button.tab === tab
    )
  }
}

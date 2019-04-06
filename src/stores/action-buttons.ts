import {
  observable,
  computed,
  action,
  transaction,
  autorun,
  reaction
} from 'mobx'
import { ActionButton, ButtonType, ActionKey, TabKey } from '../buttons/types'
import { mockData } from './data'
import { getStores } from '.'
import { makeSoundFromSoundInfo } from './sound-player'
import { makeRandomId } from '../misc/helpers'

export default class ActionButtonsStore {
  constructor() {
    // sync soundplay buttons
    reaction(
      () => this.actionButtons.length,
      len => {
        const { soundMap } = getStores().soundPlayer
        // only adds buttons... memory overflow...!?!
        this.actionButtons.forEach(({ soundInfo }) => {
          const sound = soundMap.get(soundInfo.soundInfoId)
          if (!sound) {
            soundMap.set(
              soundInfo.soundInfoId,
              makeSoundFromSoundInfo(soundInfo)
            )
          }
        })
      }
    )
  }
  @observable actionButtons: ActionButton[] = [
    {
      soundInfo: mockData[0].soundInfo,
      title: `airhorn`,
      type: ButtonType.Action,
      keyboardKey: 'q',
      tabId: 'tab1',
      id: makeRandomId()
    },
    {
      soundInfo: mockData[1].soundInfo,
      title: `wolololo`,
      type: ButtonType.Action,
      keyboardKey: 'w',
      tabId: 'tab1',
      id: makeRandomId()
    },
    {
      soundInfo: mockData[2].soundInfo,
      title: `laugh`,
      type: ButtonType.Action,
      keyboardKey: 'a',
      tabId: 'tab2',
      id: makeRandomId()
    },
    {
      soundInfo: mockData[3].soundInfo,
      title: `jeopardy`,
      type: ButtonType.Action,
      keyboardKey: 'b',
      tabId: 'tab3',
      id: makeRandomId()
    }
  ]

  @action
  addButton = (button: ActionButton) => {
    this.actionButtons.push(button)
  }

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

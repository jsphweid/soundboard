import { observable, computed, action, transaction, reaction } from 'mobx'
import { ActionButton, ActionKey } from '../buttons/types'
import { getStores } from '.'
import { defaultActionButtons } from '../misc/constants'
import { makeSoundFromButton } from './sound-player'

export default class ActionButtonsStore {
  constructor() {
    // sync soundplay buttons
    reaction(
      () => this.actionButtons.length,
      () => {
        const { soundMap } = getStores().soundPlayer
        // only adds buttons... memory overflow...!?!
        this.actionButtons.forEach(button => {
          const sound = soundMap.get(button.id)
          if (!sound) {
            soundMap.set(button.id, makeSoundFromButton(button))
          }
        })
      }
    )
  }
  @observable actionButtons: ActionButton[] = defaultActionButtons

  @action
  addButton = (button: ActionButton) => {
    this.actionButtons.push(button)
  }

  @action
  reloadEverythingFromValidJSON = (newButtons: ActionButton[]) => {
    getStores().soundPlayer.soundMap.clear()
    this.actionButtons = newButtons
  }

  getSerializedActionButtons = (): string => {
    return JSON.stringify(this.actionButtons)
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

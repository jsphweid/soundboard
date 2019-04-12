import {
  observable,
  computed,
  action,
  transaction,
  reaction,
  isAction
} from 'mobx'
import {
  ActionButton,
  KeyboardKey,
  EitherButton,
  isActionButton,
  isTabButton
} from '../misc-types'
import { getStores } from '.'
import { defaultActionButtons, defaultTabButtons } from '../misc/constants'
import { ButtonType } from '../misc-types'

export default class Buttons {
  constructor() {
    // sync soundplay buttons
    // reaction(
    //   () => JSON.stringify(this.actionButtons),
    //   () => {
    //     const { soundMap } = getStores().soundPlayer
    //     // only adds buttons... memory overflow...!?!
    //     this.actionButtons.forEach(button => {
    //       const sound = soundMap.get(button.id)
    //       if (!sound) {
    //         soundMap.set(button.id, makeSoundFromButton(button))
    //       }
    //     })
    //   }
    // )
  }

  // @computed
  // get currentActionButtonsIndexedByKey() {
  //   const keys = {} as { [key in KeyboardKey]: ActionButton | undefined }
  //   this.buttons
  //     .filter(isActionButton)
  //     .filter(button => button.tabId === this.activeTabId)
  //     .forEach(button => (keys[button.keyboardKey] = button))
  //   return keys
  // }

  @observable activeTabId: string = 'tab1'

  @observable buttons: EitherButton[] = [
    ...defaultActionButtons,
    ...defaultTabButtons
  ]

  @computed
  get tabButtons() {
    return this.buttons.filter(isTabButton)
  }

  @computed
  get actionButtons() {
    return this.buttons.filter(isActionButton)
  }

  @computed
  get currentButtonsInTab() {
    const tabKeys = this.tabButtons.map(b => b.keyboardKey)
    const filteredActionButtons = this.actionButtons
      .filter(b => b.tabId === this.activeTabId)
      .filter(b => !tabKeys.includes(b.keyboardKey))
    return [...filteredActionButtons, ...this.tabButtons]
  }

  @action
  addButton = (button: EitherButton) => {
    this.buttons.push(button)
  }

  @action
  reloadEverythingFromValidJSON = (newButtons: EitherButton[]) => {
    getStores().soundPlayer.soundMap.clear()
    this.buttons = newButtons
  }

  getSerializedButtons = (): string => {
    return JSON.stringify(this.buttons)
  }

  @action
  moveActionButton(button: ActionButton, destination: KeyboardKey) {
    // const { activeTabId } = getStores().tabButtons
    // const sourceIndex = this.actionButtons.findIndex(t => t.id === button.id)
    // const destinationIndex = this.actionButtons.findIndex(
    //   b => b.keyboardKey === destination && b.tabId === activeTabId
    // )
    // if (sourceIndex > -1) {
    //   transaction(() => {
    //     if (destinationIndex > -1) {
    //       this.actionButtons[destinationIndex].keyboardKey = button.keyboardKey
    //       this.actionButtons[destinationIndex].tabId = button.tabId
    //     }
    //     this.actionButtons[sourceIndex].tabId = activeTabId
    //     this.actionButtons[sourceIndex].keyboardKey = destination
    //   })
    // }
  }

  // public getButtonByKeyboardKey(
  //   keyboardKey: KeyboardKey,
  //   tabId = getStores().tabButtons.activeTabId
  // ): ActionButton | undefined {
  //   return this.buttons.find(
  //     button => button.keyboardKey === keyboardKey && button.tabId === tabId
  //   )
  // }

  public deleteButton(buttonId: string) {}
}

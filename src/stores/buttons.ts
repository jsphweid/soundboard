import { observable, computed, action, reaction } from 'mobx'
import {
  KeyboardKey,
  EitherButton,
  isActionButton,
  isTabButton,
  ActionButton
} from '../misc-types'
// import { getStores } from '.'
import { defaultActionButtons, defaultTabButtons } from '../misc/constants'
import { Sound } from '../sounds/types'
import URLSound from '../sounds/url-source'

export function makeSoundFromButton(button: ActionButton): Sound {
  switch (true) {
    default:
      return new URLSound(button)
  }
}

export default class Buttons {
  constructor(buttons?: EitherButton[]) {
    if (buttons) {
      this.buttons = buttons
    }

    if (typeof window !== 'undefined') {
      defaultActionButtons.forEach(b => {
        this.soundMap.set(b.id, makeSoundFromButton(b))
      })
    }
    // sync soundplay buttons
    reaction(
      () => JSON.stringify(this.actionButtons),
      () => {
        this.soundMap.clear()
        this.actionButtons.forEach(button => {
          this.soundMap.set(button.id, makeSoundFromButton(button))
        })
      }
    )
  }

  @observable soundMap = new Map<string, Sound>()

  attachTriggers = (button: EitherButton): EitherButton => {
    const onTrigger = isActionButton(button)
      ? () => this.playSound(button.id)
      : () => this.changeTabs(button.id)
    return {
      ...button,
      onTrigger
    }
  }

  @action playSound = (id: string) => {
    const sound = this.soundMap.get(id)
    if (!sound) {
      console.log(`sound ${id} not here......`)
      return
    }
    sound.trigger()
  }

  @action changeTabs = (tabId: string) => {
    this.activeTabId = tabId
  }

  @action
  killAllSounds = () => {
    Array.from(this.soundMap.values()).forEach(sound => sound.stop())
  }

  @observable activeTabId: string = 'tab1'

  @observable buttons: EitherButton[] = [
    ...defaultActionButtons,
    ...defaultTabButtons
  ].map(this.attachTriggers)

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
    this.soundMap.clear()
    this.buttons = newButtons
  }

  getSerializedButtons = (): string => {
    return JSON.stringify(this.buttons)
  }

  @action
  moveButton = (button: EitherButton, destination: KeyboardKey) => {
    const sourceIndex = this.buttons.findIndex(t => t.id === button.id)
    const destinationActionIndex = this.buttons.findIndex(b => {
      return (
        isActionButton(b) &&
        b.keyboardKey === destination &&
        b.tabId === this.activeTabId
      )
    })
    const destinationTabIndex = this.buttons.findIndex(b => {
      return isTabButton(b) && b.keyboardKey === destination
    })
    const destinationIndex = Math.max(
      destinationActionIndex,
      destinationTabIndex
    )
    if (sourceIndex > -1) {
      if (destinationIndex > -1) {
        const destinationButton = this.buttons[destinationIndex]
        destinationButton.keyboardKey = button.keyboardKey
        if (isActionButton(destinationButton) && isActionButton(button)) {
          destinationButton.tabId = button.tabId
        }
      }
      const sourceButton = this.buttons[sourceIndex]
      sourceButton.keyboardKey = destination
      if (isActionButton(sourceButton)) {
        sourceButton.tabId = this.activeTabId
      }
    }
  }

  public getButtonInCurrentView(
    keyboardKey: KeyboardKey
  ): EitherButton | undefined {
    return this.currentButtonsInTab.find(b => b.keyboardKey === keyboardKey)
  }

  public updateButton(buttonId: string, updates: Partial<EitherButton>) {
    console.log('update called')
    const i = this.buttons.findIndex(b => b.id === buttonId)
    console.log('i', i)
    if (i >= 0) {
      this.buttons[i] = { ...this.buttons[i], ...updates } as any
    }
  }

  public deleteButton(buttonId: string) {
    this.buttons = this.buttons.filter(b => b.id !== buttonId)
  }
}

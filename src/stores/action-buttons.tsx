import { observable, computed, action, transaction } from 'mobx'
import { ActionButton, ActionKey } from '../buttons/types'
import { getStores } from '.'

import ReactPlayer, { Config } from 'react-player'
import * as React from 'react'
import { mockData } from './data'

const defaultConfig: Config = {
  youtube: { preload: true }
}

export default class ActionButtonsStore {
  constructor() {
    // populate with mock data
    mockData.forEach(item => this.loadButtonFromSerializableData(item))
  }

  @action
  loadButtonFromSerializableData = (button: ActionButton) => {
    this.actionButtons.set(button.id, {
      ...button,
      player: (
        <ReactPlayer
          {...defaultConfig}
          {...button.reactPlayerProps}
          url={button.url}
          ref={ref => {
            if (ref) {
              ;(ref as any).seekTo(button.startSeconds, 'seconds')
            }
          }}
        />
      )
    })
  }

  @observable actionButtons: Map<string, ActionButton> = new Map()

  @action
  addButton = (button: ActionButton) => {
    this.actionButtons.set(button.id, button)
  }

  @computed
  get allButtons() {
    return Array.from(this.actionButtons.values())
  }

  @computed
  get currentButtonsInTab() {
    return this.allButtons.filter(
      button => button.tabId === getStores().tabButtons.activeTabId
    )
  }

  @action
  moveActionButton(button: ActionButton, destinationKeyboardKey: ActionKey) {
    const source = this.actionButtons.get(button.id)
    const destination = this.getButtonByKeyboardKey(destinationKeyboardKey)

    if (source) {
      transaction(() => {
        if (destination) {
          this.actionButtons.set(destination.id, {
            ...source,
            tabId: button.tabId,
            keyboardKey: button.keyboardKey
          })
        }
        this.actionButtons.set(button.id, {
          ...source,
          tabId: getStores().tabButtons.activeTabId,
          keyboardKey: destinationKeyboardKey
        })
      })
    }
  }

  public getButtonByKeyboardKey(
    keyboardKey: ActionKey,
    tabId = getStores().tabButtons.activeTabId
  ): ActionButton | undefined {
    return this.allButtons.find(
      button => button.keyboardKey === keyboardKey && button.tabId === tabId
    )
  }

  public deleteButton(buttonId: string) {
    this.actionButtons.delete(buttonId)
  }
}

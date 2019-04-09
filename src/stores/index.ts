import { observable } from 'mobx'
import SoundPlayerStore from './sound-player'
import BoardLayout from './board-layout'
import ActionButtons from './action-buttons'
import TabButtons from './tab-buttons'
import { createKeyboardListeners } from '../misc/keyboard-listeners'
import LoadBoard from './load-board'
import SaveBoard from './save-board'

let stores = initialize()

createKeyboardListeners()

function initialize() {
  const soundPlayer = new SoundPlayerStore()
  const boardLayout = new BoardLayout()
  const actionButtons = new ActionButtons()
  const tabButtons = new TabButtons()
  const loadBoard = new LoadBoard()
  const saveBoard = new SaveBoard()

  return observable({
    soundPlayer,
    boardLayout,
    actionButtons,
    tabButtons,
    loadBoard,
    saveBoard
  })
}

export function getStores(): StoresType {
  return stores
}

export function reinitializeStores(): StoresType {
  stores = initialize()
  return stores
}

export const initializeReturnType = returnType(initialize)
export type StoresType = typeof initializeReturnType

function returnType<T>(fn: () => T) {
  if (typeof fn === 'string') {
    ;(fn as any)()
  }
  return {} as T
}

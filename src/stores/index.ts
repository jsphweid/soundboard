import { observable } from 'mobx'
import SoundPlayerStore from './sound-player'
import { createKeyboardListeners } from '../misc/keyboard-listeners'
import LoadBoard from './load-board'
import SaveBoard from './save-board'
import Buttons from './buttons'

let stores = initialize()

createKeyboardListeners()

function initialize() {
  const soundPlayer = new SoundPlayerStore()
  const loadBoard = new LoadBoard()
  const saveBoard = new SaveBoard()
  const buttons = new Buttons()

  return observable({
    soundPlayer,
    loadBoard,
    saveBoard,
    buttons
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

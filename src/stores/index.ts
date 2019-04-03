import { observable } from 'mobx'
import SoundPlayerStore from './sound-player'
import KeyboardTreeStore from './keyboard-tree'
// import { createKeyboardListeners } from '../keyboard-tree/keyboard-listeners'
import BoardLayout from './board-layout'
import PortraitLayout from './portrait-layout'
import LandscapeLayout from './landscape-layout'
import ActiveLayout from './active-layout'
import ActionButtons from './action-buttons'
import TabButtons from './tab-buttons'

let stores = initialize()

// createKeyboardListeners()

function initialize() {
  const soundPlayer = new SoundPlayerStore()
  const keyboardTree = new KeyboardTreeStore()
  const boardLayout = new BoardLayout()
  const landscapeLayout = new LandscapeLayout()
  const portraitLayout = new PortraitLayout()
  const activeLayout = new ActiveLayout()
  const actionButtons = new ActionButtons()
  const tabButtons = new TabButtons()

  return observable({
    soundPlayer,
    keyboardTree,
    boardLayout,
    landscapeLayout,
    portraitLayout,
    activeLayout,
    actionButtons,
    tabButtons
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

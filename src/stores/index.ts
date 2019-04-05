import { observable } from 'mobx'
import SoundPlayerStore from './sound-player'
import BoardLayout from './board-layout'
import PortraitLayout from './portrait-layout'
import LandscapeLayout from './landscape-layout'
import ActiveLayout from './active-layout'
import ActionButtons from './action-buttons'
import TabButtons from './tab-buttons'
import { createKeyboardListeners } from '../misc/keyboard-listeners'
import ButtonCreator from './button-creator'

let stores = initialize()

createKeyboardListeners()

function initialize() {
  const soundPlayer = new SoundPlayerStore()
  const boardLayout = new BoardLayout()
  const landscapeLayout = new LandscapeLayout()
  const portraitLayout = new PortraitLayout()
  const activeLayout = new ActiveLayout()
  const actionButtons = new ActionButtons()
  const tabButtons = new TabButtons()
  const buttonCreator = new ButtonCreator()

  return observable({
    soundPlayer,
    boardLayout,
    landscapeLayout,
    portraitLayout,
    activeLayout,
    actionButtons,
    tabButtons,
    buttonCreator
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

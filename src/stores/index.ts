import { observable } from 'mobx'
import SoundboardButtonsStore from './soundboard-buttons-store'
import SoundPlayerStore from './sound-player'
import KeyboardTreeStore from './keyboard-tree'

let stores = initialize()

function initialize() {
  const soundboardButtons = new SoundboardButtonsStore()
  const soundPlayer = new SoundPlayerStore()
  const keyboardTree = new KeyboardTreeStore()

  return observable({
    soundboardButtons,
    soundPlayer,
    keyboardTree
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

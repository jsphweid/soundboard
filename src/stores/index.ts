import { observable } from 'mobx'
import SoundboardButtonsStore from './soundboard-buttons-store'
import SoundPlayer from './sound-player'

let stores = initialize()

function initialize() {
  const soundboardButtons = new SoundboardButtonsStore()
  const soundPlayer = new SoundPlayer()

  return observable({
    soundboardButtons,
    soundPlayer
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

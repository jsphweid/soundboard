import { observable } from 'mobx'
import { createKeyboardListeners } from '../misc/keyboard-listeners'
import Buttons from './buttons'

let stores = initialize()

createKeyboardListeners()

function initialize() {
  const buttons = new Buttons()

  return observable({
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

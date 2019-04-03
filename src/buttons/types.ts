import { SoundInfo } from '../misc-types'

// TODO: How do you not have to do this...?

export type TabKey = '1' | '2' | '3' | '4' | '5'
export type ActionKey =
  | 'q'
  | 'w'
  | 'e'
  | 'r'
  | 't'
  | 'a'
  | 's'
  | 'd'
  | 'f'
  | 'g'
  | 'z'
  | 'x'
  | 'c'
  | 'v'
  | 'b'

export type ValidKeyboardKey = TabKey | ActionKey

const validKeys = {
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true,
  q: true,
  w: true,
  e: true,
  r: true,
  t: true,
  a: true,
  s: true,
  d: true,
  f: true,
  g: true,
  z: true,
  x: true,
  c: true,
  v: true,
  b: true
}

// TODO: rename every "valid tree thing" to keyboardKey

export const isValidKey = (key: string): key is ValidKeyboardKey => {
  const runtimeCopy = { ...validKeys } as any
  return !!runtimeCopy[key]
}

export enum ButtonType {
  Tab,
  Action
}

export interface ButtonBase<
  Type extends ButtonType = ButtonType,
  KeyboardKey extends ValidKeyboardKey = ValidKeyboardKey
> {
  type: Type
  title: string
  keyboardKey: KeyboardKey
}

export interface ActionButton extends ButtonBase<ButtonType.Action, ActionKey> {
  soundInfo: SoundInfo
  tab: TabKey
}

export interface TabButton extends ButtonBase<ButtonType.Tab, TabKey> {}

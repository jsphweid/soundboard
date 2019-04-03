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

const validTabKeys = {
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true
}

const validActionKeys = {
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

const validKeys = {
  ...validTabKeys,
  ...validActionKeys
}

function isValidGenerator<T extends string>(
  key: string,
  keyMap: any
): key is T {
  return !!keyMap[key]
}

export const isValidTabKey = (key: string): key is TabKey =>
  isValidGenerator(key, validTabKeys)

export const isValidActionKey = (key: string): key is ActionKey =>
  isValidGenerator(key, validActionKeys)

export const isValidKey = (key: string): key is ValidKeyboardKey =>
  isValidGenerator(key, validKeys)

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

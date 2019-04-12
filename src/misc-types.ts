// TODO: How do you not have to do this...?

export type KeyboardKey =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
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

const validKeyboardKeys = {
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

function isValidGenerator<T extends string>(
  key: string,
  keyMap: any
): key is T {
  return !!keyMap[key]
}

export const isKeyboardKey = (key: string): key is KeyboardKey =>
  isValidGenerator(key, validKeyboardKeys)

export enum ButtonType {
  Tab,
  Action
}

export interface ButtonBase<Type extends ButtonType = ButtonType> {
  type: Type
  title: string
  keyboardKey: KeyboardKey
  id: string
}

export interface ActionButton extends ButtonBase<ButtonType.Action> {
  tabId: string
  url: string
  start: number
  end: number
}

export function isActionButton(button: ButtonBase): button is ActionButton {
  return button.type === ButtonType.Action
}

export interface TabButton extends ButtonBase<ButtonType.Tab> {}

export function isTabButton(button: ButtonBase): button is TabButton {
  return button.type === ButtonType.Tab
}

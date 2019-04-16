import { Coordinate } from '../sounds/types'
import { v4 as uuidGen } from 'uuid'
import { numKeysWide, numKeysHigh, gridLookup } from '../board-layout'
import { KeyboardKey, ActionButton, ButtonType, TabButton } from '../misc-types'

export function determineKeyboardKeyDestination(
  boardWidth: number,
  boardHeight: number,
  xy: Coordinate
) {
  const y = Math.floor((xy.y / boardHeight) * numKeysHigh)
  const x = Math.floor((xy.x / boardWidth) * numKeysWide)
  const position =
    x >= numKeysWide || y >= numKeysHigh || x < 0 || y < 0 ? null : { x, y }
  return position ? gridLookup.getKeyFromCoords(position) : null
}

export interface DropdownOption {
  label: string
  value: string
}

export function enumToArray(Enum: any): DropdownOption[] {
  return Object.keys(Enum).map(key => ({ label: Enum[key], value: key }))
}

export function enumOptionToDropdownOption(
  EnumOpt: any,
  Enum: any
): DropdownOption {
  return enumToArray(Enum).find(
    item => item.label === EnumOpt
  ) as DropdownOption
}

export function generateRandomId(): string {
  return uuidGen()
}

export function audioUrlIsValid(url: string): Promise<boolean> {
  const audio = new Audio(url)
  audio.volume = 0
  return audio
    .play()
    .then(() => {
      audio.pause()
      return true
    })
    .catch(() => false)
}

export const makeBlankActionButton = (
  keyboardKey: KeyboardKey,
  tabId: string
): ActionButton => ({
  id: generateRandomId(),
  type: ButtonType.Action,
  title: '',
  keyboardKey,
  tabId,
  url: '',
  start: 0,
  end: 0
})

export const makeBlankTabButton = (keyboardKey: KeyboardKey): TabButton => ({
  id: generateRandomId(),
  type: ButtonType.Tab,
  title: '',
  keyboardKey
})

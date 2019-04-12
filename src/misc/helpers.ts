import { Coordinate } from '../sounds/types'
import {
  ButtonBase,
  isActionButton,
  isTabButton,
  KeyboardKey,
  isKeyboardKey
} from '../misc-types'
// import { getStores } from '../stores'
import { v4 as uuidGen } from 'uuid'
import { numKeysWide, numKeysHigh, gridLookup } from '../board-layout'

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

// export function pointInSection(
//   section: LayoutSection,
//   point: Coordinate
// ): boolean {
//   const { x, y, height, width } = section
//   return (
//     point.x >= x && point.y >= y && point.x < x + width && point.y < y + height
//   )
// }

// export function moveButton(button: ButtonBase, destination: KeyboardKey) {
//   if (!isKeyboardKey(destination)) return

//   if (isActionButton(button)) {
//     return getStores().actionButtons.moveActionButton(button, destination)
//   }

//   if (isTabButton(button)) {
//     return getStores().tabButtons.moveTabButton(button, destination)
//   }

//   console.log(
//     'An action key can only be moved to a valid action key tile. A tab key can only be moved to valid tab key tile.'
//   )
// }

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

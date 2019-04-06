import { Coordinate } from '../sounds/types'
import { LayoutSection } from '../components/board'
import {
  ButtonBase,
  ValidKeyboardKey,
  isValidTabKey,
  isActionButton,
  isValidActionKey,
  isTabButton
} from '../buttons/types'
import { getStores } from '../stores'
import { v4 as uuidGen } from 'uuid'

export function determineTileCoordsFromXY(
  boardDetails: {
    boardHeight: number
    boardWidth: number
    numItemsHigh: number
    numItemsWide: number
  },
  xy: Coordinate
): Coordinate | null {
  const { boardHeight, boardWidth, numItemsHigh, numItemsWide } = boardDetails
  const y = Math.floor((xy.y / boardHeight) * numItemsHigh)
  const x = Math.floor((xy.x / boardWidth) * numItemsWide)
  return x >= numItemsWide || y >= numItemsHigh || x < 0 || y < 0
    ? null
    : { x, y }
}

export function pointInSection(
  section: LayoutSection,
  point: Coordinate
): boolean {
  const { x, y, height, width } = section
  return (
    point.x >= x && point.y >= y && point.x < x + width && point.y < y + height
  )
}

export function moveButton(button: ButtonBase, destination: ValidKeyboardKey) {
  if (isActionButton(button) && isValidActionKey(destination)) {
    return getStores().actionButtons.moveActionButton(button, destination)
  }

  if (isTabButton(button) && isValidTabKey(destination)) {
    return getStores().tabButtons.moveTabButton(button, destination)
  }

  console.log(
    'An action key can only be moved to a valid action key tile. A tab key can only be moved to valid tab key tile.'
  )
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

export function makeRandomId() {
  return uuidGen()
}

import { KeyboardKey } from './misc-types'
import GridLookup from './misc/grid-lookup'

export const keyboardKeys: KeyboardKey[][] = [
  ['1', '2', '3', '4', '5'],
  ['q', 'w', 'e', 'r', 't'],
  ['a', 's', 'd', 'f', 'g'],
  ['z', 'x', 'c', 'v', 'b']
]

export const numKeysHigh = keyboardKeys.length
export const numKeysWide = keyboardKeys[0].length

export const gridLookup = new GridLookup(keyboardKeys)

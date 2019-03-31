import { Coordinate } from '../sounds/types'
import { ValidTreeThing } from './valid-tree-thing'

export const layout = [
  ['1', '2', '3', '4', '5'],
  ['q', 'w', 'e', 'r', 't'],
  ['a', 's', 'd', 'f', 'g'],
  ['z', 'x', 'c', 'v', 'b']
]

export const numItemsWide = layout[0].length

const coordinateMap = {} as { [key in ValidTreeThing]: Coordinate }

layout.forEach((row, y) => {
  row.forEach((item, x) => {
    coordinateMap[item as ValidTreeThing] = { x, y }
  })
})

export function getCoordinate(key: ValidTreeThing) {
  return coordinateMap[key]
}

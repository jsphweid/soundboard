// import { Coordinate } from '../sounds/types'
// import { ValidTreeThing } from './valid-tree-thing'

// const coordinateMap = {} as { [key in ValidTreeThing]: Coordinate }

// layout.forEach((row, y) => {
//   row.forEach((item, x) => {
//     coordinateMap[item as ValidTreeThing] = { x, y }
//   })
// })

// export function getCoordinate(key: ValidTreeThing) {
//   return coordinateMap[key]
// }

// export function getKeyboardKey(coordinate: Coordinate): ValidTreeThing | null {
//   try {
//     return layout[coordinate.y][coordinate.x] as ValidTreeThing
//   } catch (e) {
//     console.log('This coordinate does not map to a key...')
//     return null
//   }
// }

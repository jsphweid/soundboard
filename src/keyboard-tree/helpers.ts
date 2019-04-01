import { Coordinate } from '../sounds/types'

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
  console.log('boardDetails', boardDetails)
  const y = Math.floor((xy.y / boardHeight) * numItemsHigh)
  const x = Math.floor((xy.x / boardWidth) * numItemsWide)
  return x >= numItemsWide || y >= numItemsHigh || x < 0 || y < 0
    ? null
    : { x, y }
}

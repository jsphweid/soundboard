import { Coordinate } from '../sounds/types'

type KeyToCoordMap<T extends string> = { [key in T]: Coordinate }

export default class GridLookup<T extends string> {
  private originalGrid: T[][]
  private keyToCoordMap: KeyToCoordMap<T>

  constructor(grid: T[][]) {
    this.originalGrid = grid

    const ret = {} as KeyToCoordMap<T>
    grid.forEach((row, y) =>
      row.forEach((item, x) => {
        ret[item] = { x, y }
      })
    )
    this.keyToCoordMap = ret
  }

  public getCoordsFromKey = (key: T): Coordinate => {
    return this.keyToCoordMap[key]
  }

  public getKeyFromCoords = ({ x, y }: Coordinate): T => {
    return this.originalGrid[y][x]
  }
}

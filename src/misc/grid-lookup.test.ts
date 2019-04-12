import GridLookup from './grid-lookup'
import { KeyboardKey } from '../misc-types'

describe('GridLookup', () => {
  const grid: KeyboardKey[][] = [
    ['1', '2', '3', '4', '5'],
    ['q', 'w', 'e', 'r', 't'],
    ['a', 's', 'd', 'f', 'g'],
    ['z', 'x', 'c', 'v', 'b']
  ]

  const gridLookup = new GridLookup<KeyboardKey>(grid)

  test('that it should know that "q" is the origin', () => {
    expect(gridLookup.getCoordsFromKey('q')).toEqual({ x: 0, y: 0 })
  })

  test('that it should know that "w" is the x=1, y=0', () => {
    expect(gridLookup.getCoordsFromKey('w')).toEqual({ x: 1, y: 0 })
  })

  test('that it should know that "s" is the x=1, y=1', () => {
    expect(gridLookup.getCoordsFromKey('s')).toEqual({ x: 1, y: 1 })
  })

  test('that it should know that "d" is the x=2, y=1', () => {
    expect(gridLookup.getCoordsFromKey('d')).toEqual({ x: 2, y: 1 })
  })

  test('that it should know that x=2, y=1 is "d"', () => {
    expect(gridLookup.getKeyFromCoords({ x: 2, y: 1 })).toEqual('d')
  })

  test('that it should know that x=0, y=0 is "q"', () => {
    expect(gridLookup.getKeyFromCoords({ x: 0, y: 0 })).toEqual('q')
  })
})

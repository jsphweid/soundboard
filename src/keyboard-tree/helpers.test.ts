import { determineTileCoordsFromXY } from './helpers'

describe('helpers', () => {
  describe('determineTileCoordsFromXY', () => {
    const simpleBoardDetails = {
      boardHeight: 100,
      boardWidth: 100,
      numItemsHigh: 5,
      numItemsWide: 5
    }
    test('that a simple case works', () => {
      expect(
        determineTileCoordsFromXY(simpleBoardDetails, { x: 0, y: 0 })
      ).toEqual({ x: 0, y: 0 })
    })
    test('that a simple case works when not corner', () => {
      expect(
        determineTileCoordsFromXY(simpleBoardDetails, { x: 1, y: 1 })
      ).toEqual({ x: 0, y: 0 })
    })
    test('that a simple case works when it is one block over', () => {
      expect(
        determineTileCoordsFromXY(simpleBoardDetails, { x: 21, y: 0 })
      ).toEqual({ x: 1, y: 0 })
    })
    test('that a simple case works when it is one block diagonal', () => {
      expect(
        determineTileCoordsFromXY(simpleBoardDetails, { x: 21, y: 21 })
      ).toEqual({ x: 1, y: 1 })
    })
    test('that a simple case works when it is one block diagonal but "on the line"', () => {
      expect(
        determineTileCoordsFromXY(simpleBoardDetails, { x: 20, y: 20 })
      ).toEqual({ x: 1, y: 1 })
    })
    test('that if something is out of the box in x, it returns null', () => {
      expect(
        determineTileCoordsFromXY(simpleBoardDetails, { x: 100, y: 1 })
      ).toEqual(null)
    })
    test('that if something is out of the box in y, it returns null', () => {
      expect(
        determineTileCoordsFromXY(simpleBoardDetails, { x: 0, y: 100 })
      ).toEqual(null)
    })

    test('that if something is out of the box in -x, it returns null', () => {
      expect(
        determineTileCoordsFromXY(simpleBoardDetails, { x: -1, y: 0 })
      ).toEqual(null)
    })

    test('that if something is out of the box in -y, it returns null', () => {
      expect(
        determineTileCoordsFromXY(simpleBoardDetails, { x: 0, y: -1 })
      ).toEqual(null)
    })
  })
})

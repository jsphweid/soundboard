import { determineTileCoordsFromXY, pointInSection } from './helpers'
import { LayoutSection } from '../components/board'

describe('helpers', () => {
  describe('pointInSection', () => {
    const section: LayoutSection = {
      x: 100,
      y: 100,
      height: 100,
      width: 100
    }
    test('that it is obviously in section', () => {
      expect(pointInSection(section, { x: 150, y: 150 })).toEqual(true)
    })
    test('that it is obviously NOT in section', () => {
      expect(pointInSection(section, { x: 50, y: 50 })).toEqual(false)
    })
    test('that it is in section when on the line', () => {
      expect(pointInSection(section, { x: 100, y: 100 })).toEqual(true)
    })
    test('that it is NOT in section when one point is out of line', () => {
      expect(pointInSection(section, { x: 150, y: 1150 })).toEqual(false)
    })
  })
  describe('determineTileCoordsFromXY', () => {
    describe('one row board', () => {
      const simpleBoardDetails = {
        boardHeight: 100,
        boardWidth: 1000,
        numItemsHigh: 1,
        numItemsWide: 10
      }

      test('that basic case should work', () => {
        expect(
          determineTileCoordsFromXY(simpleBoardDetails, { x: 50, y: 0 })
        ).toEqual({ x: 0, y: 0 })
      })
      test('that basic case should work when 1 over', () => {
        expect(
          determineTileCoordsFromXY(simpleBoardDetails, { x: 100, y: 0 })
        ).toEqual({ x: 1, y: 0 })
      })
      test('that basic case should work when 1 over and then some', () => {
        expect(
          determineTileCoordsFromXY(simpleBoardDetails, { x: 110, y: 0 })
        ).toEqual({ x: 1, y: 0 })
      })
    })
    describe('multi row board board', () => {
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
})

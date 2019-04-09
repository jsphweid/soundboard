import { observable, action } from 'mobx'
import { Dimensions } from '../components/board'
import GridLookup from '../misc/grid-lookup'
import { KeyboardKey } from '../buttons/types'

export const keyboardKeys: KeyboardKey[][] = [
  ['1', '2', '3', '4', '5'],
  ['q', 'w', 'e', 'r', 't'],
  ['a', 's', 'd', 'f', 'g'],
  ['z', 'x', 'c', 'v', 'b']
]

export default class BoardLayout {
  @observable public dimensions: Dimensions = { width: 1, height: 1 }

  @action
  public setNewDimensions(newDimensions: Dimensions) {
    this.dimensions = newDimensions
  }

  public static menuBlockWidth = 1

  // assumes that each row is the same length (must be matrix)

  public static keyboardKeysGridLookup = new GridLookup(keyboardKeys)
}

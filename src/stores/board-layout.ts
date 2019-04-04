import { observable, action } from 'mobx'
import { Dimensions } from '../components/board'
import { ActionKey, TabKey } from '../buttons/types'
import GridLookup from '../misc/grid-lookup'

const hotkeys: ActionKey[][] = [
  ['q', 'w', 'e', 'r', 't'],
  ['a', 's', 'd', 'f', 'g'],
  ['z', 'x', 'c', 'v', 'b']
]

const tabs: TabKey[][] = [['1', '2', '3', '4', '5']]

export default class BoardLayout {
  @observable public dimensions: Dimensions = { width: 1, height: 1 }

  @action
  public setNewDimensions(newDimensions: Dimensions) {
    this.dimensions = newDimensions
  }

  public static menuBlockWidth = 1

  // assumes that each row is the same length (must be matrix)
  public static hotkeys: ActionKey[][] = hotkeys
  public static tabs: TabKey[][] = tabs

  public static hotkeysGridLookup = new GridLookup(hotkeys)
  public static tabsGridLookup = new GridLookup(tabs)
}

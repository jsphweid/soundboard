import BoardLayout from './board-layout'
import { computed } from 'mobx'
import { getStores } from '.'

export default class PortraitLayout extends BoardLayout {
  public numBlocksWide = BoardLayout.hotkeys[0].length
  public numBlocksHigh =
    BoardLayout.hotkeys.length + BoardLayout.menuBlockWidth + 1

  @computed
  get blockHeight() {
    return getStores().boardLayout.dimensions.height / this.numBlocksHigh
  }

  @computed
  get blockWidth() {
    return getStores().boardLayout.dimensions.width / this.numBlocksWide
  }

  @computed
  get actionKeysSection() {
    return {
      x: 0,
      y: this.blockHeight * 2,
      height: BoardLayout.hotkeys.length * this.blockHeight,
      width: getStores().boardLayout.dimensions.width
    }
  }

  @computed
  get tabKeysSection() {
    return {
      x: 0,
      y: this.blockHeight,
      height: this.blockHeight,
      width: getStores().boardLayout.dimensions.width
    }
  }

  @computed
  get menuSection() {
    return {
      x: 0,
      y: 0,
      height: this.blockHeight,
      width: getStores().boardLayout.dimensions.width
    }
  }
}

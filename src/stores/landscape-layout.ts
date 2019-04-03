import BoardLayout from './board-layout'
import { computed } from 'mobx'
import { getStores } from '.'

export default class LandscapeLayout extends BoardLayout {
  public numBlocksWide =
    BoardLayout.hotkeys[0].length + BoardLayout.menuBlockWidth
  public numBlocksHigh = BoardLayout.hotkeys.length + BoardLayout.tabs.length

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
      y: BoardLayout.tabs.length * this.blockHeight,
      height: BoardLayout.hotkeys.length * this.blockHeight,
      width: BoardLayout.hotkeys[0].length * this.blockWidth
    }
  }

  @computed
  get tabKeysSection() {
    return {
      x: 0,
      y: 0,
      height: this.blockHeight,
      width: BoardLayout.tabs[0].length * this.blockWidth
    }
  }

  @computed
  get menuSection() {
    return {
      x: BoardLayout.tabs[0].length * this.blockWidth,
      y: 0,
      height: getStores().boardLayout.dimensions.height,
      width: BoardLayout.menuBlockWidth * this.blockWidth
    }
  }
}

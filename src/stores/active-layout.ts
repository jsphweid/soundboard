import { computed } from 'mobx'
import { getStores } from '.'
import { Layout } from '../components/board'
import { Coordinate } from '../sounds/types'
import BoardLayout from './board-layout'
import { pointInSection, determineTileCoordsFromXY } from '../misc/helpers'

type LayoutType = 'landscapeLayout' | 'portraitLayout'

export default class ActiveLayout implements Layout {
  @computed
  private get activeLayoutKey(): LayoutType {
    return getStores()
      ? getStores().boardLayout.dimensions.width > 800
        ? 'landscapeLayout'
        : 'portraitLayout'
      : 'landscapeLayout'
  }

  @computed
  private get activeLayout() {
    return getStores()[this.activeLayoutKey]
  }

  @computed
  public get numBlocksHigh() {
    return this.activeLayout.numBlocksHigh
  }

  @computed
  public get numBlocksWide() {
    return this.activeLayout.numBlocksWide
  }

  @computed
  public get blockWidthPercent() {
    return 100 / this.numBlocksWide
  }

  @computed
  public get blockHeightPercent() {
    return 100 / this.numBlocksHigh
  }

  @computed
  public get blockHeight() {
    return this.activeLayout.blockHeight
  }

  @computed
  public get blockWidth() {
    return this.activeLayout.blockWidth
  }

  @computed
  public get actionKeysSection() {
    return this.activeLayout.actionKeysSection
  }
  @computed
  public get tabKeysSection() {
    return this.activeLayout.tabKeysSection
  }

  @computed
  public get menuSection() {
    return this.activeLayout.menuSection
  }

  @computed
  get keyboardKeySize() {
    const { blockHeight, blockWidth } = this.activeLayout
    return (blockHeight + blockWidth) * 0.3
  }

  @computed
  get titleSize() {
    return this.keyboardKeySize * 0.3
  }

  getKeyAtPageCoordinate(point: Coordinate) {
    const { tabKeysSection, actionKeysSection } = this.activeLayout
    if (pointInSection(tabKeysSection, point)) {
      const adjustedCoords = {
        x: point.x - tabKeysSection.x,
        y: point.y - tabKeysSection.y
      }
      const boardDetails = {
        boardHeight: tabKeysSection.height,
        boardWidth: tabKeysSection.width,
        numItemsHigh: BoardLayout.tabs.length,
        numItemsWide: BoardLayout.tabs[0].length
      }
      const tileCoords = determineTileCoordsFromXY(boardDetails, adjustedCoords)
      return tileCoords
        ? BoardLayout.tabsGridLookup.getKeyFromCoords(tileCoords)
        : null
    } else if (pointInSection(actionKeysSection, point)) {
      const adjustedCoords = {
        x: point.x - actionKeysSection.x,
        y: point.y - actionKeysSection.y
      }
      const boardDetails = {
        boardHeight: actionKeysSection.height,
        boardWidth: actionKeysSection.width,
        numItemsHigh: BoardLayout.hotkeys.length,
        numItemsWide: BoardLayout.hotkeys[0].length
      }
      const tileCoords = determineTileCoordsFromXY(boardDetails, adjustedCoords)
      return tileCoords
        ? BoardLayout.hotkeysGridLookup.getKeyFromCoords(tileCoords)
        : null
    } else {
      console.log('Point was outside of everything the board knows about...')
    }
  }
}

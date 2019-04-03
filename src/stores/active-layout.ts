import { computed } from 'mobx'
import { getStores } from '.'
import { Layout } from '../components/board'

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
}

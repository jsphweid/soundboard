import * as React from 'react'
import { observer } from 'mobx-react'
import { ValidKeyboardKey } from '../buttons/types'
import { getStores } from '../stores'
import BoardLayout from '../stores/board-layout'
import Tile from './tile'
import Button, { ButtonsWithCoords } from './button'

const resizeAware = require('react-resize-aware')
const ResizeAware = resizeAware.default || resizeAware

interface Props {}

interface State {
  activeLayout: 'landscapeLayout' | 'portraitLayout'
}

export interface Layout {
  numBlocksWide: number
  numBlocksHigh: number
  blockWidth: number
  blockHeight: number
  blockWidthPercent: number
  blockHeightPercent: number
  keyboardKeySize: number
  titleSize: number
  actionKeysSection: LayoutSection
  tabKeysSection: LayoutSection
  menuSection: LayoutSection
}

export interface LayoutSection {
  height: number
  width: number
  x: number
  y: number
}

export interface Dimensions {
  height: number
  width: number
}

@observer
export default class Board extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      activeLayout: 'landscapeLayout'
    }
  }

  private els: { board: any } = { board: null }

  handleResize = (size: { width: number }) => {
    const activeLayout = size.width > 800 ? 'landscapeLayout' : 'portraitLayout'
    this.setState({ activeLayout })

    getStores().boardLayout.setNewDimensions({
      width: size.width,
      height: window.innerHeight
    })
  }

  componentDidMount() {
    this.handleResize({
      width: this.els.board.clientWidth
    })
  }

  private renderKeysSection(
    section: LayoutSection,
    keyboardKeys: ValidKeyboardKey[][],
    buttonsWithCoords: ButtonsWithCoords[]
  ) {
    const tiles = keyboardKeys
      .flat()
      .map(tileKey => <Tile key={`tab-${tileKey}`} keyboardKey={tileKey} />)

    const buttons = buttonsWithCoords.map(button => {
      return <Button key={`button-${button.keyboardKey}`} button={button} />
    })
    return (
      <div
        style={{
          backgroundColor: 'blue',
          height: `${section.height}px`,
          width: `${section.width}px`,
          left: `${section.x}px`,
          top: `${section.y}px`,
          position: 'absolute'
        }}
      >
        {tiles}
        {buttons}
      </div>
    )
  }

  private renderTabKeysSection() {
    const { activeLayout, tabButtons } = getStores()
    return this.renderKeysSection(
      activeLayout.tabKeysSection,
      BoardLayout.tabs,
      tabButtons.tabs.map(button => ({
        coords: BoardLayout.tabsGridLookup.getCoordsFromkey(button.keyboardKey),
        ...button
      }))
    )
  }

  private renderActionKeysSection() {
    const { activeLayout, actionButtons } = getStores()
    return this.renderKeysSection(
      activeLayout.actionKeysSection,
      BoardLayout.hotkeys,
      actionButtons.currentButtonsInTab.map(button => ({
        coords: BoardLayout.hotkeysGridLookup.getCoordsFromkey(
          button.keyboardKey
        ),
        ...button
      }))
    )
  }

  private renderMenuSection() {
    const { height, width, x, y } = getStores().activeLayout.menuSection
    return (
      <div
        style={{
          backgroundColor: 'grey',
          height: `${height}px`,
          width: `${width}px`,
          left: `${x}px`,
          top: `${y}px`,
          zIndex: -1,
          position: 'absolute'
        }}
      >
        {/* menu */}
      </div>
    )
  }

  public render() {
    return (
      <ResizeAware
        ref={(el: any) => (this.els.board = el)}
        onlyEvent={true}
        onResize={this.handleResize}
        style={{
          position: 'relative',
          width: '100%',
          height: `100%`
        }}
      >
        {this.renderActionKeysSection()}
        {this.renderTabKeysSection()}
        {this.renderMenuSection()}
      </ResizeAware>
    )
  }
}

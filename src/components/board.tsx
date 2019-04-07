import * as React from 'react'
import { observer } from 'mobx-react'
import {
  ValidKeyboardKey,
  isValidActionKey,
  isTabButton,
  isValidTabKey
} from '../buttons/types'
import { getStores } from '../stores'
import BoardLayout from '../stores/board-layout'
import Tile from './tile'
import Button, { ButtonWithCoords } from './button'
import Draggable from 'react-draggable'
import { moveButton } from '../misc/helpers'
import { handleKeyPressOrClick } from '../misc/events'
import Menu from './menu'
import * as QueryString from 'query-string'
import Axios from 'axios'
import { apiBaseUrl } from '../misc/constants'

const resizeAware = require('react-resize-aware')
const ResizeAware = resizeAware.default || resizeAware

interface Props {}

interface State {
  activeLayout: 'landscapeLayout' | 'portraitLayout'
  buttonThatsBeingDragged: ButtonWithCoords | null // TODO: any...?
  everythingLoaded: boolean
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
  private doubleClickWaiter: NodeJS.Timer | null = null
  private els: { board: any } = { board: null }

  constructor(props: Props) {
    super(props)
    this.state = {
      activeLayout: 'landscapeLayout',
      buttonThatsBeingDragged: null,
      everythingLoaded: false
    }
  }

  componentDidMount() {
    this.handleResize({
      width: this.els.board.clientWidth
    })
    const query = QueryString.parse(location.search)
    if (query.board) {
      Axios.get(`${apiBaseUrl}/${query.board}`)
        .then(response => {
          getStores().actionButtons.reloadEverythingFromValidJSON(
            response.data.board
          )
        })
        .finally(() => this.setState({ everythingLoaded: true }))
    } else {
      this.setState({ everythingLoaded: true })
    }
  }

  handleDragDrop = (e: any) => {
    const { buttonThatsBeingDragged } = this.state
    if (!buttonThatsBeingDragged) return
    const { getKeyAtPageCoordinate, isTrashDrag } = getStores().activeLayout
    const { pageX, pageY } = e
    const point = { x: pageX, y: pageY }

    const destination = getKeyAtPageCoordinate(point)
    if (destination) {
      moveButton(buttonThatsBeingDragged, destination)
    } else if (
      isTrashDrag(point) &&
      isValidActionKey(buttonThatsBeingDragged.keyboardKey)
    ) {
      getStores().actionButtons.deleteButton(buttonThatsBeingDragged.id)
    }

    this.setState({ buttonThatsBeingDragged: null })
  }

  handleDragStart = () => {
    if (this.doubleClickWaiter) {
      clearTimeout(this.doubleClickWaiter)
    }
  }

  handleInitialDragStart = (e: any, button: ButtonWithCoords) => {
    // Assumes that everything is a block of equal proportion...
    const { blockWidth, blockHeight } = getStores().activeLayout
    const { tileWithButtonCreator } = getStores().buttonCreator
    const x = Math.floor(e.pageX / blockWidth) * blockWidth
    const y = Math.floor(e.pageY / blockHeight) * blockHeight

    // waiting for double click, else it was legit single click
    this.doubleClickWaiter = setTimeout(() => {
      if (
        tileWithButtonCreator &&
        tileWithButtonCreator.keyboardKey === button.keyboardKey
      ) {
        return
      }

      handleKeyPressOrClick(button.keyboardKey)
      this.setState({ buttonThatsBeingDragged: null })
    }, 100)

    this.setState({
      buttonThatsBeingDragged: { ...button, coords: { x, y } }
    })
  }

  handleDrag = () => {
    // TODO: add hover over tab makes it active
  }

  handleResize = (size: { width: number }) => {
    if (!size.width) return
    const activeLayout = size.width > 800 ? 'landscapeLayout' : 'portraitLayout'
    this.setState({ activeLayout })

    getStores().boardLayout.setNewDimensions({
      width: size.width,
      height: window.innerHeight
    })
  }

  private renderKeysSection(
    section: LayoutSection,
    keyboardKeys: ValidKeyboardKey[][],
    buttonsWithCoords: ButtonWithCoords[]
  ) {
    const tiles = keyboardKeys
      .flat()
      .map(tileKey => <Tile key={`tab-${tileKey}`} keyboardKey={tileKey} />)

    const { buttonThatsBeingDragged } = this.state

    const buttons = buttonsWithCoords
      .filter(button =>
        buttonThatsBeingDragged
          ? buttonThatsBeingDragged.id !== button.id
          : true
      )
      .map(button => {
        return (
          <Button
            key={`button${button.id}`}
            button={button}
            onClick={(e: any) => this.handleInitialDragStart(e, button)}
          />
        )
      })

    const key =
      keyboardKeys.length && isValidTabKey(keyboardKeys[0][0])
        ? 'tab-section'
        : 'action-section'

    return (
      <div
        key={key}
        style={{
          height: `${section.height}px`,
          width: `${section.width}px`,
          left: `${section.x}px`,
          top: `${section.y}px`,
          position: 'absolute',
          display: 'block'
        }}
      >
        {tiles}
        {buttons}
      </div>
    )
  }

  private renderButtonBeingDragged() {
    const button = this.state.buttonThatsBeingDragged
    if (!button) return null
    return (
      <Draggable
        key={`button-${button.id}`}
        bounds="parent"
        position={{ x: 0, y: 0 }}
        onDrag={this.handleDrag}
        onStart={this.handleDragStart}
        onStop={this.handleDragDrop}
      >
        <Button button={button} selected={true} />
      </Draggable>
    )
  }

  private renderTabKeysSection() {
    const { activeLayout, tabButtons } = getStores()
    return this.renderKeysSection(
      activeLayout.tabKeysSection,
      BoardLayout.tabs,
      tabButtons.tabs.map(button => {
        const { blockWidth, blockHeight } = activeLayout
        const { x, y } = BoardLayout.tabsGridLookup.getCoordsFromkey(
          button.keyboardKey
        )
        return {
          coords: { x: blockWidth * x, y: blockHeight * y },
          ...button
        }
      })
    )
  }

  private renderActionKeysSection() {
    const { activeLayout, actionButtons } = getStores()
    return this.renderKeysSection(
      activeLayout.actionKeysSection,
      BoardLayout.hotkeys,
      actionButtons.currentButtonsInTab.map(button => {
        const { blockWidth, blockHeight } = activeLayout
        const { x, y } = BoardLayout.hotkeysGridLookup.getCoordsFromkey(
          button.keyboardKey
        )
        return {
          coords: { x: blockWidth * x, y: blockHeight * y },
          ...button
        }
      })
    )
  }

  private renderMenuSection() {
    const { height, width, x, y } = getStores().activeLayout.menuSection
    return (
      <div
        key="menu"
        style={{
          backgroundColor: 'grey',
          height: `${height}px`,
          width: `${width}px`,
          left: `${x}px`,
          top: `${y}px`,
          position: 'absolute',
          boxShadow: `inset 0px 0px 0px 1px #000000`
        }}
      >
        <Menu />
      </div>
    )
  }

  public render() {
    const content =
      this.state.everythingLoaded &&
      getStores().activeLayout.blockHeight > 5 ? (
        [
          this.renderButtonBeingDragged(),
          this.renderActionKeysSection(),
          this.renderTabKeysSection(),
          this.renderMenuSection()
        ]
      ) : (
        <div
          style={{ backgroundColor: 'grey', width: '100vw', height: `100vh` }}
        >
          <h1 style={{ margin: `0px`, fontSize: `80px` }}>Loading...</h1>
        </div>
      )
    return (
      <ResizeAware
        ref={(el: any) => (this.els.board = el)}
        onlyEvent={true}
        onResize={this.handleResize}
        id="sb-board"
        style={{
          position: 'relative',
          width: '100vw',
          height: `100vh`
        }}
      >
        {content}
      </ResizeAware>
    )
  }
}

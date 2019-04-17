import * as React from 'react'
import { observer } from 'mobx-react'
import Button from './button'
import Draggable from 'react-draggable'
const resizeAware = require('react-resize-aware')
const ResizeAware = resizeAware.default || resizeAware
import {
  keyboardKeys,
  numKeysHigh,
  numKeysWide,
  gridLookup
} from '../board-layout'
import {
  determineKeyboardKeyDestination,
  makeBlankTabButton
} from '../misc/helpers'
import { KeyboardKey, EitherButton, isActionButton } from '../misc-types'
import axios from 'axios'
import { apiBaseUrl } from '../misc/constants'
import * as QueryString from 'query-string'
import { getStores } from '../stores'
import NewButton from './new-button'
import { makeBlankActionButton } from '../misc/helpers'

const css = require('./board.module.css')

export interface Layout {
  boardHeight: number
  boardWidth: number
  itemHeight: number
  itemWidth: number
}

interface State {
  buttonThatsBeingHovered: EitherButton | null
  buttonThatsBeingDragged: EitherButton | null
  everythingLoaded: boolean
  layout: Layout
  newButton: { keyboardKey: KeyboardKey; tabId: string } | null
}

interface Props {
  buttons: EitherButton[]
  handleMove: (button: EitherButton, keyboardKey: KeyboardKey) => void
}

@observer
export default class Board extends React.Component<Props, State> {
  private els: { board: any } = { board: null }

  constructor(props: Props) {
    super(props)
    this.state = {
      buttonThatsBeingDragged: null,
      buttonThatsBeingHovered: null,
      newButton: null,
      everythingLoaded: false,
      layout: {
        boardHeight: 0,
        boardWidth: 0,
        itemHeight: 0,
        itemWidth: 0
      }
    }
  }

  public componentDidMount() {
    const { clientWidth, clientHeight } = this.els.board
    this.handleResize({
      width: clientWidth,
      height: clientHeight
    })
    const query = QueryString.parse(location.search)
    if (query.board) {
      axios
        .get(`${apiBaseUrl}/${query.board}`)
        .then(response => {
          getStores().buttons.reloadEverythingFromValidJSON(response.data.board)
        })
        .finally(() => this.setState({ everythingLoaded: true }))
    } else {
      this.setState({ everythingLoaded: true })
    }
  }

  public componentDidUpdate() {
    const { buttonThatsBeingHovered, buttonThatsBeingDragged } = this.state
    if (buttonThatsBeingHovered) {
      if (buttonThatsBeingDragged) {
        return
      }
      const { id } = buttonThatsBeingHovered
      const possiblyNewButtonVersion = this.props.buttons.find(b => b.id === id)
      if (
        JSON.stringify(possiblyNewButtonVersion) !==
        JSON.stringify(buttonThatsBeingHovered)
      ) {
        this.setState({
          buttonThatsBeingHovered: possiblyNewButtonVersion || null
        })
      }
    }
  }

  private handleDragStop = (e: any) => {
    this.setState({ buttonThatsBeingDragged: null })
    const { buttonThatsBeingHovered } = this.state
    const coords = { x: e.pageX, y: e.pageY }
    const { boardHeight, boardWidth } = this.state.layout
    const keyboardKeyDestination = determineKeyboardKeyDestination(
      boardWidth,
      boardHeight,
      coords
    )

    if (buttonThatsBeingHovered && keyboardKeyDestination) {
      this.props.handleMove(buttonThatsBeingHovered, keyboardKeyDestination)
    }
  }

  private handleResize = (size: { width: number; height: number }) => {
    if (!size.width) return
    const layout = {
      boardWidth: size.width,
      boardHeight: size.height,
      itemWidth: size.width / numKeysWide,
      itemHeight: size.height / numKeysHigh
    }
    this.setState({ layout })
  }

  private renderTiles() {
    const tiles: JSX.Element[] = []

    const { itemHeight, itemWidth } = this.state.layout
    const { newButton } = this.state
    const { activeTabId, addButton } = getStores().buttons

    keyboardKeys.forEach(row =>
      row.forEach(key => {
        const tileHasNewButton =
          newButton &&
          newButton.keyboardKey === key &&
          newButton.tabId === activeTabId
        tiles.push(
          <div
            key={`tile-${key}`}
            className={css.tile}
            style={{
              height: itemHeight,
              width: itemWidth
            }}
            onDoubleClick={
              tileHasNewButton
                ? undefined
                : () =>
                    this.setState({
                      newButton: {
                        keyboardKey: key,
                        tabId: activeTabId
                      }
                    })
            }
          >
            {tileHasNewButton ? (
              <NewButton
                onNewTab={() => {
                  addButton(makeBlankTabButton(key))
                  this.setState({ newButton: null })
                }}
                onNewAction={() => {
                  addButton(makeBlankActionButton(key, activeTabId))
                  this.setState({ newButton: null })
                }}
              />
            ) : (
              <div className={css.tileNum}>{key}</div>
            )}
          </div>
        )
      })
    )
    return tiles
  }

  private renderButton = (button: EitherButton) => {
    const { itemHeight, itemWidth } = this.state.layout
    const coords = gridLookup.getCoordsFromKey(button.keyboardKey)
    const x = coords.x * itemWidth
    const y = coords.y * itemHeight
    return (
      <Draggable
        key={`button-${button.id}`}
        bounds="parent"
        handle=".handle"
        position={{ x: 0, y: 0 }}
        onStop={this.handleDragStop}
        onStart={() => this.setState({ buttonThatsBeingDragged: button })}
      >
        <Button
          button={button}
          displayProperties={{ height: itemHeight, width: itemWidth, x, y }}
          onMouseEnter={() =>
            this.setState({ buttonThatsBeingHovered: button })
          }
        />
      </Draggable>
    )
  }

  private renderHoveredButton() {
    const { buttonThatsBeingHovered } = this.state
    return buttonThatsBeingHovered
      ? this.renderButton(buttonThatsBeingHovered)
      : null
  }

  private renderStableButtons() {
    const { buttonThatsBeingHovered } = this.state
    return this.props.buttons
      .filter(
        ({ id }) =>
          !buttonThatsBeingHovered || id !== buttonThatsBeingHovered.id
      )
      .map(this.renderButton)
  }

  public render() {
    const { everythingLoaded } = this.state
    const { itemHeight, itemWidth } = this.state.layout

    // hack to hide stuff until height and widths are accurate
    const renderStuff = everythingLoaded && itemHeight > 30 && itemWidth > 30

    return (
      <ResizeAware
        ref={(el: any) => (this.els.board = el)}
        onlyEvent={true}
        onResize={this.handleResize}
        className="prevent-selection"
        id="sb-board"
        style={{
          position: 'relative',
          width: '100vw',
          transition: `height 1s`,
          height: everythingLoaded ? `100vh` : `0vh`
        }}
      >
        {renderStuff
          ? [
              this.renderTiles(),
              this.renderStableButtons(),
              this.renderHoveredButton()
            ]
          : null}
      </ResizeAware>
    )
  }
}

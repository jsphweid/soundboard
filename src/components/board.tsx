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
import { determineKeyboardKeyDestination } from '../misc/helpers'
import { KeyboardKey, EitherButton } from '../misc-types'

const css = require('./board.module.css')

export interface Layout {
  boardHeight: number
  boardWidth: number
  itemHeight: number
  itemWidth: number
}

interface State {
  buttonThatsBeingDragged: EitherButton | null
  everythingLoaded: boolean
  layout: Layout
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
    // const query = QueryString.parse(location.search)
    // if (query.board) {
    //   Axios.get(`${apiBaseUrl}/${query.board}`)
    //     .then(response => {
    //       getStores().actionButtons.reloadEverythingFromValidJSON(
    //         response.data.board
    //       )
    //     })
    //     .finally(() => this.setState({ everythingLoaded: true }))
    // } else {
    //   this.setState({ everythingLoaded: true })
    // }
  }

  private handleDragStop = (e: any) => {
    const { buttonThatsBeingDragged } = this.state
    const coords = { x: e.layerX, y: e.layerY }
    const { boardHeight, boardWidth } = this.state.layout
    const keyboardKeyDestination = determineKeyboardKeyDestination(
      boardWidth,
      boardHeight,
      coords
    )

    if (buttonThatsBeingDragged && keyboardKeyDestination) {
      this.props.handleMove(buttonThatsBeingDragged, keyboardKeyDestination)
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

    keyboardKeys.forEach(row =>
      row.forEach(key => {
        tiles.push(
          <div
            key={`tile-${key}`}
            className={css.tile}
            style={{ height: itemHeight, width: itemWidth }}
          >
            <div className={css.tileNum}>{key}</div>
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
        onDrag={() => console.log('onDrag')}
        onStart={() => console.log('onStart')}
        onStop={this.handleDragStop}
      >
        <Button
          button={button}
          displayProperties={{ height: itemHeight, width: itemWidth, x, y }}
          onTrigger={() => console.log('--')}
          onMouseEnter={() =>
            this.setState({ buttonThatsBeingDragged: button })
          }
        />
      </Draggable>
    )
  }

  private renderHoveredButton() {
    const { buttonThatsBeingDragged } = this.state
    return buttonThatsBeingDragged
      ? this.renderButton(buttonThatsBeingDragged)
      : null
  }

  private renderStableButtons() {
    return this.props.buttons
      .filter(button => button !== this.state.buttonThatsBeingDragged)
      .map(this.renderButton)
  }

  public render() {
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
        {this.renderTiles()}
        {this.renderStableButtons()}
        {this.renderHoveredButton()}
      </ResizeAware>
    )
  }
}

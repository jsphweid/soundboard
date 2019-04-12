import * as React from 'react'
import { observer } from 'mobx-react'
import Button, { ActionButtonWithCoords, TabButtonWithCoords } from './button'
import Draggable from 'react-draggable'
const resizeAware = require('react-resize-aware')
const ResizeAware = resizeAware.default || resizeAware
import * as QueryString from 'query-string'
import { keyboardKeys, numKeysHigh, numKeysWide } from '../board-layout'

const css = require('./board.module.css')

interface Layout {
  boardHeight: number
  boardWidth: number
  itemHeight: number
  itemWidth: number
}

interface State {
  buttonThatsBeingDragged: ActionButtonWithCoords | TabButtonWithCoords | null
  everythingLoaded: boolean
  layout: Layout
}

interface Props {
  buttons: Array<ActionButtonWithCoords | TabButtonWithCoords>
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

  private renderButton = (
    button: ActionButtonWithCoords | TabButtonWithCoords
  ) => {
    const { itemHeight, itemWidth } = this.state.layout
    const { coords } = button
    const x = coords.x * itemWidth
    const y = coords.y * itemHeight
    return (
      <Draggable
        key={`button-${button.id}`}
        bounds="parent"
        position={{ x: 0, y: 0 }}
        onDrag={() => console.log('onDrag')}
        onStart={() => console.log('onStart')}
        onStop={() => console.log('onStop')}
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

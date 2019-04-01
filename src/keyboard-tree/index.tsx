import * as React from 'react'
import { getStores } from '../stores'
import { KeyboardTreeType } from '../stores/keyboard-tree'
import SoundboardButton from '../components/soundboard-button'
import { numItemsWide, layout, numItemsHigh } from './layout'
import { observer } from 'mobx-react'
import { Coordinate } from '../sounds/types'
import { determineTileCoordsFromXY } from './helpers'

const resizeAware = require('react-resize-aware')
const ResizeAware = resizeAware.default || resizeAware

interface Props {}

interface State {
  boardHeight: number
  boardWidth: number
  tileSize: number // tileWidth?
  tileHeight: number
  backgroundFontSize: string
  mainFontSize: string
}

export const widthPercent = 100 / numItemsWide
export const widthPercentText = `${widthPercent}%`
export const heightPercent = 100 / numItemsHigh
export const heightPercentText = `${heightPercent}%`

const fontFamily = 'tahoma,sans-serif'

@observer
export default class KeyboardTree extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      boardHeight: 0,
      boardWidth: 0,
      tileSize: 0,
      tileHeight: 0,
      backgroundFontSize: '0',
      mainFontSize: '0'
    }
  }

  private els: { board: any } = { board: null }

  computeMeasurements = (width: number, height: number) => {
    const tileSize = width / numItemsWide
    const tileHeight = height / numItemsHigh
    const backgroundFontSize = (tileSize * 0.6 + tileHeight * 0.6) / 2
    const mainFontSize = backgroundFontSize * 0.3
    return {
      boardWidth: width,
      tileSize,
      boardHeight: height,
      tileHeight,
      mainFontSize: `${mainFontSize}px`,
      backgroundFontSize: `${backgroundFontSize}px`
    }
  }

  handleResize = (size: { width: number; height: number }) => {
    this.setState({
      ...this.computeMeasurements(size.width, window.innerHeight)
    })
  }

  componentDidMount() {
    const { clientWidth } = this.els.board
    this.setState({
      ...this.computeMeasurements(clientWidth, window.innerHeight)
    })
  }

  handleDrop = (id: string, dropCoord: Coordinate) => {
    const position = determineTileCoordsFromXY(
      { ...this.state, numItemsHigh, numItemsWide },
      dropCoord
    )
    if (!position) {
      console.log('Ignoring drop because it was out of range.')
      return
    }

    getStores().keyboardTree.moveItem(id, position)
  }

  handlePausedForAWhile = (id: string, pausedCoord: Coordinate) => {
    console.log('pausedCoord', pausedCoord)
    const position = determineTileCoordsFromXY(
      { ...this.state, numItemsHigh, numItemsWide },
      pausedCoord
    )
    if (!position) {
      console.log('Ignoring drop because it was out of range.')
      return
    }
    console.log('position', position)

    // TODO: this fundamentally will not work because the items displayed / view are only for this one view... maybe change that? or think of some other strategy

    getStores().keyboardTree.goInto(position)
  }

  public render() {
    const tiles = layout.map(row =>
      row.flatMap(key => (
        <div
          key={`rect-${key}`}
          style={{
            width: widthPercentText,
            height: `${this.state.tileHeight}px`,
            float: 'left',
            textAlign: 'center',
            position: 'relative',
            pointerEvents: 'none',
            // border: '0.5px solid black'
            backgroundColor: 'grey'
          }}
        >
          <div
            style={{
              position: `absolute`,
              // zIndex: `-1`,
              fontSize: this.state.backgroundFontSize,
              fontFamily,
              opacity: 0.1,
              border: '0.5px solid black',
              height: `100%`,
              width: `100%`
            }}
          >
            {key}
          </div>
        </div>
      ))
    )

    const soundboardButtons = getStores().keyboardTree.currentTreeViewArray.map(
      (item, i) => {
        const backgroundImage =
          item.type === KeyboardTreeType.Branch
            ? 'url(https://res.cloudinary.com/dx6f6g5cv/image/upload/c_scale,o_12,q_32,w_463/v1554043826/1_xUVx8GVAl1AFgb9wp-PlyA_msxm5k.jpg)'
            : 'url(https://res.cloudinary.com/dx6f6g5cv/image/upload/c_scale,o_12,q_43,w_534/v1552677118/speakers-sound-icon-music-0a3787-1024_t1snbx.png)'
        const reactKey = `soundboard-button-${i}`
        const { x, y } = item.coordinate
        const style = {
          left: `${x * widthPercent}%`,
          top: `${y * heightPercent}%`,
          fontFamily,
          fontSize: this.state.mainFontSize,
          backgroundImage
        }
        const commonProps = {
          key: reactKey,
          style,
          id: item.id,
          keyboardKey: item.key,
          dropHandler: this.handleDrop,
          pausedForAWhileHandler: this.handlePausedForAWhile
        }
        return item.type === KeyboardTreeType.Branch ? (
          <SoundboardButton {...commonProps} title={item.title} />
        ) : (
          <SoundboardButton {...commonProps} {...item.data} />
        )
      }
    )

    return (
      <ResizeAware
        ref={(el: any) => (this.els.board = el)}
        onlyEvent={true}
        onResize={this.handleResize}
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: `100%`
        }}
      >
        {tiles}
        {soundboardButtons}
      </ResizeAware>
    )
  }
}

import * as React from 'react'
import { getStores } from '../stores'
import { KeyboardTreeType } from '../stores/keyboard-tree'
import SoundboardButton from '../components/soundboard-button'
import { numItemsWide, layout } from './layout'
import { observer } from 'mobx-react'

const resizeAware = require('react-resize-aware')
const ResizeAware = resizeAware.default || resizeAware

interface Props {}

interface State {
  boardSize: number
  tileSize: number
}

export const squarePercent = 100 / numItemsWide
export const squarePercentText = `${squarePercent}%`

const squareStyles = {
  width: squarePercentText,
  paddingBottom: squarePercentText,
  float: 'left',
  position: 'relative',
  pointerEvents: 'none'
}

@observer
export default class KeyboardTree extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      boardSize: 0,
      tileSize: 0
    }
  }

  private els: { board: any } = { board: null }

  handleResize = (size: { width: number }) => {
    const tileSize = size.width / numItemsWide

    this.setState({ boardSize: size.width, tileSize })
  }

  componentDidMount() {
    const boardSize = this.els.board.clientWidth
    const tileSize = boardSize / numItemsWide
    this.setState({ boardSize, tileSize })
  }

  public render() {
    const { boardSize } = this.state
    const tileSize = boardSize / numItemsWide

    const tiles = layout.map(row =>
      row.flatMap(key => (
        <div key={`rect-${key}`} style={{ ...squareStyles }}>
          {key}
        </div>
      ))
    )

    const soundboardButtons = getStores().keyboardTree.currentTreeViewArray.map(
      (item, i) => {
        const reactKey = `soundboard-button-${i}`
        const { x, y } = item.coordinate
        if (item.type === KeyboardTreeType.Branch) {
          return (
            <SoundboardButton
              key={reactKey}
              x={x}
              y={y}
              title="go deeper"
              keyboardKey={item.key}
            />
          )
        } else {
          return (
            <SoundboardButton
              key={reactKey}
              x={x}
              y={y}
              {...item.data}
              keyboardKey={item.key}
            />
          )
        }
      }
    )

    const boardStyles = {
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      height: boardSize
    }

    return (
      <ResizeAware
        ref={(el: any) => (this.els.board = el)}
        onlyEvent={true}
        onResize={this.handleResize}
        style={boardStyles}
      >
        {tiles}
        {soundboardButtons}
      </ResizeAware>
    )
  }
}

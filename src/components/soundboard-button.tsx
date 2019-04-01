import * as React from 'react'
import { SoundboardButtonData } from '../stores/soundboard-buttons-store'
import { getStores } from '../stores'
import { SoundInfo } from '../misc-types'
import {
  widthPercentText,
  widthPercent,
  heightPercentText
} from '../keyboard-tree'
import { ValidTreeThing } from '../keyboard-tree/valid-tree-thing'
import { handleKeyPressOrClick } from '../keyboard-tree/tree-events'
import Draggable, { DraggableData } from 'react-draggable'
import { Coordinate } from '../sounds/types'

// TODO: maybe this means I should be doing something else
type SoundboardButtonDataExcluded = Pick<
  SoundboardButtonData,
  Exclude<keyof SoundboardButtonData, 'soundInfo'>
>

interface SoundboardButtonDataModified extends SoundboardButtonDataExcluded {
  soundInfo?: SoundInfo
}

interface Props extends SoundboardButtonDataModified {
  style?: any
  keyboardKey: ValidTreeThing
  dropHandler: (key: string, { x, y }: Coordinate) => void
  pausedForAWhileHandler: (key: string, { x, y }: Coordinate) => void
  id: string
}

interface State {
  isReallyDragging: boolean
  dragCounter: number
  pausedHandlerJustCalled: boolean
}

export default class SoundboardButton extends React.Component<Props, State> {
  private delayedAction: NodeJS.Timer | undefined
  private pausedDragTimer: NodeJS.Timer | undefined

  constructor(props: Props) {
    super(props)
    this.state = {
      isReallyDragging: false,
      dragCounter: 0,
      pausedHandlerJustCalled: false
    }
  }

  componentWillUnmount() {
    if (this.delayedAction) {
      clearTimeout(this.delayedAction)
    }
    if (this.pausedDragTimer) {
      clearTimeout(this.pausedDragTimer)
    }
  }

  private handleClick = () => {
    const { isReallyDragging, dragCounter } = this.state
    if (!isReallyDragging || dragCounter < 5) {
      // TODO: use id?
      handleKeyPressOrClick(this.props.keyboardKey)
    }
  }

  private handleStop = (e: any) => {
    // Works assuming origin 0, 0 is top left of board
    if (this.pausedDragTimer) {
      clearTimeout(this.pausedDragTimer)
    }
    this.props.dropHandler(this.props.id, {
      x: e.clientX,
      y: e.clientY
    })
    this.delayedAction = setTimeout(
      () =>
        this.setState({
          isReallyDragging: false,
          dragCounter: 0,
          pausedHandlerJustCalled: false
        }),
      100
    )
  }

  private handleDragging = (e: any) => {
    if (this.pausedDragTimer) {
      clearTimeout(this.pausedDragTimer)
    }
    this.pausedDragTimer = setTimeout(() => {
      if (!this.state.pausedHandlerJustCalled) {
        this.setState({ pausedHandlerJustCalled: true })
        this.props.pausedForAWhileHandler(this.props.id, {
          x: e.clientX,
          y: e.clientY
        })
      }
    }, 1000)
    this.setState({
      isReallyDragging: true,
      dragCounter: this.state.dragCounter + 1,
      pausedHandlerJustCalled: false
    })
  }

  render() {
    const styles = {
      ...this.props.style,
      position: 'absolute',
      textAlign: 'center',
      backgroundColor: '#aaaaaa',
      backgroundPosition: 'center',
      opacity: '0.4',
      width: widthPercentText,
      height: heightPercentText
    }

    return (
      <Draggable
        bounds="parent"
        position={{ x: 0, y: 0 }}
        // onStart={}
        onDrag={this.handleDragging}
        onStop={this.handleStop}
      >
        <div onClick={this.handleClick} style={styles}>
          {this.props.title}
        </div>
      </Draggable>
    )
  }
}

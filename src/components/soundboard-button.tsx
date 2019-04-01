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
  id: string
}

interface State {
  isReallyDragging: boolean
  dragCounter: number
}

export default class SoundboardButton extends React.Component<Props, State> {
  private delayedAction: NodeJS.Timer | undefined

  constructor(props: Props) {
    super(props)
    this.state = {
      isReallyDragging: false,
      dragCounter: 0
    }
  }

  componentWillUnmount() {
    if (this.delayedAction) {
      clearTimeout(this.delayedAction)
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
    this.props.dropHandler(this.props.id, {
      x: e.clientX,
      y: e.clientY
    })
    this.delayedAction = setTimeout(
      () => this.setState({ isReallyDragging: false, dragCounter: 0 }),
      100
    )
  }

  private handleDragging = () => {
    console.log('handleDragging')
    this.setState({
      isReallyDragging: true,
      dragCounter: this.state.dragCounter + 1
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

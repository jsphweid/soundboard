import * as React from 'react'
import { ButtonType, EitherButton } from '../misc-types'
import { MdClose, MdDragHandle, MdEdit } from 'react-icons/md'
import EditActionButtonForm from './button-creation/edit-action-button-form'
import EditTabButtonForm from './button-creation/edit-tab-button-form'

const css = require('./button.module.css')

interface DraggableProps {
  style?: any
  className?: string
  onTouchEnd?: any
  onTouchStart?: any
  onMouseUp?: any
  onMouseDown?: any
  onClick?: any
  selected?: boolean
}

interface ButtonDisplayProperties {
  height: number
  width: number
  x: number
  y: number
}

interface Props extends DraggableProps {
  button: EitherButton
  onTrigger: () => void
  displayProperties?: ButtonDisplayProperties
  onMouseEnter?: () => void
  // onDataUpdate: (data: T) => void
}

const defaultDisplayProps = {
  height: 300,
  width: 300,
  x: 0,
  y: 0
}

interface State {
  editing: boolean
}

// const handleSave = ({ url, title, start, end }: any) => {
//   const { tileWithButtonCreator, cancel } = getStores().buttonCreator
//   const { addButton } = getStores().actionButtons
//   const { tabId, keyboardKey } = tileWithButtonCreator as TileIdentifier
//   addButton({
//     url,
//     start,
//     end,
//     title,
//     type: ButtonType.Action,
//     id: makeRandomId(),
//     tabId,
//     keyboardKey
//   })
//   cancel()
// }

export default class Button extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  private renderEditForm() {
    switch (this.props.button.type) {
      case ButtonType.Action:
        return (
          <EditActionButtonForm
            onCancel={() => this.setState({ editing: false })}
            onSave={data => console.log('saving data', data)}
            initialData={this.props.button}
          />
        )
      case ButtonType.Tab:
        return (
          <EditTabButtonForm
            onCancel={() => this.setState({ editing: false })}
            onSave={data => console.log('saving data', data)}
            initialData={this.props.button}
          />
        )
      default:
        return null
    }
  }

  private renderMainContent() {
    return this.state.editing ? (
      this.renderEditForm()
    ) : (
      <div className={css.bigButton} />
    )
  }

  public render() {
    const {
      style,
      className,
      onTouchEnd,
      onTouchStart,
      onMouseDown,
      onMouseUp,
      displayProperties,
      onMouseEnter
    } = this.props

    const { height, width, x, y } = displayProperties || defaultDisplayProps
    return (
      <div
        onMouseEnter={onMouseEnter}
        className={`${css.button} ${className}`}
        style={{
          ...style,
          height: `${height}px`,
          width: `${width}px`,
          left: `${x}px`,
          top: `${y}px`
        }}
        {...{
          onTouchEnd,
          onTouchStart,
          onMouseDown,
          onMouseUp
        }}
      >
        <div className={css.buttonRow}>
          <MdEdit
            className={css.icon}
            onClick={() => this.setState({ editing: true })}
          />
          <MdDragHandle className={`${css.icon} handle`} />
          <MdClose className={css.icon} />
        </div>
        {this.renderMainContent()}
      </div>
    )
  }
}

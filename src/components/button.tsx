import * as React from 'react'
import { ButtonType, EitherButton } from '../misc-types'
import { MdClose, MdDragHandle, MdEdit } from 'react-icons/md'
import EditActionButtonForm from './button-creation/edit-action-button-form'
import EditTabButtonForm from './button-creation/edit-tab-button-form'
import { getStores } from '../stores'
import { observer } from 'mobx-react'

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

// TODO: refactor so all of the getStores() are out of here...

@observer
export default class Button extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  private renderEditForm() {
    const { button } = this.props
    switch (this.props.button.type) {
      case ButtonType.Action:
        return (
          <EditActionButtonForm
            onCancel={() => this.setState({ editing: false })}
            onSave={data => {
              this.setState({ editing: false })
              getStores().buttons.updateButton(button.id, data)
            }}
            initialData={this.props.button}
          />
        )
      case ButtonType.Tab:
        return (
          <EditTabButtonForm
            onCancel={() => this.setState({ editing: false })}
            onSave={data => {
              this.setState({ editing: false })
              getStores().buttons.updateButton(button.id, data)
            }}
            initialData={this.props.button}
          />
        )
      default:
        return null
    }
  }

  private renderMainContent() {
    const activeId = getStores().buttons.activeTabId
    const { id, title, onTrigger } = this.props.button

    return this.state.editing ? (
      this.renderEditForm()
    ) : activeId === id ? (
      <button className={css.bigButtonActive}>{title}</button>
    ) : (
      <button className={css.bigButton} onClick={onTrigger}>
        {title}
      </button>
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
    const { button } = this.props
    return (
      <div
        onMouseEnter={onMouseEnter}
        className={`${css.button} ${className}`}
        style={{
          ...style,
          height: `${height}px`,
          width: `${width}px`,
          left: `${x}px`,
          top: `${y}px`,
          background: `${button.type === ButtonType.Tab ? 'black' : ''}`
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
          <MdClose
            className={css.icon}
            onClick={() => getStores().buttons.deleteButton(button.id)}
          />
        </div>
        {this.renderMainContent()}
      </div>
    )
  }
}

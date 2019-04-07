import * as React from 'react'
import { ButtonBase, isTabButton } from '../buttons/types'
import { getStores } from '../stores'
import { Coordinate } from '../sounds/types'
import { observer } from 'mobx-react'
import { FaEdit } from 'react-icons/fa'
import NewButtonForm from './button-creation/new-button-form'

export interface ButtonWithCoords extends ButtonBase {
  coords: Coordinate
}

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

interface Props extends DraggableProps {
  button: ButtonWithCoords
}

interface State {
  hover: boolean
}

@observer
export default class Button extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      hover: false
    }
  }

  private renderEditButton() {
    return this.state.hover ? (
      <FaEdit
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '30px',
          width: '30px',
          cursor: 'pointer',
          zIndex: 10
        }}
        onClick={() => getStores().buttonCreator.registerCreator()}
      />
    ) : null
  }

  public render() {
    const {
      button,
      style,
      className,
      onTouchEnd,
      onTouchStart,
      onMouseDown,
      onMouseUp,
      onClick,
      selected
    } = this.props

    const { blockWidth, blockHeight, titleSize } = getStores().activeLayout
    const { activeTabId } = getStores().tabButtons
    const highlightedStyles =
      isTabButton(button) && button.id === activeTabId
        ? {
            boxShadow: `inset 0px 0px 0px 5px #000000`
          }
        : {}

    return (
      <div
        {...{ className, onTouchEnd, onTouchStart, onMouseDown, onMouseUp }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        style={{
          ...style,
          left: `${button.coords.x}px`,
          top: `${button.coords.y}px`,
          position: `absolute`,
          width: `${blockWidth}px`,
          height: `${blockHeight}px`,
          zIndex: selected ? '100' : undefined,
          opacity: 0.5,
          boxShadow: `inset 0px 0px 0px 0.5px #000000`,
          fontSize: `${titleSize}px`,
          textAlign: `center`,
          ...highlightedStyles
        }}
        onClick={onClick}
      >
        <NewButtonForm />
        {/* {this.renderEditButton()}
        {button.title} */}
      </div>
    )
  }
}

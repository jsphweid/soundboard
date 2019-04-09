import * as React from 'react'
import { ActionButton, TabButton } from '../buttons/types'
import { Coordinate } from '../sounds/types'
import { MdClose, MdDragHandle, MdEdit } from 'react-icons/md'
import EditButtonForm from './button-creation/edit-button-form'

const css = require('./button.module.css')

export interface ActionButtonWithCoords extends ActionButton {
  coords: Coordinate
}

export interface TabButtonWithCoords extends TabButton {
  coords: Coordinate
}

interface Props {
  button: ActionButtonWithCoords | TabButtonWithCoords
  onClick?: any
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

  private renderMainContent() {
    return this.state.editing ? (
      <EditButtonForm
        onCancel={() => this.setState({ editing: false })}
        onSave={data => console.log('saving data', data)}
      />
    ) : (
      <div className={css.bigButton} />
    )
  }

  public render() {
    return (
      <div className={css.button}>
        <div className={css.buttonRow}>
          <MdEdit
            className={`${css.icon}`}
            onClick={() => this.setState({ editing: true })}
          />
          <MdDragHandle className={`${css.icon}`} />
          <MdClose className={`${css.icon}`} />
        </div>
        {this.renderMainContent()}
      </div>
    )
  }
}

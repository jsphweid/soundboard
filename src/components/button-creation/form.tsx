import * as React from 'react'
import { getStores } from '../../stores'
import { ButtonType } from '../../buttons/types'
import { TileIdentifier } from '../../stores/button-creator'
import { makeRandomId } from '../../misc/helpers'

interface Props {}

interface State {
  url: string
  title: string
  startSeconds: number
  endSeconds: number
}

export default class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      title: '',
      url: '',
      startSeconds: 0,
      endSeconds: 60
    }
  }

  private renderSaveCancel() {
    const { cancel, tileWithButtonCreator } = getStores().buttonCreator
    const { addButton } = getStores().actionButtons
    const { title, url, startSeconds, endSeconds } = this.state

    const { tabId, keyboardKey } = tileWithButtonCreator as TileIdentifier

    return (
      <div>
        <button
          onClick={() => {
            addButton({
              title,
              type: ButtonType.Action,
              id: makeRandomId(),
              tabId,
              keyboardKey,
              url,
              startSeconds,
              endSeconds
            })
            cancel()
          }}
        >
          save
        </button>
        <button onClick={cancel}>cancel</button>
      </div>
    )
  }

  public render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.url}
          onChange={e => this.setState({ url: e.target.value })}
          placeholder={'url'}
        />
        <input
          type="text"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
          placeholder={'title'}
        />
        <input
          type="number"
          value={this.state.startSeconds}
          onChange={e =>
            this.setState({ startSeconds: parseFloat(e.target.value) })
          }
        />
        <input
          type="number"
          value={this.state.endSeconds}
          onChange={e =>
            this.setState({ endSeconds: parseFloat(e.target.value) })
          }
        />
        {this.renderSaveCancel()}
      </div>
    )
  }
}

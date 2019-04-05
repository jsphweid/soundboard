import * as React from 'react'
import { getStores } from '../../stores'
import { ButtonType } from '../../buttons/types'
import { SoundInfoTypes } from '../../misc-types'
import { v4 as uuidGen } from 'uuid'
import { TileIdentifier } from '../../stores/button-creator'

interface Props {}

interface State {
  url: string
  title: string
}

export default class UrlSoundForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      title: '',
      url: ''
    }
  }

  private renderSaveCancel() {
    const { cancel, tileWithButtonCreator } = getStores().buttonCreator
    const { addButton } = getStores().actionButtons
    const { title, url } = this.state

    const { tabId, keyboardKey } = tileWithButtonCreator as TileIdentifier

    return (
      <div>
        <button
          onClick={() => {
            addButton({
              soundInfo: {
                url,
                type: SoundInfoTypes.UrlSound,
                soundInfoId: uuidGen()
              },
              title,
              type: ButtonType.Action,
              id: uuidGen(),
              tabId,
              keyboardKey
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
        {this.renderSaveCancel()}
      </div>
    )
  }
}

import * as React from 'react'
import { getStores } from '../../stores'
import { ButtonType } from '../../buttons/types'
import { SoundInfoTypes } from '../../misc-types'
import { TileIdentifier } from '../../stores/button-creator'
import { makeRandomId } from '../../misc/helpers'

interface Props {}

interface State {
  url: string
  title: string
  error: string | null
}

function audioUrlIsValid(url: string): Promise<boolean> {
  const audio = new Audio(url)
  audio.volume = 0
  return audio
    .play()
    .then(() => {
      audio.pause()
      return true
    })
    .catch(() => false)
}

export default class UrlSoundForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      title: '',
      url: '',
      error: null
    }
  }

  public componentDidUpdate(_: any, previousState: State) {
    if (
      previousState.error &&
      JSON.stringify(previousState.error) === JSON.stringify(this.state.error)
    ) {
      this.setState({ error: null })
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
          onClick={async () => {
            const isValid = await audioUrlIsValid(url)

            if (!isValid) {
              this.setState({ error: 'Invalid audio URL.' })
              return
            }

            if (!title) {
              this.setState({ error: 'Please enter a title.' })
              return
            }

            addButton({
              soundInfo: {
                url,
                type: SoundInfoTypes.UrlSound,
                soundInfoId: makeRandomId()
              },
              title,
              type: ButtonType.Action,
              id: makeRandomId(),
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
        {this.state.error}
        {this.renderSaveCancel()}
      </div>
    )
  }
}

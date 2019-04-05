import * as React from 'react'
import Select from 'react-select'
import { SoundInfoTypes } from '../../misc-types'
import { enumToArray, enumOptionToDropdownOption } from '../../misc/helpers'
import UrlSoundForm from './url-sound-form'

interface Props {}

interface State {
  buttonCreatorType: SoundInfoTypes
}

const options = enumToArray(SoundInfoTypes)

export default class ButtonCreatorForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      buttonCreatorType: SoundInfoTypes.UrlSound
    }
  }

  private renderAppropriateForm() {
    switch (this.state.buttonCreatorType) {
      case SoundInfoTypes.UrlSound:
        return <UrlSoundForm />
      default:
        return <div>u messed up</div>
    }
  }

  public render() {
    const { buttonCreatorType } = this.state

    return (
      <div style={{ width: `100%`, height: `100%` }}>
        <div>
          <Select
            value={enumOptionToDropdownOption(
              buttonCreatorType,
              SoundInfoTypes
            )}
            options={options}
            onChange={(a: any) =>
              this.setState({
                buttonCreatorType: SoundInfoTypes[a.value] as SoundInfoTypes
              })
            }
          />
          {this.renderAppropriateForm()}
        </div>
      </div>
    )
  }
}

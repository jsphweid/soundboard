import * as React from 'react'
import Select from 'react-select'
import { SoundInfoTypes } from '../../misc-types'

interface Props {}

interface State {
  buttonCreatorType: SoundInfoTypes
}

export default class ButtonCreationForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      buttonCreatorType: SoundInfoTypes.UrlSound
    }
  }
  public render() {
    return (
      <Select
        value={this.state.buttonCreatorType}
        onChange={(a: any) => console.log('a', a)}
      />
    )
  }
}

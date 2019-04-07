import * as React from 'react'
import Modal from 'react-modal'
import { getStores } from '../stores'
import { observer } from 'mobx-react'

interface State {
  isLoading: boolean
}

@observer
export default class SaveBoardModal extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  private async handleShare() {
    const json = getStores().actionButtons.getSerializedActionButtons()
  }

  public render() {
    const { saveBoardModalIsOpen, closeSaveBoardModal } = getStores().saveBoard

    return (
      <Modal isOpen={saveBoardModalIsOpen} onRequestClose={closeSaveBoardModal}>
        <div style={{ maxWidth: `600px`, margin: `0 auto`, marginTop: `10%` }}>
          Once you click Share, your settings will be saved and a link will be
          given to you to share with anyone.
          <div>
            <button onClick={this.handleShare}>Share</button>
            <button onClick={closeSaveBoardModal}>Cancel</button>
          </div>
          <div>{this.state.isLoading ? 'Loading...' : null}</div>
        </div>
      </Modal>
    )
  }
}

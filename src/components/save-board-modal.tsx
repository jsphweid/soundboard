import * as React from 'react'
import Modal from 'react-modal'
import { getStores } from '../stores'
import { observer } from 'mobx-react'
import Axios from 'axios'
import { apiBaseUrl } from '../misc/constants'

interface State {
  isLoading: boolean
  error: string | null
  id: string | null
}

@observer
export default class SaveBoardModal extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      isLoading: false,
      error: null,
      id: null
    }
  }

  private handleShare = () => {
    const json = getStores().actionButtons.getSerializedActionButtons()

    this.setState({ isLoading: true })
    Axios.post(apiBaseUrl, json)
      .then(response => this.setState({ id: response.data.id }))
      .catch(error => {
        this.setState({
          error: 'Unfortunately the request to upload your board failed.'
        })
        console.log(error)
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  public render() {
    const { saveBoardModalIsOpen, closeSaveBoardModal } = getStores().saveBoard
    const { isLoading, error, id } = this.state
    const url = id ? `https://bestsoundboard.com/?board=${id}` : null

    return (
      <Modal isOpen={saveBoardModalIsOpen} onRequestClose={closeSaveBoardModal}>
        <div style={{ maxWidth: `600px`, margin: `0 auto`, marginTop: `10%` }}>
          Once you click Share, your settings will be saved and a link will be
          given to you to share with anyone.
          <div>
            <button onClick={this.handleShare}>Share</button>
            <button onClick={closeSaveBoardModal}>Cancel</button>
          </div>
          <div>{isLoading ? 'Loading...' : null}</div>
          {error ? <div>{error}</div> : null}
          {url ? <h5>Share successful!</h5> : null}
          {url ? (
            <div>
              Here is the link: <a href={url}>{url}</a>
            </div>
          ) : null}
        </div>
      </Modal>
    )
  }
}

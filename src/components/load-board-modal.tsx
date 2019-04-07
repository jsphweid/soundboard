import * as React from 'react'
import Modal from 'react-modal'
import { getStores } from '../stores'
import { observer } from 'mobx-react'

interface State {
  idInputText: string
  rawJSONInputText: string
  isLoading: boolean
  isShowingAdvanced: boolean
}

@observer
export default class LoadBoardModal extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      idInputText: '',
      rawJSONInputText: '',
      isLoading: false,
      isShowingAdvanced: false
    }
  }

  private parseJson(maybeJson: string): object | null {
    try {
      // basically prove it's valid json and an array at that...
      const json = JSON.parse(maybeJson)
      return json && Array.isArray(json) ? json : null
    } catch (e) {
      return null
    }
  }

  private handleLoadClick = () => {
    const { closeLoadBoardModal } = getStores().loadBoard
    const { reloadEverythingFromValidJSON } = getStores().actionButtons

    reloadEverythingFromValidJSON(this.state.rawJSONInputText)

    closeLoadBoardModal()
  }

  private renderAdvanced() {
    const { isShowingAdvanced, rawJSONInputText } = this.state

    return (
      <div>
        <button
          style={{
            background: `none !important`,
            color: `#0366d6`,
            fontSize: `12px !important`,
            border: `none`,
            padding: `0 !important`,
            borderBottom: `1px solid #0366d6`,
            cursor: `pointer`
          }}
          onClick={() =>
            this.setState({ isShowingAdvanced: !isShowingAdvanced })
          }
        >
          {isShowingAdvanced ? 'Hide Advanced' : 'Show Advanced'}
        </button>
        {isShowingAdvanced ? (
          <div>
            <textarea
              rows={4}
              cols={50}
              value={rawJSONInputText}
              placeholder="Enter raw valid JSON"
              onChange={(e: any) =>
                this.setState({ rawJSONInputText: e.target.value })
              }
            />
          </div>
        ) : null}
      </div>
    )
  }

  public render() {
    const { idInputText, rawJSONInputText } = this.state
    const { loadBoardModalIsOpen, closeLoadBoardModal } = getStores().loadBoard

    return (
      <Modal isOpen={loadBoardModalIsOpen} onRequestClose={closeLoadBoardModal}>
        <div style={{ maxWidth: `600px`, margin: `0 auto`, marginTop: `10%` }}>
          All boards that have been saved can be easily retrieved by their ID.
          <div>
            <input
              type="text"
              value={idInputText}
              placeholder="Enter ID..."
              onChange={(e: any) =>
                this.setState({ idInputText: e.target.value })
              }
            />
          </div>
          {this.renderAdvanced()}
          <button
            onClick={this.handleLoadClick}
            disabled={!idInputText && !this.parseJson(rawJSONInputText)}
          >
            Load
          </button>
          <button onClick={closeLoadBoardModal}>Cancel</button>
        </div>
      </Modal>
    )
  }
}

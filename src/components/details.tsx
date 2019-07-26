import * as React from 'react'
import { getStores } from '../stores'
const css = require('./details.module.css')
import axios from 'axios'
import { apiBaseUrl } from '../misc/constants'
import Button from '@material-ui/core/Button'

interface State {
  isLoading: boolean
  error: string | null
  id: string | null
}

export default class Details extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      isLoading: false,
      error: null,
      id: null
    }
  }

  private handleShare = () => {
    const json = getStores().buttons.getSerializedButtons()
    getStores().buttons.registerSnapshotTaken()

    this.setState({ isLoading: true })
    axios
      .post(apiBaseUrl, json)
      .then(response => this.setState({ id: response.data.id }))
      .catch(error => {
        this.setState({
          error: 'Unfortunately the request to upload your board failed.'
        })
        console.log(error)
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  private renderResultSection() {
    const { id, error } = this.state
    const url = id ? `https://bestsoundboard.com/?board=${id}` : null

    return (
      <div className={css.results}>
        {error ? <div>{error}</div> : null}
        {url ? <h5>Share successful!</h5> : null}
        {url ? (
          <div>
            Here is the link: <a href={url}>{url}</a>
          </div>
        ) : null}
      </div>
    )
  }

  public render() {
    const { isLoading } = this.state
    const { snapshotRecentlyTaken } = getStores().buttons

    return (
      <div className={css.details}>
        <div>
          <h1 className={css.title}>Best Soundboard</h1>
          <p>
            Best Soundboard is a webapp created by{' '}
            <a href="https://josephweidinger.com">Joseph Weidinger.</a> I made
            this app when I was also co-piloting a comedy podcast. I thought
            it'd be interesting to experiment with a soundboard and after trying
            a few other soundboards out on the web and being dissatisfied, I
            decided to make my own.
          </p>

          <p>
            The novelty of this app is the ability to customize it in an
            intuitive manner and easily share your board with others. To share
            the board, <i>first</i> configure it to your liking and hit the
            "Share" button below.
          </p>

          <Button
            type="button"
            variant="contained"
            disabled={isLoading || snapshotRecentlyTaken}
            onClick={this.handleShare}
          >
            {isLoading ? 'Loading...' : 'Share'}
          </Button>
          {this.renderResultSection()}
        </div>
      </div>
    )
  }
}

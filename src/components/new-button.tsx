import * as React from 'react'
import Button from '@material-ui/core/Button'
const css = require('./new-button.module.css')

interface Props {
  onNewTab: () => void
  onNewAction: () => void
}

const NewButton: React.SFC<Props> = ({ onNewAction, onNewTab }) => {
  return (
    <div className={css.newButton}>
      <div>
        <div>
          <Button type="button" variant="contained" onClick={onNewTab}>
            Tab
          </Button>
        </div>
        <div>
          <Button type="button" variant="contained" onClick={onNewAction}>
            Action
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NewButton

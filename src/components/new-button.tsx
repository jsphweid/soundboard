import * as React from 'react'
import Button from '@material-ui/core/Button'

const NewButton = () => {
  return (
    <div>
      <Button
        type="button"
        variant="contained"
        onClick={() => console.log('tab')}
      >
        Tab
      </Button>
      <Button
        type="button"
        variant="contained"
        onClick={() => console.log('action')}
      >
        Action
      </Button>
    </div>
  )
}

export default NewButton

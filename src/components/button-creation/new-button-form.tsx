import * as React from 'react'
import { getStores } from '../../stores'
import { ButtonType } from '../../buttons/types'
import { TileIdentifier } from '../../stores/button-creator'
import { makeRandomId } from '../../misc/helpers'

import { Form, Field } from 'react-final-form'
import { Paper, Grid, Button, CssBaseline } from '@material-ui/core'
import TextField from './text-field'

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

const validate = ({ title, url, start, end }: any) => {
  const errors: any = {}
  if (!title) {
    errors.title = 'Required'
  }
  if (!url) {
    errors.url = 'Required'
  }
  if (start && end && start > end) {
    errors.start = 'Too High'
  }
  return errors
}

const handleSave = ({ url, title, start, end }: any) => {
  const { tileWithButtonCreator, cancel } = getStores().buttonCreator
  const { addButton } = getStores().actionButtons
  const { tabId, keyboardKey } = tileWithButtonCreator as TileIdentifier
  addButton({
    url,
    start,
    end,
    title,
    type: ButtonType.Action,
    id: makeRandomId(),
    tabId,
    keyboardKey
  })
  cancel()
}

const NewButtonForm: React.SFC = () => (
  <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
    <CssBaseline />
    <Form
      onSubmit={handleSave}
      validate={validate}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit} noValidate={true}>
          <Paper style={{ padding: 16 }}>
            <Grid container={true} alignItems="flex-start" spacing={8}>
              <Grid item={true} xs={12}>
                <Field
                  fullWidth={true}
                  required={true}
                  name="title"
                  component={TextField}
                  type="text"
                  label="Button Title"
                />
              </Grid>
              <Grid item={true} xs={12}>
                <Field
                  fullWidth={true}
                  required={true}
                  name="url"
                  component={TextField}
                  type="text"
                  label="Source URL"
                />
              </Grid>
              <Grid item={true} xs={6}>
                <Field
                  name="start"
                  fullWidth={true}
                  required={false}
                  component={TextField}
                  type="number"
                  label="Start Time"
                />
              </Grid>
              <Grid item={true} xs={6}>
                <Field
                  name="end"
                  fullWidth={true}
                  required={false}
                  component={TextField}
                  type="number"
                  label="End Time"
                />
              </Grid>
              <Grid item={true} style={{ marginTop: 16 }}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={getStores().buttonCreator.cancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item={true} style={{ marginTop: 16 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      )}
    />
  </div>
)

export default NewButtonForm

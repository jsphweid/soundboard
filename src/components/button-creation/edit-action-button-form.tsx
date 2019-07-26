import * as React from 'react'

import { Form, Field } from 'react-final-form'
import { Paper, Grid, Button } from '@material-ui/core'
import TextField from './text-field'
import { EditFormProps } from './edit-form-types'

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

type EditActionButtonFormProps = EditFormProps<{
  title: string
  url: string
  start: number
  end: number
}>

const EditActionButtonForm: React.SFC<EditActionButtonFormProps> = ({
  onSave,
  onCancel,
  initialData: { url, title, start, end }
}: EditActionButtonFormProps) => (
  <div style={{ padding: `8px` }}>
    <Form
      onSubmit={onSave as any}
      validate={validate}
      initialValues={{ url, title, start, end }}
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
                <Button type="button" variant="contained" onClick={onCancel}>
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

export default EditActionButtonForm

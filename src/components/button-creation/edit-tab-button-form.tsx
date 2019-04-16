import * as React from 'react'

import { Form, Field } from 'react-final-form'
import { Paper, Grid, Button } from '@material-ui/core'
import TextField from './text-field'
import { EditFormProps } from './edit-form-types'

const validate = ({ title }: any) => {
  const errors: any = {}
  if (!title) {
    errors.title = 'Required'
  }
  return errors
}

type EditTabButtonFormProps = EditFormProps<{ title: string }>

const EditTabButtonForm: React.SFC<EditTabButtonFormProps> = ({
  onSave,
  onCancel,
  initialData: { title }
}: EditTabButtonFormProps) => (
  <div style={{ padding: `8px` }}>
    <Form
      onSubmit={onSave as any}
      validate={validate}
      initialValues={{ title }}
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

export default EditTabButtonForm

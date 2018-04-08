import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import { FormField } from '../../common/components'
import { validateEmail, validatePassword } from '../../core/helpers'


const FindWorkspaceForm = ({ handleSubmit }) =>
  <form className="register-form" onSubmit={handleSubmit}>
    <Field
      name="email"
      component={FormField}
      type="text"
      label="Email"
    />
    <button type="submit">Send Email</button>
  </form>


const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors
}

const FindWorkspaceReduxForm = reduxForm({
  form: 'find-workspace',
  validate
})(FindWorkspaceForm)

export default FindWorkspaceReduxForm
import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import { FormField } from '../../common/components'
import { validateEmail, validatePassword } from '../../core/helpers'


const AddWorkspaceForm = ({ handleSubmit }) =>
  <form className="register-form" onSubmit={handleSubmit}>
    <Field
      name="name"
      component={FormField}
      type="text"
      label="Name"
    />
    <Field
      name="displayName"
      component={FormField}
      type="text"
      label="Display Name"
    />
    <Field
      name="email"
      component={FormField}
      type="email"
      label="Admin Email"
    />
    <Field
      name="password"
      component={FormField}
      type="password"
      label="Password"
    />
    <Field
      name="confirm"
      component={FormField}
      type="password"
      label="Password Confirm"
    />
    <button type="submit">create</button>
  </form>


const validate = values => {
  const errors = {}

  if (!values.displayName) {
    errors.displayName = 'Required'
  }
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (!validatePassword(values.password)) {
    errors.password = '8 charactors, One uppercase, One lowercase';
  }
  if (values.confirm !== values.password) {
    errors.confirm = 'Password does not match';
  }
  return errors
}

const AddWorkspaceReduxForm = reduxForm({
  form: 'workspace',
  validate
})(AddWorkspaceForm)

export default AddWorkspaceReduxForm
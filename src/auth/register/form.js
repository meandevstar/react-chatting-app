import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { FormField } from '../../common/components';

import { validateEmail, validatePassword } from '../../core/helpers'

const RegisterForm = ({ handleSubmit, registerUser, workspaceId }) => (
  <form className="register-form" onSubmit={handleSubmit}>
    <Field
      name="email"
      component={FormField}
      type="email"
      label="Email"
    />
    <Field
      name="name"
      component={FormField}
      type="text"
      label="Name"
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
      label="Confirm Password"
    />
    <button type="submit">create</button>
    <p className="message">Already registered? <Link to={`/${workspaceId}`}>Sign In</Link></p>
  </form>
)

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required';
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

const RegisterReduxForm = reduxForm({
  form: 'register',
  validate
})(RegisterForm);

export default RegisterReduxForm;
import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { FormField } from '../../common/components';

import { validateEmail, validatePassword } from '../../core/helpers'

const LoginForm = ({ handleSubmit, registerUser, workspaceId }) => (
  <form className="register-form" onSubmit={handleSubmit}>
    <Field
      name="email"
      component={FormField}
      type="email"
      label="Email"
    />
    <Field
      name="password"
      component={FormField}
      type="password"
      label="Password"
    />
    <button type="submit">login</button>
    <p className="message">Not registered? <Link to={`/${workspaceId}/register`}>Create an account</Link></p>
  </form>
)

const validate = values => {
  const errors = {}
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
  return errors
}

const LoginReduxForm = reduxForm({
  form: 'login',
  validate
})(LoginForm);

export default LoginReduxForm;
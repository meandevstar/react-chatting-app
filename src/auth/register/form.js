import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { AuthFormField } from '../../common/components';

import { validateEmail, validatePassword } from '../../core/helpers'

const RegisterForm = ({ handleSubmit }) => (
  <form className="register-form" onSubmit={handleSubmit}>
    <Field
      name="email"
      component={AuthFormField}
      type="email"
      label="Email"
    />
    <Field
      name="name"
      component={AuthFormField}
      type="text"
      label="Name"
    />
    <Field
      name="password"
      component={AuthFormField}
      type="password"
      label="Password"
    />
    <Field
      name="confirm"
      component={AuthFormField}
      type="password"
      label="Confirm Password"
    />
    <button type="submit">create</button>
    <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
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
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { user as UserActions } from '../../core/actions';
import RegisterReduxForm from './form';
import { unauthenticated } from '../../common/components';

const Register = ({ registerUser }) =>
  <div className="login-register-page">
    <div className="form">
      <RegisterReduxForm onSubmit={registerUser} />
    </div>
  </div>

const mapDispatchToProps = dispatch => ({
  registerUser: (data) => {
    dispatch(UserActions.registerUserAttempt({
      email: data.email,
      name: data.name,
      password: data.password
    }));
  }
})

export default compose(
  unauthenticated,
  connect(null, mapDispatchToProps)
)(Register);
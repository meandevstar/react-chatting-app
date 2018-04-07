import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { user as UserActions } from '../../core/actions';
import RegisterReduxForm from './form';
import { unauthenticated } from '../../common/components';


class Register extends React.Component {

  constructor(props) {
    super(props)
  }

  registerUser(data) {
    console.log(data)
    const { registerUser, workspaceId } = this.props

    const userPayload = {
      email: data.email,
      password: data.password,
      name: data.name,
      workspace: workspaceId
    }
    registerUser(userPayload)
  }

  render() {
    const { registerUser, workspaceId } = this.props
    
    return (
      <div className="login-register-page">
        <div className="form">
          <RegisterReduxForm
            workspaceId={workspaceId}
            onSubmit={(data) => this.registerUser(data)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workspaceId: state.chat.activeWorkspaceId
})

const mapDispatchToProps = dispatch => ({
  registerUser: (data) => dispatch(UserActions.registerUserAttempt(data))
})

export default compose(
  unauthenticated,
  connect(mapStateToProps, mapDispatchToProps)
)(Register);
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import LoginReduxForm from './form';
import { user as UserActions, chat as ChatActions } from '../../core/actions';
import { unauthenticated } from '../../common/components';

class LoginPage extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { setWorkspace, match:{ params: { workspaceId } } } = this.props

    setWorkspace(workspaceId)
  }

  render() {
    const { login, workspaceId } = this.props
    return (
      <div className="login-register-page">
        <div className="form">
          <LoginReduxForm
            workspaceId={workspaceId}
            onSubmit={login}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workspaceId: state.chat.activeWorkspaceId
})

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(UserActions.loginUserAttempt(data)),
  setWorkspace: (workspaceId) => dispatch(ChatActions.setWorkspace(workspaceId))
})

export default compose(
  unauthenticated,
  connect(mapStateToProps, mapDispatchToProps)
)(LoginPage);
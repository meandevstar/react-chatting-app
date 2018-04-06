import React from 'react';
import { connect } from 'react-redux';
import { user as UserActions } from '../../core/actions';

const AppHeader = ({ logout }) => (
  <div>
    <button onClick={logout}>Log out</button>
  </div>
)

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserActions.logOut())
})

export default connect(
  null,
  mapDispatchToProps
)(AppHeader);
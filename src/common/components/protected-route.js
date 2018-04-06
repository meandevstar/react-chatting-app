import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, children, token, ...rest }) => {
  if (token) {
    return Component
      ? (
        <Route {...rest} component={Component}/>
      ) : (
        <Route {...rest}>
          {children}
        </Route>
      )
  } else {
    return <Redirect to="/login"/>
  }
};

const mapStateToProps = ({ user: { token } }) => ({
  token
})

export default connect(
  mapStateToProps,
  null
)(ProtectedRoute);
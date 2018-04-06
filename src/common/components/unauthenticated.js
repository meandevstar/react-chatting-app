import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const unauthenticated = (WrappedComponent) => {
  const UnauthenticatedComponent =
    ({ token, ...props }) =>
      !token
        ? <WrappedComponent {...props}/>
        : <Redirect to="/home"/>

  const mapStateToProps = ({ user }) => ({
    token: user.token
  })

  return connect(
    mapStateToProps,
    null
  )(UnauthenticatedComponent);
}

export default unauthenticated;
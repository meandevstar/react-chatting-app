import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const NotFound = ({ token }) => {
  if (token) {
    return <h1>Page not found</h1>
  } else {
    return <Redirect to="/login"/>
  }
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

export default connect(
  mapStateToProps,
  null
)(NotFound);
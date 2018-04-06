import React from 'react';

const AuthFormField = ({
  input,
  label,
  type,
  meta: { touched, error}
}) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched && error &&
       <span className="error">{error}</span>}
  </div>
)

export default AuthFormField;
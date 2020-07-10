import React from 'react';

const onSubmitHandler = e => {
  e.preventDefault();
  console.log('Submitted Form Data:');
}

const Form = () => {
  return (
  <form onSubmit={onSubmitHandler}>
  <h1>Create Your Account</h1>
  <button className="btn" type="submit">Create My Account</button>
  </form>
  );
};

export default Form;
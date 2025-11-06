import React from 'react';
    
const SignIn = () => {
  return (
    <div>
      <h2>Sign In</h2>
        <form className="signin-form" action="/dashboard" method="POST">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Sign In</button>
        </form>
    </div>
  );
};

export default SignIn;

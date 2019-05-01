import React from 'react';

import  { FirebaseContext } from '../Firebase';

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <input id='user-name' />
        <button id='phone-number-submit'>Submit</button>
      </div>
    )
  }
}

export default SignUp;
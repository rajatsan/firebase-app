import React from 'react';
import { withFirebase } from '../Firebase';

const SignOut = ({firebase}) => (
  <div>
    <button onClick={firebase.signOut}>Sign out</button>
  </div>
);

export default withFirebase(SignOut);
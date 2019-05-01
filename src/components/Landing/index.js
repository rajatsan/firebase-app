import React from 'react';
import { withFirebase } from '../Firebase';
import "firebase/firestore";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      number: '',
      code: '',
    }
  }

  addUser = k => {

  }

  render() {
    return (
      <div>
        Landing Page
        <input 
          onChange={e => console.log(e.target.value)}
        />
        <button onClick={() => this.props.firebase.addUser(this.state.user)}>Submit</button>
        <button onClick={() => this.props.firebase.getApprovedUsers()}>Get</button>
        <input onChange={e => this.setState({ number: e.target.value})} />
        <button id='sign-in' onClick={() => this.props.firebase.doCreateUserWithPhoneNumber(this.state.number)}>Sign in</button>
        <div id="code-div" style={{display: 'none'}}>
          <input onChange={(e) => this.setState({code: e.target.value})} placeholder='enter sms code' />
          <button onClick={() => this.props.firebase.enterCode(this.state.number, this.state.code)}>Submit Code</button>
        </div>
        
      </div>
    )
  }
}

export default withFirebase(Landing);
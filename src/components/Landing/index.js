import React from 'react';
import { withFirebase } from '../Firebase';
import "firebase/firestore";
import { withAuthentication } from '../Session';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  invalidatedForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: '60px',
    paddingTop: '20px',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      number: '',
      code: '',
      freshUser: true,
      phoneNumber: '',
      isInvited: false,
    }
  }

  addUser = k => {

  }

  checkValidUser = () => {
    
    this.props.firebase.getInvitedMembers().then(x => {
      this.setState({
        isInvited: x[0].data().access.indexOf('+91' + this.state.phoneNumber) > -1,
        freshUser: false,
      })
    });
  }

  authenticated = () => {
    console.log('auth', this.props.authUser)
    return (
      <div>Bilawas Sangh</div>
    )
  }

  nonAuthenticated = () => {
    const { freshUser } = this.state;
    const { classes } = this.props;
    if (freshUser) {
      return (
        <div className={classes.invalidatedForm}>
          Entry restricted to invited members. Please enter your phone number to check if you have access.
          <TextField
            id="phone-number-invalidated-user"
            label="Phone number"
            className={classes.textField}
            value={this.state.name}
            margin="normal"
            variant="outlined"
            onChange={e => this.setState({phoneNumber: e.target.value})}
          />
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={this.checkValidUser}
          >
            Submit
          </Button>
        </div>
      )
    } else {
      if (this.state.isInvited) {
        return <div>Invited</div>
      } else {
        return <div>Request access from admin.</div>
      }
    }

  }

  render() {
    return (
      <div>
        <h2>Landing Page</h2>
        {
          this.props.authUser
            ? this.authenticated()
            : this.nonAuthenticated()
        }
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

export default withFirebase(withAuthentication(withStyles(styles)(Landing)));
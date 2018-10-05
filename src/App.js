import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import Calendar from './Components/Calendar.js'
import firebase from './firebase'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      login: false
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
	}

  handleLogin(user) {
    this.setState({
      user: user,
      login: true
    })
  }

  handleLogout() {
    this.setState({
      user: {},
      login: false
    })
  }

  render() {
    const user = this.state.user
    return (
      <div>
        <div
          style={{
            width: 80,
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            overflowX: 'hidden',
            backgroundColor: 'white'
          }}
        >
          <div>
						<Button style={{fontWeight: 'bold', fontSize: '1rem', textTransform: 'none'}}>
							Nav 1
						</Button>
						<Button style={{fontWeight: 'bold', fontSize: '1rem', textTransform: 'none'}}>
							Nav 2
						</Button>
						<Button style={{fontWeight: 'bold', fontSize: '1rem', textTransform: 'none'}}>
							Nav 3
						</Button>
					</div>
        </div>
        <div
          style={{
            width: 80,
            height: '100%',
            position: 'fixed',
            top: 0,
						marginLeft: 80,
						padding: 0,
            overflowX: 'hidden',
            backgroundColor: 'lightgray'
          }}
        >
          <ul style={{listStyle: 'none'}}>
            <li>A</li>
            <li>A</li>
            <li>A</li>
          </ul>
        </div>
        <div
          style={{
            marginLeft: 160
          }}
        >
					<Calendar />
        </div>
      </div>
    )
  }
}

export default App

import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  onUserName = event => {
    this.setState({username: event.target.value})
  }

  onUserPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
    const {username, password} = this.state
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  onSubmitFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onUserLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderLoginFrom = () => {
    const {username, password, isError, errorMsg} = this.state
    return (
      <div className="login-form">
        <h1 className="form-heading">Login</h1>
        <form onSubmit={this.onUserLogin} className="form">
          <label className="form-label" htmlFor="username">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="form-input"
            onChange={this.onUserName}
            value={username}
          />
          <label className="form-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            className="form-input"
            id="password"
            type="password"
            placeholder="Password"
            onChange={this.onUserPassword}
            value={password}
          />
          {isError && <p className="form-error">{errorMsg}</p>}
          <button className="form-login-button" type="submit">
            Login
          </button>
          <button className="form-sign-button" type="submit">
            Sign in
          </button>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="movies-login">
        <img
          src="https://res.cloudinary.com/dqhwxowdo/image/upload/v1680010401/MOVIES%20APP%20NETFLIX-AMAZON%20PRIME%20CLONE/Group_7399_dtbqvh.png"
          alt="login website logo"
        />
        <div className="login-form-cont">{this.renderLoginFrom()}</div>
      </div>
    )
  }
}

export default LoginForm

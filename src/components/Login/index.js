import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    console.log(jwtToken)
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showSubmitError: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.onSubmitSuccess(data.jwt_token)
    } else {
      const data = await response.json()
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  getFormEl = () => {
    const {username, password} = this.state

    return (
      <>
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <label htmlFor="name" className="label">
            USERNAME
          </label>
          <input
            type="text"
            id="name"
            value={username}
            className="input"
            placeholder="Username"
            onChange={this.onChangeUserName}
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="input"
            placeholder="Password"
            onChange={this.onChangePassword}
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </>
    )
  }

  render() {
    const {showSubmitError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <div className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          {this.getFormEl()}
          {showSubmitError && <p className="err-msg">*{errMsg}</p>}
        </div>
      </div>
    )
  }
}

export default Login

import {Link, withRouter} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {IoBagCheck} from 'react-icons/io5'
import {FaArrowCircleRight} from 'react-icons/fa'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <div className="header-desktop-bg">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>

        <ul className="header-ul">
          <Link to="/" className="menu-link">
            <li className="header-ul-item">Home</li>
          </Link>
          <Link to="/jobs" className="menu-link">
            <li className="header-ul-item">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="header-mobile-bg">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>

        <div className="menu-icon-container">
          <Link to="/" className="menu-link">
            <IoMdHome className="nav-icon" />
          </Link>
          <Link to="/jobs" className="menu-link">
            <IoBagCheck className="nav-icon" />
          </Link>
          <Link to="/">
            <FaArrowCircleRight className="nav-icon" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default withRouter(Header)

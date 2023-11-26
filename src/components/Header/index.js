import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {IoBagCheck} from 'react-icons/io5'
import {FaArrowCircleRight} from 'react-icons/fa'

import './index.css'

const Header = () => (
  <>
    <div className="header-desktop-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="header-logo"
      />
      <ul className="header-ul">
        <Link to="/" className="menu-link">
          <li className="header-ul-item">Home</li>
        </Link>
        <Link to="/jobs" className="menu-link">
          <li className="header-ul-item">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-btn">
        Logout
      </button>
    </div>

    <div className="header-mobile-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="header-logo"
      />
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

export default Header

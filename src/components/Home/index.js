import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="Home-bg">
    <Header />
    <div className="home-text-bg">
      <div className="home-text">
        <h1 className="home-h1">Find The Job That Fits Your Life</h1>
        <p className="home-p">
          Millions of people are searching for jobs, salary information, company
          revlews. Find the jobs that fits your abilities and potential.
        </p>

        <Link to="/jobs">
          <button type="button" className="find-job-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const responseConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    profileStatus: responseConstants.initial,
    employmentType: [],
    salaryRange: 0,
  }

  componentDidMount() {
    this.getUserProfileData()
  }

  selectSalaryRange = event => {
    this.setState({salaryRange: event.target.value})
  }

  onSelectEmploymentType = event => {
    console.log('select')
    this.setState(prevState => ({
      employmentType: prevState.employmentType.includes(event.target.value)
        ? prevState.employmentType.filter(each => each !== event.target.value)
        : [...prevState.employmentType, event.target.value],
    }))
  }

  retryProfile = () => {
    this.getUserProfileData()
  }

  getSalaryRange = () => (
    <>
      <h1 className="list-hading">Salary Range</h1>
      {salaryRangesList.map(each => (
        <div key={each.salaryRangeId} className="type-container">
          <input
            type="radio"
            value={each.salaryRangeId}
            className="check-box"
            id={each.salaryRangeId}
            name="salary"
            onChange={this.selectSalaryRange}
          />
          <label htmlFor={each.salaryRangeId} className="list-label">
            {each.label}
          </label>
        </div>
      ))}
    </>
  )

  getEmploymentTypeList = () => (
    <>
      <h1 className="list-hading">Type of Employment</h1>
      {employmentTypesList.map(each => (
        <div key={each.employmentTypeId} className="type-container">
          <input
            type="checkbox"
            value={each.employmentTypeId}
            className="check-box"
            id={each.employmentTypeIdl}
            onChange={this.onSelectEmploymentType}
          />
          <label htmlFor={each.employmentTypeIdl} className="list-label">
            {each.label}
          </label>
        </div>
      ))}
    </>
  )

  getUserProfileData = async () => {
    this.setState({profileStatus: responseConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = await data.profile_details
      const profileData = await {
        profileName: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        role: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: profileData,
        profileStatus: responseConstants.success,
      })
    } else {
      this.setState({profileStatus: responseConstants.failure})
    }
  }

  getProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {profileName, profileImageUrl, role} = profileDetails
    return (
      <div className="profile-bg">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-h1">{profileName}</h1>
        <p className="profile-p">{role}</p>
      </div>
    )
  }

  getProfileFailureView = () => (
    <div className="profile-failure-bg">
      <button type="button" className="retry-btn" onClick={this.retryProfile}>
        Retry
      </button>
    </div>
  )

  getProfileLoadingView = () => (
    <div className="loader-container profile-failure-bg" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getProfileView = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case responseConstants.success:
        return this.getProfileSuccessView()
      case responseConstants.failure:
        return this.getProfileFailureView()
      case responseConstants.inProgress:
        return this.getProfileLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg">
          <div className="jobs-left-navbar-bg">
            {this.getProfileView()}
            <hr className="hr-line" />
            {this.getEmploymentTypeList()}
            <hr className="hr-line" />
            {this.getSalaryRange()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

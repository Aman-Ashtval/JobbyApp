import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobItemCard from '../JobItemCard'

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
    jobSearchList: [],
    jobSearchInput: '',
    jobApiStatus: responseConstants.initial,
  }

  componentDidMount() {
    this.getUserProfileData()
    this.getJobsData()
  }

  //   jobs related code start here ------------------------------------------------------------------------>

  getJobsData = async () => {
    this.setState({jobApiStatus: responseConstants.inProgress})
    const {employmentType, salaryRange, jobSearchInput} = this.state
    const jobApi = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${jobSearchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobApi, options)
    console.log(response)
    if (response.ok) {
      const jobData = await response.json()
      const jobSearchList = await jobData.jobs.map(each => ({
        id: each.id,
        title: each.title,
        rating: each.rating,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnm: each.package_per_annum,
      }))
      this.setState({
        jobSearchList,
        jobApiStatus: responseConstants.success,
      })
    } else {
      this.setState({jobApiStatus: responseConstants.failure})
    }
  }

  getEmptyJobListView = () => (
    <div className="empty-list-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-job-h1">No Jobs Found</h1>
      <p className="no-job-p">We could not find any jobs. Try other filters</p>
    </div>
  )

  jobSuccessView = () => {
    const {jobSearchList} = this.state

    if (jobSearchList.length === 0) {
      return this.getEmptyJobListView()
    }
    return (
      <ul className="salary-range-list ">
        {jobSearchList.map(job => (
          <JobItemCard jobDetails={job} key={job.id} />
        ))}
      </ul>
    )
  }

  jobFailureView = () => (
    <div className="empty-list-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-img"
      />
      <h1 className="no-job-h1">Oops! Something Went Wrong</h1>
      <p className="no-job-p">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  getJobsView = () => {
    const {jobApiStatus} = this.state
    switch (jobApiStatus) {
      case responseConstants.success:
        return this.jobSuccessView()
      case responseConstants.failure:
        return this.jobFailureView()
      case responseConstants.inProgress:
        return this.getLoadingView()

      default:
        return null
    }
  }

  //   profile and employmentType code start here --------------------------------------------------------->

  onSearchJob = () => {
    this.getJobsData()
  }

  onChangeJobInput = event => {
    this.setState({jobSearchInput: event.target.value})
  }

  selectSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getJobsData)
  }

  onSelectEmploymentType = event => {
    console.log('select')
    this.setState(
      prevState => ({
        employmentType: prevState.employmentType.includes(event.target.value)
          ? prevState.employmentType.filter(each => each !== event.target.value)
          : [...prevState.employmentType, event.target.value],
      }),
      this.getJobsData,
    )
  }

  retryProfile = () => {
    this.getUserProfileData()
  }

  getSalaryRange = () => (
    <>
      <h1 className="list-hading">Salary Range</h1>
      <ul className="salary-range-list">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="type-container">
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
          </li>
        ))}
      </ul>
    </>
  )

  getEmploymentTypeList = () => (
    <>
      <h1 className="list-hading">Type of Employment</h1>
      <ul className="salary-range-list">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="type-container">
            <input
              type="checkbox"
              value={each.employmentTypeId}
              className="check-box"
              id={each.employmentTypeId}
              onChange={this.onSelectEmploymentType}
            />
            <label htmlFor={each.employmentTypeId} className="list-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
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

  getLoadingView = () => (
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
        return this.getLoadingView()

      default:
        return null
    }
  }

  render() {
    const {jobSearchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg">
          <div className="jobs-left-navbar-bg">
            <div className="profile-input">
              <input
                type="search"
                value={jobSearchInput}
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeJobInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onSearchJob}
              >
                <BsSearch className="search-icon" alt="searchIcon" />
              </button>
            </div>
            {this.getProfileView()}
            <hr className="hr-line" />
            {this.getEmploymentTypeList()}
            <hr className="hr-line" />
            {this.getSalaryRange()}
          </div>
          <div className="content-bg">
            <div className="jobs-input-container">
              <input
                type="search"
                value={jobSearchInput}
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeJobInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onSearchJob}
              >
                <BsSearch className="search-icon" alt="searchIcon" />
              </button>
            </div>

            {this.getJobsView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

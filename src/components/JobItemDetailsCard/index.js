import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp, IoBagCheck} from 'react-icons/io5'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const jobDetailsResponseConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class JobItemDetailsCard extends Component {
  state = {
    jobDetails: {},
    lifeAtCompany: {},
    skills: [],
    similarJobsList: [],
    jobDetailsApiStatus: jobDetailsResponseConstants.initial,
  }

  componentDidMount() {
    this.getJobDetailsData()
  }

  getJobDetailsData = async () => {
    this.setState({jobDetailsApiStatus: jobDetailsResponseConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApi = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobDetailsApi, options)
    if (response.ok) {
      const jobData = await response.json()
      const fetchedData = await jobData.job_details
      const jobDetails = await {
        id: fetchedData.id,
        companyLogoUrl: fetchedData.company_logo_url,
        companyWebsiteUrl: fetchedData.company_website_url,
        employmentType: fetchedData.employment_type,
        jobDescription: fetchedData.job_description,
        location: fetchedData.location,
        packagePerAnm: fetchedData.package_per_annum,
        rating: fetchedData.rating,
        title: fetchedData.title,
      }

      const lifeInCompany = await jobData.job_details.life_at_company
      const lifeAtCompany = {
        description: lifeInCompany.description,
        imageUrl: lifeInCompany.image_url,
      }

      const skills = await jobData.job_details.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))

      const similarArr = await jobData.similar_jobs
      const similarJobsList = await similarArr.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        title: each.title,
        rating: each.rating,
      }))

      this.setState({
        jobDetails,
        lifeAtCompany,
        skills,
        similarJobsList,
        jobDetailsApiStatus: jobDetailsResponseConstants.success,
      })
    } else {
      this.setState({jobDetailsApiStatus: jobDetailsResponseConstants.failure})
    }
  }

  getSkillView = () => {
    const {skills} = this.state

    return (
      <ul className="skills-bg">
        {skills.map(each => (
          <li key={each.name} className="skill-img-div">
            <img src={each.imageUrl} alt={each.name} className="skill-img" />
            <h1 className="skill-name">{each.name}</h1>
          </li>
        ))}
      </ul>
    )
  }

  getCompanyLifeView = () => {
    const {lifeAtCompany} = this.state
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="company-life-bg">
        <p className="company-life-p">{description}</p>
        <img
          src={imageUrl}
          alt="life at company"
          className="company-life-img"
        />
      </div>
    )
  }

  getSimilarJobsView = () => {
    const {similarJobsList} = this.state

    return (
      <ul className="similar-job-container">
        {similarJobsList.map(each => (
          <SimilarJobItem jobDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  getJobDetailsSuccessView = () => {
    const {jobDetails} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      packagePerAnm,
      location,
      rating,
    } = jobDetails
    console.log(jobDetails)
    return (
      <>
        <div className="job-card-bg">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-card-logo"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <FaStar className="star-icon" />
                <p className="rating-p">{rating}</p>
              </div>

              {/* <button type="button" className="str-btn">
                <FaStar className="star-icon" />
                {rating}
              </button> */}
            </div>
          </div>

          <div className="job-location-container">
            <div className="job-location-bg">
              <div className="job-location-bg">
                <IoLocationSharp className="location-icon" />
                <p className="job-location-p">{location}</p>
              </div>
              <div className="job-location-bg">
                <IoBagCheck className="location-icon" />
                <p className="job-location-p">{employmentType}</p>
              </div>
            </div>
            <p className="package-p">{packagePerAnm}</p>
          </div>
          <hr className="job-card-hr-line" />
          <div className="company-url-container">
            <h1 className="job-description-h1">Description</h1>
            <a
              href={companyWebsiteUrl}
              rel="noopener noreferrer"
              target="_blank"
              className="visit-link"
            >
              <button type="button" className="visit-btn">
                Visit
                <BsBoxArrowUpRight className="visit-icon" />
              </button>
            </a>
          </div>
          <p className="job-description-p">{jobDescription}</p>
          {/* Skills are included here -----------------------------------------------------------------------------------*/}
          <h1 className="job-description-h1 skill-h1">Skills</h1>
          {this.getSkillView()}
          <h1 className="job-description-h1 skill-h1">Life at Company</h1>
          {this.getCompanyLifeView()}
        </div>

        <h1 className="similar-h1">Similar Jobs</h1>
        {this.getSimilarJobsView()}
      </>
    )
  }

  getJobDetailsFailureView = () => (
    <div className="empty-list-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-img"
      />
      <h1 className="no-job-h1">Oops! Something Went Wrong</h1>
      <p className="no-job-p">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.getJobDetailsData}
      >
        Retry
      </button>
    </div>
  )

  getJobDetailsLoadingView = () => (
    <div className="loader-container profile-failure-bg" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJobDetailsView = () => {
    const {jobDetailsApiStatus} = this.state

    switch (jobDetailsApiStatus) {
      case jobDetailsResponseConstants.success:
        return this.getJobDetailsSuccessView()
      case jobDetailsResponseConstants.failure:
        return this.getJobDetailsFailureView()
      case jobDetailsResponseConstants.inProgress:
        return this.getJobDetailsLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-detail-card-bg">{this.getJobDetailsView()}</div>
      </>
    )
  }
}

export default JobItemDetailsCard

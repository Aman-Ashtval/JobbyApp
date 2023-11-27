import {FaStar} from 'react-icons/fa'
import {IoLocationSharp, IoBagCheck} from 'react-icons/io5'

import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = jobDetails

  return (
    <div className="job-details-card">
      <div className="company-logo-container">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="job-card-logo"
        />
        <div>
          <h1 className="job-title similar-job-title">{title}</h1>
          <button type="button" className="str-btn">
            <FaStar className="star-icon" />
            {rating}
          </button>
        </div>
      </div>
      <h1 className="similar-job-description">Description</h1>
      <p className="job-description-p">{jobDescription}</p>

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
      </div>
    </div>
  )
}

export default SimilarJobItem

import {FaStar} from 'react-icons/fa'
import {IoLocationSharp, IoBagCheck} from 'react-icons/io5'
import {Link} from 'react-router-dom'

import './index.css'

const JobItemCard = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    rating,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnm,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-card-bg">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="job-description-h1">Description</h1>
        <p className="job-description-p">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItemCard

import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({edu:{school,degree,fieldofstudy,to,from,description,current}}) => {
    return (
        <Fragment>
        <div>
          <h3 class="text-dark">{school}</h3>
                <p> <Moment format="DD/MM/YYYY">{from}</Moment> - {' '}
                {!to ? 'Now':<Moment format="DD/MM/YYYY">{to}</Moment>}
                </p>
                <p><strong>Degree: </strong>{degree}</p>
                <p><strong>Field of study: </strong>{fieldofstudy}</p>
          <p>
         
          <strong>Description: </strong>{description}
          </p>
        </div>
            
        </Fragment>
    )
}

ProfileEducation.propTypes = {
    edu:PropTypes.array.isRequired
}

export default ProfileEducation

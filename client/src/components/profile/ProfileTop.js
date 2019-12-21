import React,{Fragment} from 'react'
import PropTypes from 'prop-types'



const ProfileTop = ({ profile: { status, company, location, social: { facebook,instagram,youtube,twitter,linkedin}, user: { name, avatar,website } }}) => {
    return (
        <Fragment>
        <div className="profile-top bg-primary p-2">
        <img
          className="round-img my-1"
          src={avatar}
          alt=""
        />
                <h1 className="large">{name}</h1>
                <p className="lead">{status}</p>
                <p>{location}</p>
        <div className="icons my-1">
        { website ?  <a href="#" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-globe fa-2x"></i> 
          </a>: null } 
          <a href="#" target="_blank" rel="noopener noreferrer">
         { twitter!=='' ? <i className="fab fa-twitter fa-2x"></i>:null}
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            { facebook!=='' ? <i className="fab fa-facebook fa-2x"></i> : null}
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
         { linkedin!=='' ? <i className="fab fa-linkedin fa-2x"></i> : null}
          </a>
           <a href="#" target="_blank" rel="noopener noreferrer">
         { youtube!=='' ? <i className="fab fa-youtube fa-2x"></i> : null}
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            {instagram!=='' ? <i className="fab fa-instagram fa-2x"></i> : null}
          </a>
        </div>
      </div> 
        </Fragment>
    )
}

ProfileTop.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileTop

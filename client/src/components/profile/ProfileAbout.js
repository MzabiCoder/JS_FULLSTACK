import React,{Fragment} from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile:{bio,skills,user:{name}}}) => {
    return (
        <Fragment>
        <div className="profile-about bg-light p-2">
                <h2 className="text-primary">{name.split(' ')[0]}'s Bio</h2>
    
             {bio && <p>{bio}</p>}
        
        <div className="line"></div>
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
             {skills.length > 0 && skills.map((skill,i) => (
                 <div className="p-1" key={i}><i className="fas fa-check"></i>{skill}</div>

         ))}
                       
        </div>
      </div>
            
        </Fragment>
    )
}

ProfileAbout.propTypes = {

}

export default ProfileAbout

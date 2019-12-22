import React,{useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import  Spinner  from '../layouts/Spinner'
import { GetProfileByID } from '../../action/profile'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'


const Profile = ({ GetProfileByID, profile: { profile, loading,githubusername}, auth,match }) => {
    useEffect(() => {
        GetProfileByID(match.params.id)
    },[GetProfileByID,match.params.id])
    return (
        <Fragment>
            {profile === null || loading === true ? <Spinner /> :
                <Fragment>
                    <Link className="btn btn-light my-1" to="/profiles">Go Back</Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link className="btn btn-dark" to="//edit-profile">Edit Profile</Link>)}
                    
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className="profile-exp bg-white p-2">
                            {profile.experience.length > 0 ? (<Fragment>
                                {profile.experience.map(exp => (
                                    <ProfileExperience exp={exp} />            
                            ))}
                            </Fragment>) : (<h4>No Experience listed...</h4>)}
                        </div>

                        <div className="profile-edu bg-white p-2">
                            {profile.education.length > 0 ? (<Fragment>
                                {profile.education.map(edu => (
                                    <ProfileEducation edu={edu} />            
                            ))}
                            </Fragment>) : (<h4>No Education listed...</h4>)}
                        </div>

                        {githubusername && (
                        
                            <ProfileGithub profile={profile}  />
                            
                    )}

                    </div>
                </Fragment>
            } 
        </Fragment>
    )
}

Profile.propTypes = {
    GetProfileByID:PropTypes.func.isRequired
}

const map = state => ({
    profile: state.profile,
    auth: state.auth,
    GetProfileByI:PropTypes.func.isRequired
})

export default connect(map,{ GetProfileByID})(Profile)

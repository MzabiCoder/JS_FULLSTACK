import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { GetProfiles } from '../../action/profile'
import Spinner from '../../components/layouts/Spinner'
import ProfileItem from './ProfileItem'

const Profiles = ({ GetProfiles, profile:{profiles,loading} }) => {
    useEffect(() => {
        GetProfiles()
    },[GetProfiles])
    return (
        <Fragment>
            {
            loading ? <Spinner /> :
            <Fragment>
            <h1 className="large text-primary ">Profiles</h1>
                        <p className="lead">
                            <i className="fab fa-connectdevelop my-1"></i>Browse and connect with all developers
              <div className="profiles">
                                {profiles.length > 0 ? profiles.map(profile => <ProfileItem profile={profile} key={profile._id}/>):<h1>No Profiles founded !!</h1>}                
            </div>              
            </p>
            </Fragment>
        }
        </Fragment>
    )
}

Profiles.propTypes = {
    GetProfiles: PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const map = state => ({
    profile: state.profile,
    
})

export default connect(map,{GetProfiles})(Profiles)

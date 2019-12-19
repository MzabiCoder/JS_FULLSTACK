import React,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { GetProfile } from '../../action/profile'
import Spinner from '../layouts/Spinner'
import { Link } from 'react-router-dom'
import DashboardAction from './DashboardAction'
import Experience from './Experience'
import Education from './Education'
import {deleteAccount} from '../../action/profile'

const Dashboard = ({ auth:{user}, profile:{loading,profile,id}, GetProfile ,deleteAccount}) => {
    
    useEffect(() => {
        GetProfile()
    },[GetProfile])
    return (
        <Fragment>
        
        {loading ? (
             <Spinner/>
            ) : <Fragment>
                
                    <h1 className="large text-primary">Dashboard</h1>
                    <p className="lead">
                        <i className="fas fa-user"></i>{' '}Welcom {user && user.name}
                    </p>
                    {profile !== null ? <Fragment> <DashboardAction /> <Experience experience={profile.experience} /><Education education={profile.education} />
                        <div className="my-2">
                            <button className="btn btn-danger" onClick={()=>deleteAccount(id)}>
                                <i className="fas fa-user-minus"></i>{' '}Delete My Account
                            </button>
                        </div>
                    </Fragment> :
                    <Fragment>
                            <p>You have not set up a profile, please add some info</p>
                            <Link to="/create-profile" className="btn btn-primary my-1">
                            Create Profile
                            </Link>
                    
                    </Fragment>}
                
                </Fragment>}
        </Fragment>
    )
}

Dashboard.propTypes = {
    GetProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
}

const map = state => ({
    auth: state.auth,
    profile:state.profile
})

export default connect(map,{GetProfile,deleteAccount})(Dashboard)

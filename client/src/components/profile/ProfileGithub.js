import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { GetGithubuser } from '../../action/profile'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'

const ProfileGithub = ({ username,GetGithubuser,repos }) => {
    useEffect(() => {
        GetGithubuser(username)
    },[GetGithubuser])
    return (
        <div className="profile-github">
         <h2 className="text-primary my-1">Github Repos</h2>
            {repos === null ? <Spinner /> : (
                repos.map(repo => (
                    <div key={repo.id} className="repo bg-white p-1 my-1">
                        <div>
                            <h4>
                                <a href={repo.html_url} target='_blank' rel='nooener noreferrer'>
                                    {repo.name}
                                </a>
                            </h4>
                        </div>
                    </div>
            ))                
            )}
        </div>
    )
}

ProfileGithub.propTypes = {
    github: PropTypes.array.isRequired,
    GetGithubuser:PropTypes.func.isRequired
}

const map = state => ({
    repos:state.profile.repos
})

export default connect(map,{GetGithubuser})(ProfileGithub)

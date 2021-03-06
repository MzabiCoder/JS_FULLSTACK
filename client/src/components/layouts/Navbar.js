import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../action/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';



const  Navbar=({logout,auth:{isAuthenticated,loading}})=> {

  const authLinks = (
    <ul>
      
    <li>
    <Link to="/profiles">Profiles
    </Link>
      </li>
      <li>
    <Link to="/posts">Posts
    </Link>
  </li>
      
    <li>
    <Link to="/dashboard">
      <i className="fas fa-user"></i>{' '}
      <span className="hide-sm">Dashboard</span> 
    </Link>
  </li>
    <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span> 
        </a>
      </li>
      
    
   </ul>
  )
  const guessLinks=( <ul>
    <li>
     <Link to="/">Developers</Link>
    </li>
    <li>
    <Link to="/profiles">Profiles</Link>
      </li>
    <li>
    <Link to="/register">Register</Link>
    </li>
    <li>
      <Link to="/login">Login</Link>
    </li>
   </ul>)
    return (
       
        <nav className="navbar bg-dark">
        <h1>
        <Link to="/">
            <i className="fas fa-code"></i> DevConnector
         </Link>
        </h1>
        {!loading && (
          <Fragment>
          {isAuthenticated ? authLinks:guessLinks}
          </Fragment>
       )}
      </nav>
      
    )
}

const map = state => ({
  auth:state.auth
})

Navbar.propTypes = {
  auth:PropTypes.object.isRequired
}
export default connect(map,{logout})(Navbar)

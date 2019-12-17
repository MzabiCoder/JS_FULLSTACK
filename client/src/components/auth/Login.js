import React, { Fragment, useState } from 'react'
import { Link,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {login} from '../../action/auth'


const Login = ({login,auth:{isAuthenticated}}) => {

    const [formData, SetData] = useState({
        email: '',
        password: '',
      
    })
    const { email, password} = formData
    
    const change = e => {
        SetData({ ...formData, [e.target.name]: e.target.value })
    }
    const submit = async e => {
        e.preventDefault()
 
        login({email,password})
  }
  // Redurect id logged in 
  if (isAuthenticated) {
    return <Redirect to="/dashboard"/>
  }
    return (
        <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Login into your Account</p>
        <form className="form" onSubmit={e=>submit(e)}>
         
          <div className="form-group">
            <input type="email" placeholder="Email Address" value={email} onChange={e=>change(e)} name="email" />
            <small className="form-text"
              >This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
                        name="password"
                        value={password}
                        onChange={change}/>
          </div>
         
          <input type="submit" className="btn btn-primary" value="Login"/>
        </form>
        <p className="my-1">
          Dont you have an account? <Link to="/register">Sign Up</Link>
        </p>
        </Fragment>
    )
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool.isRequired
}

const map = state => ({
  auth:state.auth
})

export default connect(map,{login})(Login)

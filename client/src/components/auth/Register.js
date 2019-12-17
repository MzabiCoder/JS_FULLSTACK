import React, { Fragment, useState } from 'react'
import { Link,Redirect } from 'react-router-dom'
import { setAlert } from '../../action/alert'
import {register} from '../../action/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
const Register = ({setAlert,register,auth:{isAuthenticated}}) => {

    const [formData, SetData] = useState({
        name: '',
        email: '',
        password: '',
        password2:''
    })
    const { name, email, password, password2 } = formData
    
    const change = e => {
        SetData({ ...formData, [e.target.name]: e.target.value })
    }
    const submit = async e => {
        e.preventDefault()

        if (password !== password2) {
            return setAlert('password dont not match !!','danger')
        }
       register({name,email,password})
  }
   // Redurect id logged in 
   if (isAuthenticated) {
    return <Redirect to="/dashboard"/>
  }
    return (
        <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e=>submit(e)}>
          <div className="form-group">
                    <input type="text" placeholder="Name" onChange={e=>change(e)} name="name" value={name}   />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
                        value={password2}
                        onChange={change}/>
          </div>
          <input type="submit" className="btn btn-primary" value="Register"/>
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
        </Fragment>
    )
}

Register.propTypes = {
setAlert:PropTypes.func.isRequired
}
const map = state => ({
  auth:state.auth
})

export default connect(map,{setAlert,register})(Register)

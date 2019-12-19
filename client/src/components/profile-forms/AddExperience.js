import React,{Fragment,useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { add_experience } from '../../action/profile'
import { Link, withRouter } from 'react-router-dom'


const AddExperience = ({ add_experience,history }) => {
    
    const [formData, SetFormData] = useState({
        company:'',
        title:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    })
    const [toDate, toggleDIsabled] = useState(false)
    const {company,title,location,from,to,current,description
    } = formData
    
    const change = e => {
        SetFormData({...formData,[e.target.name]:e.target.value})
    }
    const submit = e => {
        e.preventDefault()
        add_experience(formData,history)
    }
    return (
        <Fragment className="container">
        <h1 className="large text-primary">
            Add An Experience
    </h1>
        <p className="lead">
            <i className="fas fa-code-branch"></i> Add any developer/programming
            positions that you have had in the past
    </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e=>submit(e)}>
            <div className="form-group">
                <input type="text" placeholder="* Job Title" name="title"   value={title} onChange={e=>change(e)} />
            </div>
            <div className="form-group">
                <input type="text" placeholder="* Company" name="company"   value={company} onChange={e=>change(e)}/>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={location} onChange={e=>change(e)} />
            </div>
            <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={e=>change(e)} />
            </div>
            <div className="form-group">
                    <p><input type="checkbox" name="current" value="" checked={current} value={current} onChange={() => {
                        SetFormData({ ...formData, current: !current })
                        toggleDIsabled(!toDate)
                    } }
                    /> Current Job</p>
            </div>
            <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" disabled={toDate ? 'disabled':''} value={to} onChange={e=>change(e)} />
            </div>
            <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    value={description} onChange={e=>change(e)}
                ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
    </Fragment>
    )
   
  
}
   
    


AddExperience.propTypes = {
    add_experience:PropTypes.object.isRequired
}



export default connect(null,{add_experience})(withRouter(AddExperience))

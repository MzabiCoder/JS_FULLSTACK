import React,{Fragment,useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { add_education } from '../../action/profile'
import { Link, withRouter } from 'react-router-dom'


const AddEducation = ({ add_education,history }) => {
    
    const [formData, SetFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''
    })
    const [toDate, toggleDIsabled] = useState(false)
    const {school,degree,fieldofstudy,from,to,current,description
    } = formData
    
    const change = e => {
        SetFormData({...formData,[e.target.name]:e.target.value})
    }
    const submit = e => {
        e.preventDefault()
        add_education(formData,history)
    }
    return (
        <Fragment className="container">
        <h1 className="large text-primary">
            Add your Education
    </h1>
        <p className="lead">
            <i className="fas fa-code-branch"></i> Add any School or bootcamp you have you attended
    </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e=>submit(e)}>
            <div className="form-group">
                <input type="text" placeholder="* School" name="school"  value={school} onChange={e=>change(e)} />
            </div>
            <div className="form-group">
                <input type="text" placeholder="*degree" value={degree} name="degree" value={degree} onChange={e=>change(e)}/>
            </div>
            <div className="form-group">
            <input type="text" placeholder="* Field of study" name="fieldofstudy" value={fieldofstudy} onChange={e=>change(e)} />
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
                    placeholder="Program Description"
                    value={description} onChange={e=>change(e)}
                ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
    </Fragment>
    )
   
  
}
   
    


AddEducation.propTypes = {
    add_education:PropTypes.object.isRequired
}



export default connect(null,{add_education})(withRouter(AddEducation))

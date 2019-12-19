import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { remove_experience } from '../../action/profile'

const Experience = ({experience,remove_experience}) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{experience.company}</td>
            <td className="hise-sm">{exp.title}</td>
            <td>
                <Moment format="DD/MM/YYYY">{exp.from}</Moment> - {
            exp.to === null ? <Moment format="DD/MM/YYYY">{exp.to}</Moment> : ('Now')}
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => {
                    remove_experience(exp._id)
            }}>Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>  
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    remove_experience:PropTypes.func.isRequired
}

export default connect(null,{remove_experience})(Experience)

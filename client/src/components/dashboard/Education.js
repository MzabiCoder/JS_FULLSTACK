import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import{del_education} from '../../action/profile'

const Education = ({education,del_education}) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hise-sm">{edu.degree}</td>
            <td className="hise-sm">{edu.fieldofstudy}</td>

            <td>
                <Moment format="DD/MM/YYYY">{edu.from}</Moment> - {
            edu.to === null ? <Moment format="DD/MM/YYYY">{edu.to}</Moment> : ('Now')}
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => {
                    del_education(edu._id)
            }}>Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Field Of Study</th>
                        <th className="hide-sm">years</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>  
        </Fragment>
    )
}

Education.propTypes = {
    education:PropTypes.array.isRequired
}

export default connect(null,{del_education})(Education)

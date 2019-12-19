import React,{Fragment,useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CreateProfile,GetProfile } from '../../action/profile'
import { Link, withRouter } from 'react-router-dom'

const EditProfile = ({CreateProfile,history,GetProfile,profile:{profile,loading}}) => {

    useEffect(() => {
      GetProfile()
      setFormdata({
        company:loading || !profile.company ? '':profile.company,
        website:loading || !profile.website ? '':profile.website,
        status: loading || !profile.status ? '' : profile.status,
        location:loading || !profile.location ? '': profile.location,
        skills:loading || !profile.skills ? ' ':profile.skills.join(','),
        githubusername:loading || !profile.githubusername ? '':profile.githubusername,
        bio:loading || !profile.bio ? '':profile.bio,
        twitter:loading || !profile.social ? '': profile.social.twitter,
        facebook:loading || !profile.social ? '': profile.social.facebook, 
        instagram:loading || !profile.social ? '': profile.social.instagram,
        linkedin:loading || !profile.social ? '': profile.social.linkedin,
        youtube:loading || !profile.social ? '': profile.social.youtube,
        
      })
    },[loading])
    const [formData, setFormdata] = useState({
        status:'',
        skills:'',
        company:'',
        location:'',
        bio:'',
        githubusername:'',
        youtube:'',
        facebook:'',
        twitter:'',
        instagram:'',
        linkedin:'',
        website:''
    })
    const{status,
        skills,
        company,
        location,
        bio,
        githubusername,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
        website}=formData

  const [Socials, SetSocial] = useState(false)
  
  const change = e => {
    setFormdata({...formData,[e.target.name]:e.target.value})
  }
  const submit = e => {
    console.log(formData)
    e.preventDefault()
    CreateProfile(formData,history,true)
  }
    return (
        <Fragment>
        <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>submit(e)} >
        <div className="form-group">
          <select name="status"  onChange={change} value={status} >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={e=>change(e)} />
          <small className="form-text"
            >Could be your own company or one you work for</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={e=>change(e)}   />
          <small className="form-text"
            >Could be your own or a company website</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e=>change(e)}  />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e=>change(e)}  />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
              name="githubusername"
              value={githubusername}onChange={e=>change(e)} 
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small>
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio"  value={bio} onChange={e=>change(e)}  ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" onClick={()=>SetSocial(!Socials)} className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>


          {Socials ? <Fragment>
            <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input type="text" placeholder="Twitter URL" name="twitter"  value={twitter} onChange={e=>change(e)}  />
          </div>
  
          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input type="text" placeholder="Facebook URL" name="facebook"  value={facebook} onChange={e=>change(e)}  />
          </div>
  
          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input type="text" placeholder="YouTube URL" name="youtube"  value={youtube} onChange={e=>change(e)}  />
          </div>
  
          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <input type="text" placeholder="Linkedin URL" name="linkedin"  value={linkedin} onChange={e=>change(e)}  />
          </div>
  
          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input type="text" placeholder="Instagram URL" name="instagram"  value={instagram} onChange={e=>change(e)}  />
          </div>
          </Fragment> : null}
       
        <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
          

      </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
  CreateProfile:PropTypes.func.isRequired,
  GetProfile: PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired
  
}

const map = state => ({
    profile:state.profile
})

export default connect(map,{CreateProfile,GetProfile})(withRouter(EditProfile))

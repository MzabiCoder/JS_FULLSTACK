import axios from 'axios'
import { setAlert } from './alert'

import { GET_PROFILE, GET_PROFILES,PROFILE_ERROR,UPDATE_PROFILE,CLEAR_PROFILE,ACCOUNT_DELETED,GET_GITHUB } from './types'

export const GetProfile = () => async dispatch => { 
 
    try {
        const res = await axios.get('/api/profile/me')
    dispatch({
        type: GET_PROFILE,
        payload:res.data
    })
        //console.log(res.data)
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
    

}

export const GetProfiles = () => async dispatch => { 
    dispatch({
     type:CLEAR_PROFILE
 })
    try {
        const res = await axios.get('/api/profile')
    dispatch({
        type: GET_PROFILES,
        payload:res.data
    })
        //console.log(res.data)
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
    

}

export const GetProfileByID = (userID) => async dispatch => { 
 
    try {
        const res = await axios.get(`/api/profile/${userID}`)
    dispatch({
        type: GET_PROFILE,
        payload:res.data
    })
        //console.log(res.data)
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
    

}

export const GetGithubuser = (githun_user) => async dispatch => { 
 
    try {
        const res = await axios.get(`/api/profile/github/${githun_user}`)
    dispatch({
        type: GET_GITHUB,
        payload:res.data
    })
        //console.log(res.data)
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
    

}

export const CreateProfile = (formData, history,edit=false) => async dispatch=>{
    
    try {
        const config = {
            headers: {
                  'Content-Type':'application/json'
              }
        }
        const res=await axios.post('/api/profile',formData,config)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','success'))
        if (!edit) {
            history.push('/dashboard')
        }
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}


export const add_experience = (formData,history) => async dispatch=> {
    try {
        const config = {
            headers: {
                  'Content-Type':'application/json'
              }
        }
        const res=await axios.put('/api/profile/experience',formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert( 'Experience Added','success'))
        history.push('/dashboard')
    
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

export const remove_experience = (id) =>async dispatch=> {
    
    try {
       const res= await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert( 'Experience removed','danger'))

         
     } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
     }
}



export const add_education = (formData,history) => async dispatch=> {
    try {
        const config = {
            headers: {
                  'Content-Type':'application/json'
              }
        }
        const res=await axios.put('/api/profile/education',formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert( 'Education Added','success'))
        history.push('/dashboard')
    
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

export const del_education = id => async dispatch => {
    
   try {
       const res = await axios.delete(`/api/profile/education/${id}`)
       dispatch({
           type: UPDATE_PROFILE,
           payload:res.data
       })
       dispatch(setAlert( 'Education removed','success'))

   } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
        errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
    }
    dispatch({
        type: PROFILE_ERROR,
        payload:{msg:err.response.statusText,status:err.response.status}
    })
   } 
}

export const deleteAccount = () =>async dispatch => {
    if (window.confirm('Are you sure!!')) {
        try {
            await axios.delete('/api/profile')
            dispatch({
                type: CLEAR_PROFILE,
            })
            dispatch({
                type:ACCOUNT_DELETED
            })
            dispatch(setAlert( 'Account removed','danger'))

        } catch (err) {
            const errors = err.response.data.errors
            if (errors) {
                errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
            }
            dispatch({
                type: PROFILE_ERROR,
                payload:{msg:err.response.statusText,status:err.response.status}
            })
        } 
    }
    
}


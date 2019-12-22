import { GET_POSTS, POST_ERROR,UPDATE_LIKES } from './types'
import axios from 'axios'
import {setAlert} from './alert'

export const get_posts = ()=>async dispatch => {
   
    try {
        const res = await axios.get('/api/post')
        dispatch({
            type: GET_POSTS,
            payload:res.data
        }) 
       // dispatch(setAlert('Posts fetched','success'))
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        dispatch(setAlert(err.response.statusText,'danger'))
    }
}

export const addlike = (post_id)=>async dispatch => {
   
    try {
        const res = await axios.put(`/api/post/likes/${post_id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload:{post_id,likes:res.data}
        }) 
       // dispatch(setAlert('Posts fetched','success'))
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        dispatch(setAlert(err.response.statusText,'danger'))
    }
}

export const removelike = (post_id)=>async dispatch => {
   
    try {
        const res = await axios.put(`/api/post/unlikes/${post_id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload:{post_id,likes:res.data}
        }) 
       // dispatch(setAlert('Posts fetched','success'))
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        dispatch(setAlert(err.response.statusText,'danger'))
    }
}
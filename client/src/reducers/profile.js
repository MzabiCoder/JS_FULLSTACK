import {GET_PROFILE,PROFILE_ERROR,CLEAR_PROFILE,UPDATE_PROFILE,DELETE_EXPERIENCE} from '../action/types'
const Istate = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error:{}
}

export default function (state=Istate,action) {
    const { type, payload } = action
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,       
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            }
       
        
        case CLEAR_PROFILE: {
            return {
                ...state,
                profile: null,
                repos: null,
                loading:false
            }
           
        }
        
        default:
            return state
    }
    
    
}
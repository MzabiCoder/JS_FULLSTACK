import { REGISTER_SUCCESS, REGISTER_FAIL,AUTH_ERROR,USER_LOADED,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,ACCOUNT_DELETED } from '../action/types'
const Istate = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user:null
}
    
export default function (state = Istate, action) {
    const { payload, type }=action
    switch (type) {
        case REGISTER_SUCCESS:
         case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token)
            return {
                ...state,
                isAuthenticated: true,
                ...payload,
                loading:false
            }  
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token:null
            }
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false
            }
      
        default: 
       return state     
    }
}
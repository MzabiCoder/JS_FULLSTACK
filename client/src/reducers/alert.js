import {SET_ALERT,REMOVE_ALERT} from '../action/types'
const Istate = []

export default function (state=Istate,action) {
    const { payload, type } = action
    
    switch(type){
        case SET_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return state.filter(alert=>alert.id !== payload)
        default:
            return state
    }
}
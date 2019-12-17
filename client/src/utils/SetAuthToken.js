import axios from 'axios'

const SetAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['token']=token
    } else {
 delete axios.defaults.headers.common['token']
    }
}

export default SetAuthToken
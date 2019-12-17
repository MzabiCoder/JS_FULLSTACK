import React,{Fragment,useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Landing from './components/layouts/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import  store  from './store'
import { Provider } from 'react-redux'
import Alert from './components/alerts/Alert'
import { LoadUser } from './action/auth'
import SetAuthToken from './utils/SetAuthToken'


if (localStorage.token) {
  SetAuthToken(localStorage.token)
}
const App = () => {
  useEffect(() => {
    store.dispatch(LoadUser())
  },[LoadUser])
    
  return (
    <Provider store={store}>
    <Router>
     <Fragment>
     <Navbar />
       <Route exact path='/' component={Landing} />
       <section className="container">
         <Alert/>
         <Switch>
         <Route path='/login' component={Login} />
         <Route path='/register' component={Register} />

         </Switch>
       </section>
     </Fragment>
   </Router>
 </Provider>
    )
    
  
  
}


export default App;

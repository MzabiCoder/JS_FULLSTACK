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
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/router/PrivateRoute'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
 


if (localStorage.token) {
  SetAuthToken(localStorage.token)
}
const App = () => {
  useEffect(() => {
    store.dispatch(LoadUser())
  },[])
    
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
              <Route path='/profiles' component={Profiles} />
              <Route path='/profile/:id' component={Profile} />

              <PrivateRoute path='/create-profile' component={CreateProfile} />
              <PrivateRoute path='/add-education' component={AddEducation} />

              <PrivateRoute path='/dashboard' component={Dashboard} />
              <PrivateRoute path='/posts' component={Posts} />
              <PrivateRoute path='/edit-profile' component={EditProfile} />
              <PrivateRoute path='/add-experience' component={AddExperience} />


         </Switch>
       </section>
     </Fragment>
   </Router>
 </Provider>
    )
    
  
  
}


export default App;

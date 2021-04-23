import './App.css';
import MessageIcon from '@material-ui/icons/Message'
import GroupIcon from '@material-ui/icons/Group';
import PublicIcon from '@material-ui/icons/Public';
import FaceIcon from '@material-ui/icons/Face';
import LoginRoute from './Login/Login'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import NotFound from './Extras/NotFound'

function App() {
  return (
    <div>
      <PublicIcon id="upper_left" fontSize="large"/>
      <FaceIcon id="upper_right" fontSize="large"/>
      <GroupIcon id="lower_left" fontSize="large"/>
      <MessageIcon id="lower_right" fontSize="large"/>
      <div id="background_container">
        <div id="fill_container">
          <div id="main_container"> 
            <Router>
              <Switch>
                <Route exact path='/'>
                  <Redirect to='/login'/>
                </Route>
                <Route exact path='/login' component={LoginRoute}/>
                <Route component={NotFound}/>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

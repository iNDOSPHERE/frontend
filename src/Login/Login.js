import './Login.css'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import AddCircle from '@material-ui/icons/AddCircle'
import createClass from 'create-react-class'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import axios from 'axios'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Register from './Register'
import OTP from './OTP'
import CreateUser from './CreateUser'
import NotFound from '../Extras/NotFound'

var Login = createClass({
  icons_list : ["upper_left", "upper_right", "lower_left", "lower_right"],
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return{name:'', password:''}
    },
  getDefaultProps: function(){
    return({name:"hello"})
  },
  handleLogin: function(){
    if(!((this.state.name==='') || (this.state.password===''))){
      axios.post('http://localhost:8081/login/otp',{Auth:{
      email: this.state.name,
      password:this.state.password
    }}).then(res =>{
      this.props.history.push({
        pathname:'/otp',
        state:{
          name: this.state.name
        }
      })
    })}
   },
   handleRegister: function(){
     this.props.history.push({pathname:'/login/register'})
   },
  render: function(){
    this.icons_list.forEach((icon) => {
        document.getElementById(icon).style.visibility = "hidden"
    }) 
    var nameLink = this.linkState('name')
    var passwordLink = this.linkState('password')
    var nameChange = function(event){
      nameLink.requestChange(event.target.value)
    }
    var passwordChange = function(event){
      passwordLink.requestChange(event.target.value)
    }
    
    return (
      <div>
        <div id="head">
        <h1>LOGIN</h1>
        </div>
        <div className="username">
          <div className="form">
          <input type="text" name="name" autoComplete="off" value={nameLink.value} onChange={nameChange} maxLength="30" required/>
          <label htmlFor="name" className="label-name">
            <span className="content-name">Username/email</span>
          </label>
          </div>
        </div>
        <div className="password">
          <div className="form">
            <input type="password" name="password"  value={passwordLink.value} onChange={passwordChange} maxLength="20" required/>
            <label htmlFor="password" className="label-password">
              <span className="content-password">Password</span>
            </label>
          </div>
        </div>
        <div className="buttons">
          <button className="login" onClick={this.handleLogin} id="submit"><ArrowUpwardIcon className="button_icon" fontSize="small"/><span className="button_text">Submit</span></button>
          <button className="login" id="register" onClick={this.handleRegister}><AddCircle className="button_icon" fontSize="small"/><span className="button_text">Register</span></button>
        </div>
      </div>
    )
  }
  }
)

var LoginRoute = createClass({
  render :function(){
    return(
      <Router>
        <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/login/register' component={Register}/>
        <Route exact path='/login/otp' component={OTP}/>
        <Route exact path='/login/createuser' component={CreateUser}/>
        <Route component={NotFound}/>
        </Switch>
      </Router>
    )
  }
})

export default LoginRoute;
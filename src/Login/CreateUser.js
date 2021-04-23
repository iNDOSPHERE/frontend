import axios from 'axios';
import createClass from 'create-react-class';
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import './Login.css'

var Register = createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function(){
        return { email:this.props.location.state.email, username: '', password: '', otp:''}
    },
    getDefaultProps: function(){
        return {email:''}
    },
    handleRegister: function(){
        if (!(this.state.email==='')){
            axios.post('http://localhost:8081/create/profile',
            {email:this.state.email, username:this.state.username, password: this.state.password}).then(res => {
              this.props.history.push({
                pathname:'/login'
              })
                
            })
        }
    },
    render:function(){
        var otpLink = this.linkState('otp')
        var otpChange = function(event){
            otpLink.requestChange(event.target.value)
        }
        var usernameLink = this.linkState('username')
        var usernameChange = function(event){
            usernameLink.requestChange(event.target.value)
        }
        var passwordLink = this.linkState('password')
        var passwordChange = function(event){
            passwordLink.requestChange(event.target.value)
        }
        return(
            <div>
            <div id="head">
            <h1>Register</h1>
            </div>
            <div className="username">
              <div className="form">
              <input type="text" name="username" autoComplete="off" value={usernameLink.value} onChange={usernameChange} maxLength="30" required/>
              <label htmlFor="username" className="label-name">
                <span className="content-name">Username</span>
              </label>
              </div>
            </div>
            <div className="password">
              <div className="form">
              <input type="password" name="password" autoComplete="off" value={passwordLink.value} onChange={passwordChange} maxLength="30" required/>
              <label htmlFor="password" className="label-name">
                <span className="content-name">Password</span>
              </label>
              </div>
            </div><div className="password">
              <div className="form">
              <input type="password" name="password" autoComplete="off" value={otpLink.value} onChange={otpChange} maxLength="10" required/>
              <label htmlFor="password" className="label-name">
                <span className="content-name">OTP from Email</span>
              </label>
              </div>
            <div className="buttons">
              <button className="login" onClick={this.handleRegister} id="submit"><span className="button_text">Submit</span></button>
            </div>
          </div>
          </div>
        )
    }
})

export default Register;
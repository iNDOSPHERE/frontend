import axios from 'axios';
import createClass from 'create-react-class';
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import './Login.css'

var OTP = createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function(){
        return { otp:'', email:this.props.location.state.email}
    },
    handleLogin: function(){
        if (!(this.state.otp==='')){
            axios.post('http://localhost:8081/login',
            {Auth:{
                email:this.state.email
            }, code: this.state.otp}).then(res =>{
                console.log(res)
            })
        }
    },
    render:function(){
        var otpLink = this.linkState('otp')
        var otpChange = function(event){
            otpLink.requestChange(event.target.value)
        }
        return(
            <div>
            <div id="head">
            <h1>LOGIN</h1>
            </div>
            <div className="username">
              <div className="form">
              <input type="text" name="email" autoComplete="off" value={otpLink.value} onChange={otpChange} maxLength="30" required/>
              <label htmlFor="email" className="label-name">
                <span className="content-name">OTP</span>
              </label>
              </div>
            </div>
            <div className="buttons">
              <button className="login" onClick={this.handleLogin} id="submit"><span className="button_text">Submit</span></button>
            </div>
          </div>
        )
    }
})

export default OTP;
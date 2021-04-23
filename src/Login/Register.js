import axios from 'axios';
import createClass from 'create-react-class';
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import './Login.css'
import ReactDOM from 'react-dom'

var Register = createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function(){
        return { email:''}
    },
    getDefaultProps: function(){
        return {email:''}
    },
    handleRegister: function(){
        if (!(this.state.email==='')){
            axios.post('http://localhost:8081/create/application',
            {email:this.state.email}).then(res => {
                this.props.history.push({
                    pathname:"/createuser",
                    state:{
                        email:this.state.email
                    }
                })
            })
        }
    },
    render:function(){
        var icons_list = ["upper_left", "upper_right", "lower_left", "lower_right"]
        icons_list.forEach((icon) => {
            document.getElementById(icon).style.visibility = "visible"
        }) 
        var nameLink = this.linkState('name')
        var emailLink = this.linkState('email')
        var emailChange = function(event){
            emailLink.requestChange(event.target.value)
        }
        return(
            <div>
            <div id="head">
            <h1>Register</h1>
            </div>
            <div className="username">
              <div className="form">
              <input type="text" name="email" autoComplete="off" value={emailLink.value} onChange={emailChange} maxLength="30" required/>
              <label htmlFor="email" className="label-name">
                <span className="content-email">Email</span>
              </label>
              </div>
            </div>
            <div className="buttons">
              <button className="login" onClick={this.handleRegister} id="submit"><span className="button_text">Submit</span></button>
            </div>
          </div>
        )
    }
})

export default Register;
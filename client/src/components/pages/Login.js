import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import './formStyle.css';




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errormsg: ''
        }
    }
    
    onChange = (e) => this.setState({ [e.target.name] : e.target.value});
    onSubmit = (e) => {
        e.preventDefault();
        this.props.loginUser(this.state.username, this.state.password).then((resp) => {
            localStorage.setItem('jwt', resp.data.jwt);
            this.props.history.push('/user');
        }).catch(error => {
            this.setState({
                username: '',
                password: '',
                errormsg : error.response.data.msg});
        });
    }
    render(){
        return (
            <React.Fragment>

                    <div className="box" >
                        
                        <h2 className="title is-3 has-text-info">Log in</h2>
                        <form onSubmit={this.onSubmit}>
                            <div className="field">  
                                <div className="control inputBox">
                                    <input name = "username" type="text" id = "username" value = {this.state.username} onChange = {this.onChange} required />  
                                    <label>username</label>      
                                </div>
                            </div>
                            <div className="field">
                                <div className="control inputBox">
                                    <input name ="password" id="password" type="password" name="password" title="password" value = {this.state.password} onChange = {this.onChange} required />
                                    <label>password</label>      
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="">Login</button>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <p id="message" className="help is-danger">{this.state.errormsg}</p>
                                </div>
                            </div>
                        </form>
                    </div>
            </React.Fragment>
        )
    
    }
}
export default withRouter(Login);
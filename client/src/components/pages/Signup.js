import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import './formStyle.css';



class Signup extends Component {
    state = {
        username: '',
        password: '',
        errormsg: '',
        targetLang: '',

    }
    onChange = (e) => this.setState({ [e.target.name] : e.target.value});
    onSubmit = (e) => {
        e.preventDefault();
        this.props.createUser(this.state.username, this.state.password).then(res => {
            this.props.loginUser(this.state.username, this.state.password).then((resp) => {

                localStorage.setItem('jwt', resp.data.jwt);localStorage.setItem('jwt', resp.data.jwt);
                this.props.editUser(this.state.targetLang).then(() => {
                    this.props.starter().then(() => {
                        this.props.history.push('/user');
                    });   
                }); 
            });
        }).catch(error => {
            console.log(Object.keys(error));
            this.setState({
                username: '',
                password: '',
                errormsg : error.response.data.msg});
        });
        
    }
    render(){
        return (
            <React.Fragment>
                <div className="box">   
                    <h2 className="title is-3 has-text-info">Sign Up</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="field">  
                            <div className="control inputBox">
                                <input type="text" id = "firstName" required/>  
                                <label>First Name</label>      
                            </div>
                        </div>
                        <div className="field">  
                            <div className="control inputBox"> 
                                <input type="text" id = "lastName" required />
                                <label>Last Name</label>      
                            </div>
                        </div>
                        <div className="field">  
                            <div className="control inputBox">
                                <input name = "username" type="text" id = "username" value = {this.state.username} onChange = {this.onChange} required />  
                                <label>username</label>      
                            </div>
                        </div>
                        <div className="field">  
                            <div className="control inputBox">
                                <input name ="password" id="password" type="password" title="password"  value = {this.state.password} onChange = {this.onChange} required />
                                <label>password</label>      
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <div className="selector" onChange = {this.onChange}>
                                    <select name= "targetLang">
                                        <option>Target</option>
                                        <option>General</option>
                                        <option>English</option>
                                        <option>Japanese</option>
                                    </select>
                                </div>
                                
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type="submit">Sign Up</button>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <p id="message"className="help is-danger">{this.state.errormsg}</p>
                            </div>
                        </div>
                    </form>
                </div>
                
            </React.Fragment>
        )
    
    }
}
export default withRouter(Signup);
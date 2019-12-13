import React, {Component} from 'react';
import { getJwt } from '../helpers/jwt';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';

class AuthenticationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : 'undefined'
        }
    }
    componentDidMount() {
        const jwt = getJwt();
        //console.log(jwt);
        if (!jwt ) {
            this.props.history.push('/login');
        } else {
            Axios.get('http://localhost:5000/account/status', {headers: {Authorization: `Bearer ${jwt}`}}).then((res) => {
                this.props.handleLogin(res.data.user);
                this.setState({user: res.data.user});
            }).catch (error => {

            });
        }
          
    }
    render(){
        if (this.state.user === 'undefined') {
            return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1>loading...</h1>
                
            </div>);
        }
        console.log(this.props.children);
        return (
            <div>
                {this.props.children}
            </div>
        )
    
    }
}
export default withRouter(AuthenticationComponent);
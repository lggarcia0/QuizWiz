import React, {Component} from 'react';

export default class Create extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div>
                <h1>Home</h1>
                <h1>{this.props.loggedIn ? 'a user': 'not a user'}</h1>
            </div>
        )
    
    }
}
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../../../node_modules/react-bulma-components/dist/react-bulma-components.min.css'

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeBurger : false
        }
    }
    test = (e) => {
        this.props.test();
    }
    burgerClick = (e) => {
        this.setState({activeBurger : !this.state.activeBurger});
    }
    handleLogout = (e) => {
        this.props.handleLogout();
  
    }
    render() {
        return (
            <nav className="navbar is-info is-fixed-top is-transparent" role="navigation" aria-label="main navigation" style = {navigateStyle}>
                <div className="navbar-brand">
                    <Link className="navbar-item" to={this.props.loggedIn ? "/user" : "/"}>QuizWiz</Link>
                    <div role="button" className={this.state.activeBurger ? 'navbar-burger burger is-active': 'navbar-burger burger'} aria-label="menu" aria-expanded="false" data-target="dropTheBass" onClick={this.burgerClick}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </div> 
                </div>
                <div id= "dropTheBass" className={this.state.activeBurger ? 'navbar-menu is-active': 'navbar-menu'}>
                    <div className="navbar-start">
                        <Link className = "navbar-item" to="/publicdecks">Public Decks</Link>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className= "control">
                                    {this.props.loggedIn ? '':<Link className="button is-primary" to = "/signup">
                                        <strong>Sign up</strong>
                                    </Link>}
                                </p>
                                <p className = "control">
                                    {this.props.loggedIn ? <Link className="button is-danger" to = "/"onClick = {this.handleLogout}>Log out</Link>:<Link className="button is-light" to = "/login">
                                        <strong>Log in</strong>
                                    </Link>}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
    
}

const navigateStyle = {
    

}
export default Navigation;
import React, {Component} from 'react';
import { getJwt } from '../helpers/jwt';
import Axios from 'axios'
import {withRouter} from 'react-router-dom'
import DeckDis from '../layout/DeckDis';



class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decks: [],
            deckName: "",
            deckID: "",
            front: "",
            back: "",
            toggleCreator: false,
            toggleCardCreator: false
        }
    }
    onChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }
    addCards = (id) => {
        this.setState({deckID : id, toggleCardCreator: true, deckName: "", front : "", back: "", toggleCreator: false});
    }
    study = (id)  => {
        let aDeck = this.state.decks.filter((deck) => deck.key === id)[0];
        this.props.history.push({pathname: '/study', state: {currentDeck: aDeck}});
    }
    publish = (id) => {
        let aDeck = this.state.decks.filter((deck) => deck.key === id)[0];
        if (aDeck.value.isPublished !== true) {
            Axios.post('http://localhost:5000/user/decks/'+id + "/isPublished",{
                data: true
            }, {headers: {Authorization: `Bearer ${getJwt()}`}}).then((res) => {
                Axios.post('http://localhost:5000/public/decks/'+id,{
                    data: aDeck.value,
                    }, {headers: {Authorization: `Bearer ${getJwt()}`}}).then((e) => {
                        aDeck.value.isPublished = true;
                        let totalDecks = this.state.decks;
                        console.log(id);
                        let targetDecks = totalDecks.filter(d => d.key != id);
                        console.log(targetDecks);
                        targetDecks.push(aDeck);
                        console.log(targetDecks);
                        this.setState({Decks: targetDecks});
                    });
                
            });
        } else {
            Axios.delete('http://localhost:5000/public/decks/'+id, {headers: {Authorization: `Bearer ${getJwt()}`}}).then((e) => {
                Axios.post('http://localhost:5000/user/decks/'+id + "/isPublished",{
                    data: false,
                    }, {headers: {Authorization: `Bearer ${getJwt()}`}}).then((re) => {
                        aDeck.value.isPublished = false;
                        let totalDecks = this.state.decks;
                        console.log(id);
                        let targetDecks = totalDecks.filter(d => d.key != id);
                        console.log(targetDecks);
                        targetDecks.push(aDeck);
                        console.log(targetDecks);
                        this.setState({Decks: targetDecks});
                    })
            })
        }
    }
    deleteDeck = (id) => {
        Axios.delete('http://localhost:5000/user/decks/'+id, {headers: {Authorization: `Bearer ${getJwt()}`}}).then((e) => {
            let filteredDecks = this.state.decks.filter(d => d.key != id);
            this.setState({decks: filteredDecks});
        });
    }
    createCard = (e) => {
        e.preventDefault();
        let front = this.state.front;
        let back = this.state.back;
        if (!(front === "" |  back === "")) {
            Axios.post('http://localhost:5000/user/decks/' + this.state.deckID + '/cards',{
                data: {front, back},
                type: 'merge'
            }, {headers: {Authorization: `Bearer ${getJwt()}`}}).then((res) => {
                let totalDecks = this.state.decks;
                let targetDeck = totalDecks.filter(d => d.key == this.state.deckID);
                targetDeck[0].value.cards.push({front, back});
                this.setState({decksName: "",
                    deckID: "",
                    front: "",
                    back: "",
                    toggleCreator: false,
                    toggleCardCreator: false});
            });
        }
    }
    createDeck = (e) => {
        e.preventDefault();
        let deckName = this.state.deckName;
        let id = Date.now();
        let jason = {name: deckName, author: this.props.userInfo.name, cards : []};
         if (deckName !== "") {
            Axios.post('http://localhost:5000/user/decks/' + id,{
                data: jason},{headers: {Authorization: `Bearer ${getJwt()}`}}).then((res) => {
                    //this.props.history.push('/user');
                    let totalDecks = this.state.decks;
                    totalDecks.push({key: id, value: jason});
                    console.log(totalDecks);
                    this.setState({decks: totalDecks, decksName: "",
                    deckID: "",
                    front: "",
                    back: "",
                    toggleCreator: false,
                    toggleCardCreator: false});
                    window.location.reload(false);
            });
         }
        
    }
    toggleDeckCreator = () => {
        this.setState({toggleCreator: !this.state.toggleCreator, deckName: "", deckID : "", front : "", back: "", toggleCardCreator: false});
    }
    cancel = (e) => {
        this.setState({deckName: "", deckID : "", toggleCreator: false, toggleCardCreator: false});
    }
    componentDidMount() {
        
        Axios.get('http://localhost:5000/user/decks', {headers: {Authorization: `Bearer ${getJwt()}`}}).then((res) => {
            let gottenDecks = [];
            for (let [key, value] of Object.entries(res.data.result)) {
                gottenDecks.push({key, value});
            }
            this.setState({decks: gottenDecks, toggleCreator: false, deckName : ''});
        }).catch (error => {
            //this.setState({loggedIn: false})
        });
    }
    render(){
        return (
        <div>
            <section className="hero is-primary is-bold">
                <div className="hero-body">
                    <div className="container">
      <                 h1 className="title is-2">
                            {this.props.userInfo.name}'s Decks
                        </h1>
                    </div>
                </div>
            </section>
            <div>
                <table className= "table">
                <thead>
                    <tr>
                        <th>Deck Name</th>
                        <th></th>
                        <th>Number of Cards</th>
                        <th></th>

                    </tr>
                </thead>
                    <tbody>
                        <DeckDis deezDecks={this.state.decks} study = {this.study} addCards = {this.addCards} publish = {this.publish} deleteDeck = {this.deleteDeck}/>
                    </tbody>
                </table>
            </div>
            <div className="box" style = {this.state.toggleCreator ? 
                {zIndex: '2',visibility: 'visible',backgroundColor: '#555'}: {zIndex: '-1',visibility: 'hidden',backgroundColor: '#555'}}>    
                <h2 className="title is-3 has-text-info">Create Deck</h2>
                <div>
                    <div className="field">  
                        <div className="control inputBox">
                            <input type="text" id = "deckName" value = {this.state.deckName} onChange = {this.onChange} required />  
                            <label>Deck Name</label>      
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button type="submit" className="" onClick = {this.createDeck}>Create</button>
                        </div>
                        <div className="control">
                            <button name = "cancel"type="cancel" className="button is-danger" onClick = {this.cancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="box" style = {this.state.toggleCardCreator ? 
                {zIndex: '1',visibility: 'visible',backgroundColor: '#555'}: {zIndex: '-2',visibility: 'hidden',backgroundColor: '#555'}}>    
                <h2 className="title is-3 has-text-info">Add Card</h2>
                <div>
                    <div className="field">  
                        <div className="control inputBox">
                            <input type="text" id = "front" value = {this.state.front} onChange = {this.onChange} required />  
                            <label>Front Side</label>      
                        </div>
                    </div>
                    <div className="field">  
                        <div className="control inputBox">
                            <input type="text" id = "back" value = {this.state.back} onChange = {this.onChange} required />  
                            <label>Back Side</label>      
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button type="submit" className="" onClick = {this.createCard}>Create</button>
                        </div>
                        <div className="control">
                            <button name = "cancel"type="cancel" className="button is-danger" onClick = {this.cancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                        <button className="next" onClick = {this.toggleDeckCreator} style = {{marginTop : '1em'}}>Create Deck</button>
                    </div>
                </div>
            </div>
        </div>   
        );
    }
    
}
export default withRouter(User);
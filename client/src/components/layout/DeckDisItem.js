import React, {Component} from 'react';

export default class DeckDisItem extends Component {
    constructor(props) {
        super(props);
    }
    abducted = (e) => {
        if (e.target.parentElement.parentElement.className == "dropdown") {
            e.target.parentElement.parentElement.className = "dropdown is-active";
        } else {
            e.target.parentElement.parentElement.className = "dropdown";
        }  
    }
    addCards = (e) => {
        const targetId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        this.props.addCards(targetId);
    }
    study = (e) => {
        const targetId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        this.props.study(targetId);
    }
    publish = (e) => {
        const targetId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        this.props.publish(targetId);
    }
    deleteDeck = (e) => {
        const targetId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        this.props.deleteDeck(targetId);
    }
    render(){
        return (
            <tr id = {this.props.deck.key}>
                <td>{this.props.deck.value.name}</td>
                <td></td>
                <td> {this.props.deck.value.cards.length}</td>
                <td >
                    <div className ="dropdown">
                        <div className="dropdown-trigger">
                            <button className= 'button is-link is-inverted' aria-haspopup="true" aria-controls= {"dropdown" + this.props.deck.key} onClick = {this.abducted}>Actions</button>
                        </div>
                        <div className="dropdown-menu" id = {"dropdown" + this.props.deck.key} role="menu">
                            <div className="dropdown-content">
                                {this.props.deck.value.cards.length !== 0 ? 
                                <a onClick = {this.study} className="dropdown-item">
                                    Study
                                </a>: 
                                <div className="dropdown-item">
                                    <p className = "dropdown-item">Add Cards to Use the Study Feature</p>
                                </div>}
                                <a onClick = {this.addCards} className="dropdown-item">
                                    Add Cards
                                </a>
                                {this.props.deck.value.isPublished ? 
                                <a onClick = {this.publish} className="dropdown-item">
                                    Unpublish Deck
                                </a>: 
                                <a onClick = {this.publish} className="dropdown-item">
                                    Publish Deck
                                </a>}
                                
                                <a onClick = {this.deleteDeck} className="dropdown-item">
                                    Delete Deck
                                </a>
                            </div>
                        </div>
                    </div>
                    
                </td>
            </tr>
        )
    }
}
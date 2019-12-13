import React, {Component} from 'react';
import DeckDisItem from './DeckDisItem';

export default class DeckDis extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        let decks = this.props.deezDecks;
        return decks.map((deck) => (
            <DeckDisItem key = {deck.key} deck = {deck} study = {this.props.study} addCards = {this.props.addCards} publish = {this.props.publish} deleteDeck = {this.props.deleteDeck}/>
        ));
    
    }
}
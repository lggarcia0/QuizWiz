import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import Card from '../layout/Card';

class Study extends Component {
    constructor(props) {
        super(props);
        this.nextCard = this.nextCard.bind(this);
        this.state = {
            currentDeck : {},
            currentCard : {}
        }
    }
    componentDidMount() {
        const currentDek = this.props.location.state.currentDeck;
        this.setState({currentDeck: currentDek, currentCard: this.getRandomCard(currentDek.value.cards)})
        ;
    }
    //componentWillMount() {
    //    const currentDek = this.props.location.state.currentDeck;  
    //    const currentCards = currentDek.value.cards;
    //    this.setState({currentDeck: currentDek, currentCard: this.getRandomCard(currentCards)});
    //}
    getRandomCard(currentCards) {
        let card = currentCards[Math.floor(Math.random() * currentCards.length)];
        return card;
    }
    nextCard() {
        const currentCards = this.state.currentDeck.value.cards;
        console.log(Date.now());
        this.setState({currentCard: this.getRandomCard(currentCards)});
    }
    render(){
        return (
            <div>
                <div className = "kardRow">
                    <Card currentCard = {this.state.currentCard} nextCard = {this.nextCard}/>
                </div>

            </div>
        )
    
    }
}
export default withRouter(Study);
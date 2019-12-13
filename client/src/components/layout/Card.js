import React, {Component} from 'react';

export default class Card extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div>
                <div className="kard-Container">
                    <div className="kard"> 
                        <div className= "front">
                            <div className="front-text">
                                {this.props.currentCard.front}
                            </div>
                        </div>
                        <div className= "back">
                            <div className="back-text">
                                {this.props.currentCard.back}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="next" onClick = {this.props.nextCard}>Next</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    
    }
}
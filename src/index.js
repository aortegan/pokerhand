import React from 'react';
import ReactDOM from 'react-dom';
import deck from './Deck';
import helpers from './Helpers'

import { Badge, Button, Form, Input, Container, Col, Row } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './index.css';

/*
 * TODO:
 *
 * When new hand: Check if cards have already been distributed
 * Compare all the hands and set a winner
 * Set error messages
 * Unit tests
 *
 */


/*
 * Card Component
 *
 */
function Card(props){
    const suitColor = props.suit === 'S' || props.suit === 'C' ? 'dark' : 'danger';
    return(
        <Badge
            color={suitColor}
            rank={props.rank}
            suit={props.suit}
        >
            {props.rank + props.suit}
        </Badge>
    );
}


/*
 * Poker Hand Component
 *
 */
class PokerHand extends React.Component{

    constructor(props){
        super(props);

        // Convert cards string to array of cards
        const cardsStr = props.cards.split(" ");

        // Array of Card components
        let cardsObj = [];
        cardsStr.forEach((card,index)=>{
            cardsObj.push(
                <Card
                    key={index}
                    rank={card[0]}
                    suit={card[1]}
                />
            )         
        });

        // All the ranks of a hand
        const handRanks = deck.setHandRanks(cardsStr);
        // All the suits of a hand
        const handSuits = deck.setHandSuits(cardsStr);
        // Indicates if all the cards belong to the same suit
        const sameSuit = deck.sameSuit(handSuits);
        // Indicates if there is repeated ranks in the hand
        const hasRepeatedRanks = deck.hasRepeatedRanks(handRanks);
        // If there's repeated ranks, get which ranks and how many times they are repeated
        const repeatedRanks = hasRepeatedRanks ? deck.repeatedRanks(handRanks) : [];
        // Indicates if the ranks are correlative
        const correlativeValues = helpers.correlativeValues(handRanks);

        // Options to filter the rankings
        const filterOptions = {
            sameSuit : sameSuit,
            hasRepeatedRanks : hasRepeatedRanks,
            repeatedRanks : repeatedRanks,
            correlativeValues : correlativeValues
        }

        // State of the hand, contains display data and comparison purposes data
        this.state = {
            player: props.player,
            cards: cardsObj,
            handRanks: handRanks,
            handSuits: handSuits,
            filterOptions: filterOptions,
            ranking: deck.setHandRanking(handRanks,filterOptions),
        }
    }

    render(){
        return(
            <Col>
                <div className="game-hand" key={this.props.key}>
                    {this.state.cards}
                </div>
            </Col>
        )
    }
}


/*
 * Game Component
 *
 */
class Game extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            hands: [],
            players: 0,
            newHandInput: ''
        }
        
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const hands = this.state.hands.slice();
        const players = this.state.players;
        const new_hand = [
            <PokerHand
                player={this.state.players + 1}
                cards={this.state.newHandInput}
            />
        ]
        this.setState({
            hands: hands.concat(new_hand),
            players: players+1,
            newHandInput: '',
        })
    }

    handleInputChange = (event) => {

        event.preventDefault()

        this.setState({
            newHandInput: event.target.value
        })
        //console.log(event.target.value)
    }

    render(){
        let hands = this.state.hands;
        return(
            <Container className="game">
                <Row>
                    <h2>Instructions:</h2>
                    <p>Introduce your cards: </p>   
                    <ul>
                        <li>A space is used as card seperator</li>
                        <li>Each card consists of two characters</li>
                        <li>The first character is the value of the card, valid characters are: `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `T`(en), `J`(ack), `Q`(ueen), `K`(ing), `A`(ce)</li>
                        <li>The second character represents the suit, valid characters are: `S`(pades), `H`(earts), `D`(iamonds), `C`(lubs)</li>
                    </ul>
                    <p>Example: "3D 5S JD AH 9C"</p>
                </Row>

                <Row className="hands">
                    { hands }
                </Row>

                <Row className="controls">
                    <Form onSubmit={this.handleSubmit}>
                        <Input type="text" name="hand" placeholder="AH 3C 2H 6D 7C" value={this.state.newHandInput} onChange={this.handleInputChange} />
                        
                        <Button type="submit" color="danger">Add hand</Button>
                    </Form>
                </Row>

            </Container>
        )
    }
}

// ========================================

ReactDOM.render(
<Game />,
document.getElementById('root')
);
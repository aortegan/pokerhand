import React from 'react';
import ReactDOM from 'react-dom';
import deck from './Deck';
import helpers from './Helpers'

import { Alert, Button, Form, Input, Container, Col, Row } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './index.css';


/*
 * TODO:
 *
 * Unit tests
 *
 */

class Image extends React.Component{
    render(){
        return(
            <img src={require('./img/' + this.props.file)} alt={this.props.imgalt} width={this.props.width} height={this.props.heigt} className="pokercard-img"/>
        );
    }
}


/*
 * Card Component
 *
 */
function Card(props){

    return(
        <Image file={props.cardName} width="64" height="64" imgalt="card icon"/>
    );
}


/*
 * Poker Hand Component
 *
 */
class PokerHand extends React.Component{

    render(){
        const cards = this.props.cards.map((card,index)=>{
            return(
                <Card
                     key={index}
                     cardName={card.props.rank + card.props.suit + '.png'}
                 />
            )
        });
        return(
            <Col xs="12" sm="12" md={{ size: 8, offset: 2 }} className="hand-container">
                <div className="game-player">Player : {this.props.player}</div>
                <div className="game-hand" /*key={this.props.key}*/>
                    {cards}
                </div>
                <div className="game-ranking">{this.props.ranking}</div>
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
            newHandInput: '',
            message: null,
        }
        
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let cardsStr = this.state.newHandInput.split(" ");

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

        // Hand object to be stored into game state
        const new_hand = {
            player: this.state.players + 1,
            cards: cardsObj,
            handRanks: handRanks,
            handSuits: handSuits,
            filterOptions: filterOptions,
            ranking: deck.setHandRanking(handRanks,filterOptions),
            cardsInput: cardsStr,
        }


        /*
         * Validation
         * 1. Check if hand input is valid
         *  - Cards are made of 2 characters
         *  - Cards are not repeated
         *  - The suits are valid (Spades, Clubs, Hearts and Diamonds)
         *  - The ranks are valid (values from 2 to 14)
         * 
         * 2. Check if there are any repeated cards among all hands
         *  - Cards can only exist one in the deck
         */

        // Validate the new hand
        const validHand = deck.validateHand(cardsStr,handRanks,handSuits);

        // Look for repeated cards among hands
        const hands = this.state.hands;
        let allCards = [];
        hands.forEach((hand,index)=>{
            allCards = allCards.concat(hand.cardsInput)
        });
        allCards = allCards.concat(cardsStr);
        const repeatedCards = allCards.some( card => allCards.filter(n => n === card).length !== 1 );

        // If new hand is valid, proceed
        if( validHand && !repeatedCards){

            const hands = this.state.hands.slice();
            const players = this.state.players;
            
            this.setState({
                hands: hands.concat(new_hand),
                players: players+1,
                newHandInput: '',
                message: null
            })
        }else{
            let message = [
                <Alert color="danger" key="1">
                    Cards input is not correct. Check that the ranks and suits are valid, and that there is no repeated cards.
                </Alert>
            ]
            this.setState({
                message: message
            })  
        }
    }

    handleInputChange = (event) => {

        event.preventDefault()

        this.setState({
            newHandInput: event.target.value
        })
        //console.log(event.target.value)
    }

    setWinner = (hands) => {
        // If 2 players or more exist: continue
        hands = hands.length > 1 ? this.state.hands.slice() : false;
        if(hands){
            let result = deck.setWinner(hands);
            console.log(result);

            if(result.length === 1){
                let winner = hands.find(hand => hand.ranking.value === result[0]);

                let message = [
                    <Alert color="success" key="1">
                        The winner is player {winner.player} with a "{winner.ranking.name}" !
                    </Alert>
                ]
                this.setState({
                    message: message
                })  
            }else{
                let tie = hands.find(hand => hand.ranking.value === result[0]);
                let message = [
                    <Alert color="primary" key="2">
                        Oups! It looks like it's a tie of "{tie.ranking.name}"... Who's got the highest rank?
                    </Alert>
                ]
                this.setState({
                    message: message
                }) 
            }
        }else{
            let message = [
                <Alert color="warning" key="3">
                    The minimum number of players is 2
                </Alert>
            ]
            this.setState({
                message: message
            }) 
        }
    }

    render(){
        let messages = this.state.message;
        let hands = this.state.hands.map((hand,index)=>{
            return(
                <PokerHand
                    key={index}
                    cards={hand.cards}
                    player={hand.player}
                    ranking={hand.ranking.name}
                />
            )
        });
        return(
            <Container className="game">
                <Row className="game-title">
                    <Col>
                        <Image file="clubs.png" width="64" height="64" imgalt="card suit"/>
                        <Image file="hearts.png" width="64" height="64" imgalt="card suit"/>
                        <h1>Poker Hand</h1>
                        <Image file="diamonds.png" width="64" height="64" imgalt="card suit"/>
                        <Image file="spades.png" width="64" height="64" imgalt="card suit"/>
                    </Col>
                </Row>
                <Row className="game-intro">
                    <Col xs="12" sm="12" md={{ size: 8, offset: 2 }}>
                        
                        <h2>Instructions:</h2>
                        <p>Introduce your cards: </p>   
                        <ul>
                            <li>A space is used as card seperator</li>
                            <li>Each card consists of two characters</li>
                            <li>The first character is the value of the card, valid characters are: `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `T`(en), `J`(ack), `Q`(ueen), `K`(ing), `A`(ce)</li>
                            <li>The second character represents the suit, valid characters are: `S`(pades), `H`(earts), `D`(iamonds), `C`(lubs)</li>
                        </ul>
                        <p>Example: "3D 5S JD AH 9C"</p>
                    </Col>
                </Row>

                <Row className="hands">
                    { hands }
                </Row>

                <Row className="controls">
                    <Form onSubmit={this.handleSubmit}>
                        <Row form>
                            <Col xs="8">
                                <Input type="text" name="hand" placeholder="AH 3C 2H 6D 7C" value={this.state.newHandInput} onChange={this.handleInputChange} maxLength={14}/>
                            </Col>
                            <Col xs="4">
                                <Button type="submit" color="danger">Add hand</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row className="setwinner-btn-row">
                        <Col xs="12" className="setwinner-btn-col">
                            <Button onClick={(hands) => this.setWinner(this.state.hands)}>Set a winner</Button>
                        </Col>
                    </Row>
                </Row>

                <Row className="messages">
                    <Col xs="12">
                        { messages }
                    </Col>
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
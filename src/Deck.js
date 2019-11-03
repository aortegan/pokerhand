//import helpers from './Helpers'
import ranking from './ranking.js'

/*
 * A module containing all the functions related to poker 
 *
 */
const deck = {};


/*
 * validateHand
 * Check if all the cards of a given hand are valid
 * 
 * Required data: cards
 * Optional data: none
 * Return: boolean 
 */
deck.validateHand = (cards, ranks, suits) => {
    // These must be false to be valid
    let validCards;
    let validSuits; 
    let validRanks; 

    validCards = cards.some( card => card.length !== 2 || cards.filter(n => n === card).length !== 1 );

    validRanks = ranks.some( rank => rank < 2 || rank > 14 || isNaN(rank) );

    validSuits = suits.some( suit => suit !== 'S' && suit !== 'H' && suit !== 'D' && suit !== 'C' );

    //console.log(validCards);
    //console.log(validRanks);
    //console.log(validSuits);

    return !validCards && !validRanks && !validSuits;
}




/*
 * setHandRanking
 * Get a hand and filterOptions return the ranking of the hand
 * 
 * Required data: hand, filterOptions
 * Optional data: none
 * Return: object 
 */
deck.setHandRanking = (handRanks,filterOptions)=>{

    // If same suit (Flush, Straight flush or Royal flush)
    if(filterOptions.sameSuit){

        // If correlativeValues (Royal or Straight flush)
        if(filterOptions.correlativeValues){

            if(handRanks[0] === 14){ // Highest card is placed first
                return ranking.find( ranking => ranking.value === 10 ); // 10. Royal flush 
            }else{
                return ranking.find( ranking => ranking.value === 9 ); // 9. Straight flush 
            }

        }else{
            return ranking.find( ranking => ranking.value === 6 ); // 6. Flush  
        }
    }else if(filterOptions.hasRepeatedRanks){

        // If 2 repeated ranks (Two pair or Full house)
        if(filterOptions.repeatedRanks.length === 2){

            if(filterOptions.repeatedRanks[0].repeats === 3 || filterOptions.repeatedRanks[1].repeats === 3){
                return ranking.find( ranking => ranking.value === 7 ); // 7. Full House
            }else{
                return ranking.find( ranking => ranking.value === 3 ); // 3. Two pair
            }

        // If 1 repeated ranks (One pair, Three of a kind or Four of a kind)
        }else if(filterOptions.repeatedRanks.length === 1){

            if(filterOptions.repeatedRanks[0].repeats === 4){
                return ranking.find( ranking => ranking.value === 8 ); // 8. Four of a kind
            }else if(filterOptions.repeatedRanks[0].repeats === 3){
                return ranking.find( ranking => ranking.value === 4 ); // 4. Three of a kind
            }else{
                return ranking.find( ranking => ranking.value === 2 ); // 3. One pair
            }
        }

    }else{ // 2 options left: High card or Straight

        if(filterOptions.correlativeValues){
            return ranking.find( ranking => ranking.value === 5 ); // 5. Straight
        }else{
            return ranking.find( ranking => ranking.value === 1 ); // 1. High Card
        }
    }


}


/*
 * setHandRanks
 * Get an array of cards from a hand and return their values in an ascending ordered array
 *
 * Required data: cards
 * Optional data: none
 * Output: array 
 */
deck.setHandRanks = (cards)=>{
    let ranks = [];
    cards.forEach((card,index)=>{
        switch(card[0]){
            case 'T':
                ranks.push(10);
                break;
            case 'J':
                ranks.push(11);
                break;
            case 'Q':
                ranks.push(12);
                break;
            case 'K':
                ranks.push(13);
                break;
            case 'A':
                ranks.push(14);
                break;
            default:
                ranks.push(parseInt(card[0]));   
        }
        
    });
    ranks.sort(compareNumbers);
    return ranks;
}


/*
 * setHandSuits
 * Get all the cards from a hand and return the different suits in an array
 *
 * Required data: cards
 * Optional data: none 
 * Output: array
 */
deck.setHandSuits = (cards)=>{
    let suits= [];
    //console.log(cards);
    cards.forEach((card,index)=>{
        if(suits.indexOf(card[1]) === -1){ suits.push(card[1]) }
    });
    return suits;
}


/*
 * sameSuit
 * Check if all tha cards belong to the same suit
 *
 * Required data: pokerHand.suits
 * Output: boolean
 */
deck.sameSuit = (suits)=>{
    // If the length of the given array is 1, that means only one suit has been found in the hand
    return suits.length === 1 ? true : false;
}


/*
 * hasRepeatedRanks
 * Check if there's repeated ranks in the hand
 *
 * Required data: ranks
 * Output: boolean
 */
deck.hasRepeatedRanks = (ranks)=>{
    let repeats = false;
    ranks.forEach((rank,index) => {
        if(ranks.filter( n => n === rank).length > 1){
            repeats = true;
        }else{
            repeats = false;
        }
    });
    return repeats;
}


/*
 * repeatedRanks
 * Get the repeated ranks and the number of repetitions
 *
 * Required data: ranks
 * Output: array
 */
deck.repeatedRanks = (ranks)=>{
    let repeatedRanks = [];
    let repeats = [];
    let repeatsObj = {};
    //console.log(repeatedRanks)
    ranks.forEach(rank=>{
        repeats = ranks.filter(n => n === rank);
        if(repeats.length > 1){
            repeatsObj = {
                value : repeats[0],
                repeats : repeats.length
            } 
            if( repeatedRanks.findIndex( n => n.value === repeats[0] ) === -1 ){
                repeatedRanks.push(repeatsObj);
            }
        }
 
    })
    //repeatedRanks.indexOf(rank => rank.value === repeats[0]) === -1     
    return repeatedRanks;
}




const compareNumbers = (a,b)=>{
    return b - a;
}




export default deck;
import helpers from './Helpers'

/*
 * A module containing all the functions related to poker 
 *
 */
const deck = {};


/*
 * setHandRanks
 * Get all the cards from a hand and return their values in an ascending ordered array
 *
 * Required data: pokerHand
 * Optional data: none
 * Output: array 
 */
deck.setHandRanks = (hand)=>{
    return [];
}

/*
 * setHandSuits
 * Get all the cards from a hand and return the different suits in an array
 *
 * Required data: pokerHand
 * Optional data: none 
 * Output: array
 */
deck.setHandSuits = (hand)=>{
    return [];
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
    return suits.length && suits.length === 1 ? true : false;
}




export default deck;
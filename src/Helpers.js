/*
 * A module containing all helper functions
 *
 */
const helpers = {};


/*
 * correlativeValues
 * Given an array of numbers, check if their values are correlative
 * 
 * Required data: pokerHand.ranks
 * Optional data: none 
 * Returns: boolean
 */
helpers.correlativeValues = (ranks)=>{

    // make an array with the difference between the ranks
    let diff = []
    let correlative = [];
    ranks.forEach((rank,index)=>{
        if( index < (ranks.length-1)){
            diff.push( rank - ranks[index+1] )
        }
    });

    // Get only the differences = 1
    correlative = diff.filter( n => n === 1);

    // The result should be an array of 4 times the number 1
    return correlative.length === 4 ? true : false;
}

/*
 * highestValue
 * Given an array of numbers, return the highest
 * 
 * Required data: values
 * Optional data: none 
 * Returns: int
 */
// helpers.highestValue = (values)=>{
//     return 0;
// }



export default helpers;
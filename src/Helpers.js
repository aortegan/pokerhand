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
    let diff = []
    let correlative = [];
    ranks.forEach((rank,index)=>{
        if( index < (ranks.length-1)){
            diff.push( rank - ranks[index+1] )
            //console.log(rank - ranks[index+1])
            //correlative = (rank - ranks[index+1]) !== 1 ? false : true;
        }
    });

    correlative = diff.filter(n=>n===1);
     
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
helpers.highestValue = (values)=>{
    return 0;
}

/*
 * repeatedValues
 * Given an array of numbers, return an array with the repeated values and the number of repetitions
 * Ex: input [1,3,5,1,5] -> Returns [{1,2},{5,2}]
 * 
 * Required data: values
 * Optional data: none 
 * Returns: array
 */
helpers.repeatedValues = (values)=>{
    return [];
}


export default helpers;
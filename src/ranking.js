/*
 * Rankings 
 * An array containing all the poker rankings and properties that will be used to filter
 *
 */
const ranking = [
    {
        'value' : 1,
        'name' : 'High card',
        'sameSuit' : false,
        'hasRepeatedRanks' : false,
        'correlativeValues' : false
    },
    {
        'value' : 2,
        'name' : 'One pair',
        'sameSuit' : false,
        'hasRepeatedRanks' : true,
        'correlativeValues' : false
    },
    {
        'value' : 3,
        'name' : 'Two pair',
        'sameSuit' : false,
        'hasRepeatedRanks' : true,
        'correlativeValues' : false
    },
    {
        'value' : 4,
        'name' : 'Three of a kind',
        'sameSuit' : false,
        'hasRepeatedRanks' : true,
        'correlativeValues' : false
    },
    {
        'value' : 5,
        'name' : 'Straight',
        'sameSuit' : false,
        'hasRepeatedRanks' : false,
        'correlativeValues' : true
    },
    {
        'value' : 6,
        'name' : 'Flush',
        'sameSuit' : true,
        'hasRepeatedRanks' : false,
        'correlativeValues' : false
    },
    {
        'value' : 7,
        'name' : 'Full House',
        'sameSuit' : false,
        'hasRepeatedRanks' : true,
        'correlativeValues' : false
    },
    {
        'value' : 8,
        'name' : 'Four of a kind',
        'sameSuit' : false,
        'hasRepeatedRanks' : true,
        'correlativeValues' : false
    },
    {
        'value' : 9,
        'name' : 'Straight flush',
        'sameSuit' : true,
        'hasRepeatedRanks' : false,
        'correlativeValues' : true
    },
    {
        'value' : 10,
        'name' : 'Royal flush',
        'sameSuit' : true,
        'hasRepeatedRanks' : false,
        'correlativeValues' : true
    }
]

export default ranking;
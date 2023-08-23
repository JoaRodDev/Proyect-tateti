module.exports = function(user_board) {

    const combinations = [
        //rows
        [0,1,2],
        [3,4,5],
        [6,7,8],
        //columns
        [0,3,6],
        [1,4,7],
        [2,5,8],
        //diagonals
        [0,4,8],
        [6,4,2]
    ];
    for (let A = 0; A < combinations.length; A++) {
        let win_algorithm = combinations[A];
        let winner = true;
        for (let i = 0; i < win_algorithm.length; i++) {
            if(!isInArray(user_board, win_algorithm[i])){
                winner = false;
                break
            }
        }
        if(winner) {return true};
    }
    return false;
}

function isInArray(array, element) {
    return array.indexOf(element) >= 0;
}
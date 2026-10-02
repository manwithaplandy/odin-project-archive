const repeatString = function(string, num) {
    let i = 0;
    let returnString = '';
    if (num < 0) {return 'ERROR'}
    while (i < num) {
        returnString += string;
        i++;
    }
    return returnString;
};

// Do not edit below this line
module.exports = repeatString;

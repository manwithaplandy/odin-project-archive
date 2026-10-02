const reverseString = function(inputString) {
    let strLength = inputString.length;
    let i = strLength - 1;
    let newStringArray = [];
    while (i >= 0) {
        newStringArray.push(inputString.charAt(i));
        i--;
    }
    return newStringArray.join('');
};

// Do not edit below this line
module.exports = reverseString;

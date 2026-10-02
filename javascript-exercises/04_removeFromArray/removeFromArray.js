const removeFromArray = function(inputArray, ...args) {
/*
Take in array and ...args as inputs
Turn args into array
For each arg, check if it's in input array
    If in input array, remove number from input array
    else, continue to next arg
Return final array
*/

let newArray = inputArray;
let myArgs = args; // Turn args into array

let i = 0;
let argsLen = myArgs.length;

while (i < argsLen) {
    let currentNum = myArgs[i];
    if (newArray.includes(currentNum)) {
        let removeIndex = newArray.indexOf(currentNum);
        newArray.splice(removeIndex, 1);
    }
    i++;
}

return newArray;

};

// Do not edit below this line
module.exports = removeFromArray;

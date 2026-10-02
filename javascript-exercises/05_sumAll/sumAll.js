const sumAll = function(start, end) {
    let sum = 0;
    if ((start < 0) || (end < 0) || (typeof start != "number") || (typeof end != "number")) {
        return "ERROR"
    }
    for (let i = Math.min(start,end); i <= Math.max(start,end); i++) {
        sum += i;
    }
    return sum;
};

// Do not edit below this line
module.exports = sumAll;

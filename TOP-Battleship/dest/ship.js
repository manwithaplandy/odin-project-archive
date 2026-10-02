export class Ship {
    constructor(length, name) {
        this.name = name;
        this.length = length;
        this.hitMarker = new Array(length).fill(false);
        this.sunk = false;
    }
    hit(number) {
        this.hitMarker[number] = true;
    }
    isSunk() {
        return this.checkArrayTruth(this.hitMarker);
    }
    isTrue(element) {
        return element.valueOf();
    }
    checkArrayTruth(array) {
        return array.every(this.isTrue);
    }
}

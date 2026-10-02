export class Ship {
  name: string;
  size: number;
  hitMarker: boolean[];
  sunk: boolean;

  constructor(length: number, name: string) {
    this.name = name;
    this.size = length;
    this.hitMarker = new Array(length).fill(false);
    this.sunk = false;
  }

  hit(number: number) {
    this.hitMarker[number] = true;
  }

  isSunk() {
    return this.checkArrayTruth(this.hitMarker);
  }

  private isTrue(element: boolean) {
    return element.valueOf();
  }

  private checkArrayTruth(array: any[]) {
    return array.every(this.isTrue);
  }
}

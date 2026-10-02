import { Ship } from "../src/ship";

describe("Ship", () => {
  const ship = new Ship(4, "Battleship");

  test("defines hit()", () => {
    expect(typeof ship.hit).toBe("function");
  });

  test("defines isSunk()", () => {
    expect(typeof ship.isSunk).toBe("function");
  });

  test("Ship not yet sunk", () => {
    expect(ship.isSunk()).toBe(false);
  });

  test("Ship not sunk after 2 hits", () => {
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBe(false);
  });

  test("Ship sunk after all hits", () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isSunk()).toBe(true);
  });
});

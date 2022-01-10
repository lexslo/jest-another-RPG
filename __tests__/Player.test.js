const Player = require('../lib/Player');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

test('creates a Player object', () => {
    const player = new Player('Lex');

    expect(player.name).toBe('Lex');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    // the player's inventory should be an array containing an object
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
      );
});

test("gets player's stats as an object", () => {
    const player = new Player('Lex');
  
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player('Lex');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

test ('get player health value', () => {
    const player = new Player('Lex');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test ('checks if player is alive', () => {
    const player = new Player('Lex');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

test('subtracts from player health', () => {
    const player = new Player('Lex');
    const oldHealth = player.health;

    player.reduceHealth(5);
    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(999999);
    expect(player.health).toBe(0);
});

test('get player attack value', () => {
    const player = new Player('Lex');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);

});

test('adds a potion to the inventory', () => {
    const player = new Player('Lex');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test('uses potion from inventory', () => {
    const player = new Player('Lex');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
});

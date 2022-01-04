function Potion (name) {
    this.types = ['strength', 'agility', 'health'];
    // set name to name if truthy (parameter is passed) or set to random type based on length of this.types if falsey (no paramter passed)
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

    if (name == 'health') {
        // generate random number between 30 and 40 if health potion
        this.value = Math.floor(Math.random() * 10 + 30);
    } else {
        // generate random number between 7 and 12
        this.value = Math.floor(Math.random() * 5 + 7);
    }
}

module.exports = Potion;
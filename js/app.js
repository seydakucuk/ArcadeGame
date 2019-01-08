
const canvasWidth = 505;
const canvasHeight = 606;
const playerIconWidth = 101;
const playerIconHeight = 171;

const usableAreaMaxY = canvasHeight - playerIconHeight;
const usableAreaMaxX = canvasWidth - playerIconWidth;
const playerInitialX = 200;
const playerInitialY = 370;


// Enemies our player must avoid
var Enemy = function (xCoord = 0, yCoord = 0, speedFactor = 5) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = xCoord;
    this.y = yCoord;
    this.speedFactor = speedFactor;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    let delta = this.speedFactor * dt;
    this.x += delta;

    if (this.x >= canvasWidth) {
        this.x = 0;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (xCoord, yCoord) {

    this.sprite = 'images/char-boy.png';
    this.x = xCoord;
    this.y = yCoord;
};

Player.prototype.resetPosition = function () {
    this.x = playerInitialX;
    this.y = playerInitialY;
};


Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyCode) {
    const offset = 80;

    if (keyCode == 'left') {
        this.x -= offset;
    }
    else if (keyCode == 'up') {
        this.y -= offset;
    }
    else if (keyCode == 'right') {
        this.x += offset;
    }
    else if (keyCode == 'down') {
        this.y += offset;
    }

    if (this.x <= 0)
        this.x = 0;
    if (this.y <= -10)
        this.y = -10;
    if (this.x >= usableAreaMaxX)
        this.x = usableAreaMaxX;
    if (this.y >= usableAreaMaxY)
        this.y = usableAreaMaxY;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
const enemyCount = 3;
for (let i = 0; i < enemyCount; i++) {
    let speedFactor = 100 + i * 50;
    let x = i * 70;
    let y = 65 + i * 75;
    let enemy = new Enemy(x, y, speedFactor);
    allEnemies.push(enemy);
}

var player = new Player(playerInitialX, playerInitialY);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (isGameActive) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
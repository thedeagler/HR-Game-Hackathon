window.currentDirection = null;
window.GAME_WIDTH = 800;
window.GAME_HEIGHT = 600;
window.VELOCITY = 500;
window.score = 0;
var gameTimer = 0;

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'gameContainer');

var mainState = {
  preload: function () {
    game.stage.backgroundColor = '#666';
    game.load.image('player', 'assets/player.png');
    game.load.image('apple', 'assets/hrlogo.png');

  },
  create: function () { // Initialize
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = this.game.add.sprite(100, 245, 'player'); // x, y, entity
    game.physics.arcade.enable(this.player);
    this.player.body.velocity.y = VELOCITY;
    this.player.body.collideWorldBounds = true;
    this.apple = this.addApple();

  },
  addApple: function() {
    var apple = this.game.add.sprite(Math.floor(Math.random() * GAME_WIDTH - 25),
      Math.floor(Math.random() * GAME_HEIGHT - 25), 'apple');

    apple.scale.setTo(0.4, 0.4);
    game.physics.arcade.enable(apple);
    apple.body.immovable = true;

    return apple;
  },
  deleteApple: function() {
    this.apple.position.x = Math.floor(Math.random() * GAME_WIDTH - 25);
    this.apple.position.y = Math.floor(Math.random() * GAME_HEIGHT - 25);
  },
  collision: function() {
    // if player hits apple, deleteApple() and addApple()
    if(Math.abs(this.player.position.x - this.apple.position.x) < 30 && Math.abs(this.player.position.y - this.apple.position.y) < 30) {
      this.deleteApple();
      score++;
    }
    // this.deleteApple();
    // console.log(score);
    // // switch(currentDirection) {

    // // }
    // this.player.body.velocity.y = -VELOCITY;
  },
  update: function () {
    // Collision detection
    // this.physics.arcade.collide(this.player, this.apple, this.collision, null, this);

    this.collision();
    // every time we touch an apple, generate a new apple
    var cursors = game.input.keyboard.createCursorKeys();


    if (cursors.left.isDown && currentDirection !== 'right')
    {
        this.player.body.velocity.x = -VELOCITY;
        this.player.body.velocity.y = 0;
        currentDirection = 'left';
    }
    else if (cursors.right.isDown && currentDirection !== 'left')
    {
        this.player.body.velocity.x = VELOCITY;
        this.player.body.velocity.y = 0;
        currentDirection = 'right';

    }
    if (cursors.up.isDown && currentDirection !== 'down')
    {
        this.player.body.velocity.y = -VELOCITY;
        this.player.body.velocity.x = 0;
        currentDirection = 'up';

    }
    if (cursors.down.isDown && currentDirection !== 'up')
    {
        this.player.body.velocity.y = VELOCITY;
        this.player.body.velocity.x = 0;
        currentDirection = 'down';

    }
  }
};

game.state.add('main', mainState);
game.state.start('main');

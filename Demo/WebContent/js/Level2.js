/**
 * Level2 state.
 */
function Level2() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level2.prototype = proto;

Level2.prototype.create = function() {
	this.gameover=false;
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 0;
	this.music = this.add.sound("song",1,true);
	this.music.play();
	this.booms = this.add.audio("Explosion");
	this.booms.allowMultiple=true;
	this.jump = this.add.audio("jump");
	this.jump.allowMultiple=true;
	this.dead = this.add.audio("dead");
	this.dead.allowMultiple=true;
	this.CoinEcho = this.add.audio("CoinEcho");
	this.CoinEcho.allowMultiple=true;
	this.bg = this.game.add.sprite(0, 0, "bg");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width; 
	this.bg.height = this.game.height;
	this.game.score = 0;
	this.scoreText = this.add.text(42, 10, 'Score : '+this.game.score, { fill: 'white' });
	this.scoreText.z = 10;
	this.scoreText.fixedToCamera = true;
	this.map = this.game.add.tilemap("Lab7.6");
	this.map.addTilesetImage('tile_set');
	this.map_layer = this.map.createLayer("Tile Layer 1");
	this.map_layer.resizeWorld();
	this.map.setCollisionBetween(0, 200, true, this.map_layer);
	for (x in this.map.objects.Object) {
		var obj = this.map.objects.Object[x]; 
		if (obj.type == "Player") {
			this.player = this.addPlayer(obj.x,obj.y);
			this.game.camera.follow(this.player,Phaser.Camera.FOLLOW_PLATFORMER);
		}
		else if (obj.type == "coin") {
			this.coin = this.addCoin(obj.x,obj.y);
		}
		else if (obj.type == "boom") {
			this.Boom = this.addBoom(obj.x,obj.y);
		}
		else if (obj.type == "goal") {
			this.goal = this.addGoal(obj.x,obj.y);
		}
	}
	this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
};

Level2.prototype.addCoin = function(x, y){
	c = this.add.sprite(x, y, "coins");
	c.anchor.set(0,0.9);
	c.smoothed = false;
	this.game.physics.enable(c);
	return c;
};

Level2.prototype.addBoom = function(x, y){
	b = this.add.sprite(x, y, "Boom");
	b.anchor.set(0,0.9);
	b.smoothed = false;
	this.game.physics.enable(b);
	return b;
};

Level2.prototype.addGoal = function(x, y){
	g = this.add.sprite(x, y, "goal1");
	g.anchor.set(0,0.9);
	g.smoothed = false;
	this.game.physics.enable(g);
	return g;
};

Level2.prototype.addPlayer = function(x, y){
	s = this.add.sprite(x, y, "Sunny5");
	s.animations.add("fly");
	s.play("fly",3,true);
	s.anchor.set(0, 0.9);
	s.smoothed = false;
	this.game.physics.enable(s);
	s.body.collideWorldBounds = true;
	s.body.drag.setTo(500, 0);
	s.body.setSize(35, 45, 30, 20);
	return s;
};

Level2.prototype.update = function(){
	if(this.gameover) return;
	if(this.player == null){return;}
	
	this.game.physics.arcade.collide(this.player, this.coin);
	this.game.physics.arcade.collide(this.player, this.goal);
	this.game.physics.arcade.collide(this.player, this.Boom);
	this.game.physics.arcade.collide(this.coin, this.map_layer);
	this.game.physics.arcade.collide(this.goal, this.map_layer);
	this.game.physics.arcade.collide(this.Boom, this.map_layer);
	this.game.physics.arcade.overlap(this.player, this.coin, this.onCoinCollide,null, this);
	this.game.physics.arcade.overlap(this.player, this.goal, this.onGoalCollide,null, this);
	this.game.physics.arcade.overlap(this.player, this.Boom, this.onBoomCollide,null, this);
	this.game.physics.arcade.collide(this.player, this.map_layer, this.onCollide,null,this);
	
	if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.player.body.velocity.y = -330;
			this.player.body.velocity.x = 230;
			this.player.scale.x = 1;
			this.jump.play();
			this.game.physics.arcade.gravity.y = 1000;
	}
		this.player.body.drag.setTo(500, 0);
};

Level2.prototype.onCollide = function(){
	this.gameover =true;
	this.player.kill();
	this.dead.play();
	this.music.stop();
	this.quitGame();
};

Level2.prototype.onBoomCollide = function(){
	exp2=this.add.sprite(this.player.centerX,this.player.centerY,"explosion");      ///////Error///////
	exp2.anchor.set(0.5);
	exp2.animations.add("all",null,20,false).play().killOnComplete=true;
	this.gameover =true;
	this.player.kill();
	this.booms.play();
	this.music.stop();
	this.quitGame();
};

Level2.prototype.onCoinCollide = function(player, coin){
	coin.destroy();
	this.game.score++;
	this.scoreText.text = 'Score : '+this.game.score;
	this.CoinEcho.play();
};

Level2.prototype.onGoalCollide = function(player, goal){
	this.music.stop();
	this.game.state.start("Menu");
};

Level2.prototype.quitGame = function(){
	this.game.state.start("Level2");
};

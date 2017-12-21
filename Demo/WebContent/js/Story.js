/**
 * Story state.
 */
function Story() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Story.prototype = proto;

Story.prototype.preload = function() {
	this.load.pack("story", "assets/assets-pack.json");
};

Story.prototype.create = function() {
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"s1");
	this.sprite.anchor.set(0.5, 0.5);
	
	this.time.events.add(5000,this.showS2,this);
	
	this.input.onDown.add(this.startGame, this);
};
Story.prototype.showS2 = function() {
	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"s2");
    this.sprite.anchor.set(0.5, 0.5);	
    this.time.events.add(5000,this.showS3,this);
};

Story.prototype.showS3 = function() {
	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"s3");
    this.sprite.anchor.set(0.5, 0.5);	
    this.time.events.add(5000,this.showS4,this);
};

Story.prototype.showS4 = function() {
	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"s4");
    this.sprite.anchor.set(0.5, 0.5);	
    this.time.events.add(5000,this.showS5,this);
};

Story.prototype.showS5 = function() {
	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"s5");
    this.sprite.anchor.set(0.5, 0.5);	
    this.time.events.add(5000,this.startGame,this);
};

Story.prototype.startGame = function() {
	this.game.state.start("Level");
};
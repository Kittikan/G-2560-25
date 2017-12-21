/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	this.music = this.add.sound("menusong",1,true);
	this.music.play();
	
	this.bg = this.game.add.sprite(0, 0, "fbbg");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;  
	this.bg.height = this.game.height;
	

	var logo = this.add.sprite(this.world.centerX,20,"logo");
	logo.width=600;
	logo.anchor.set(0.5,0);
	var twn= this.add.tween(logo);
	
	
	var start = this.add.sprite(500,200,"start");
	var story = this.add.sprite(500,200+100,"story");
	var team = this.add.sprite(500,200+100*2,"team");

	start.anchor.set(0.5, 0.5);
	story.anchor.set(0.5, 0.5);
	team.anchor.set(0.5, 0.5);
	
	start.inputEnabled = true;
	story.inputEnabled = true;
	team.inputEnabled = true;
	
    start.events.onInputDown.add(this.startLevel, this);
    story.events.onInputDown.add(this.startStory, this);
    team.events.onInputDown.add(this.startTeam, this);    
};

Menu.prototype.startLevel = function(){
	this.game.state.start("Level");
	this.music.stop();
};
Menu.prototype.startStory = function(){
	this.game.state.start("Story");
	this.music.stop();
};
Menu.prototype.startTeam = function(){
	this.game.state.start("Team");
	this.music.stop();
};
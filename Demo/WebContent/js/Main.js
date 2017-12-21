window.onload = function() {
var game = new Phaser.Game(960,480, Phaser.AUTO);
// Add the States your game has.
game.state.add("Boot", Boot);
game.state.add("Menu", Menu);
game.state.add("Preload", Preload);
game.state.add("Level", Level);
game.state.add("Level2", Level2);
game.state.add("Story", Story);
game.state.add("Team", Team);
// Now start the Boot state.
game.state.start("Boot");
};

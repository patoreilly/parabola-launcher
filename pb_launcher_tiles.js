// mods by Patrick OReilly
// twitter: @pato_reilly

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('chunk', 'assets/sprites/chunk.png');
    game.load.image('aimer', 'assets/sprites/pangball.png');    
    game.load.image('ball','assets/sprites/shinyball.png');

    game.load.tilemap('map', 'assets/tilemaps/maps/ninja-tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('sky', 'assets/skies/sky2.png');
    game.load.image('kenney', 'assets/tilemaps/tiles/kenney.png');



}


var aimer;
var chunk = new Array();
var aimFlag = true;

var map;
var layer;
var tiles;

function create() {

    var sky = game.add.image(0, 0, 'sky');
    sky.fixedToCamera = true;

    map = game.add.tilemap('map');

    map.addTilesetImage('kenney');
    
    layer = map.createLayer('Tile Layer 1');

    layer.resizeWorld();





    for (var i = 1; i <= 45; i++)
    {
        chunk[i] = game.add.sprite(0, 0, 'chunk');
        
    }

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // set global gravity
    game.physics.arcade.gravity.y = 600;
    game.stage.backgroundColor = '#0072bc';

    ball = game.add.sprite(20, 580, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.anchor.setTo(0.5, 0.5);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(0.9, 0.9);
    
    
    
    aimer = game.add.sprite(100, 400, 'aimer');   
    aimer.anchor.setTo(0.5, 0.5);
    // Enable input.
    aimer.inputEnabled = true;
    aimer.input.start(0, true);
    aimer.events.onInputDown.add(shoot);
    aimer.events.onInputUp.add(reset);

    game.camera.follow(aimer);


}

function reset(aimer, pointer) {

    
    aimFlag = true;

}

function shoot() {

    aimFlag = false;

    ball.x = 20;
    ball.y = 580;
    ball.body.velocity.setTo(0,0);

    ball.body.moves = true;
    
    Xvector = V_oh * 4;
    Yvector = V_ov * -15;
    ball.body.allowGravity = true;  
    ball.body.velocity.setTo(Xvector, Yvector);
    
    

}

function update() {

    
    
    if (aimFlag == true)
    {
        //  Track the aimer sprite to the mouse  
        aimer.x = game.input.activePointer.worldX;   
        aimer.y = game.input.activePointer.worldY;

        Xpos = aimer.x;
        Ypos = 600-aimer.y;
        G = 8;

        V_ov = Math.sqrt((2*G*Ypos)/3);
        V_oh = (Xpos * G)/V_ov;

        t = V_ov/G;
        ti = parseInt(t)*6;


        for (i=1; i<=ti; i++)
        {
            trailX = V_oh*i/6;
            trailY = 3*((V_ov*i/6)-(.5*G*(i/6*i/6)));

            chunk[i].x = trailX;
            chunk[i].y = 600-trailY;

        }

        for (i= ti+1; i<=45; i++)
        {
            chunk[i].x = -20;
            chunk[i].y = -20;

        }
        
        
        // launchVelocity = analog.height;
    }   

}

function render() {

    // game.debug.text("Drag the ball and release to launch", 32, 32);

    // game.debug.bodyInfo(ball, 32, 64);

    // game.debug.spriteInfo(ball, 32, 64);
    game.debug.text("G: " + G, 32, 250);

    game.debug.text("Xpos: " + Xpos, 32, 190);
    game.debug.text("Ypos: " + Ypos, 32, 210);

   // game.debug.text("V_oh: " + V_oh, 32, 270);
    // game.debug.text("V_ov: " + V_ov, 32, 290);
    // game.debug.text("trailX: " + trailX, 32, 310);
    // game.debug.text("trailY: " + trailY, 32, 330);
    // game.debug.text("t: " + t, 32, 350);




}

var backgroundGame;
var flappy;
var tubes;
var spaceBar;
var timer;
var theGame = {
    preload: function(){
        game.load.image('background', 'img/bg.jpeg');
        game.load.spritesheet('birds', 'img/pajaro.png', 43, 30);
        game.load.image('tube', 'img/tube.png');
        game.forceSingleUpdate = true;
    },
    create: function(){
        backgroundGame = game.add.tileSprite(0, 0, 370, 550, 'background');
        flappy = game.add.sprite(100, 250, 'birds');
        tubes = game.add.group();
        tubes.enableBody = true;
        tubes.createMultiple('20', 'tube');
        flappy.animations.add('fly', [1, 0, 2], 4, true);
        game.physics.startSystem(Phaser.Physics.ARCADE); // Fisicas
        game.physics.arcade.enable(flappy);
        flappy.body.gravity.y = 1200;
        flappy.anchor.setTo(0, 0.5);
        spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceBar.onDown.add(this.jump, this);
        timer = game.time.events.loop(1500, this.tubesWorld, this);
    },
    
    update: function(){
        if (flappy.inWorld == false){
            //alert("Muerto :(");
        }else if (flappy.position.y > 480){
            //alert("Muerto :(");
        }else{
            backgroundGame.tilePosition.x -= 1;
            flappy.animations.play('fly');
        }
        
        if (flappy.angle < 20){
            flappy.angle += 1;
        }
    },
    
    jump: function(){
        flappy.body.velocity.y = -350;
        game.add.tween(flappy).to({angle: -20}, 100).start();
    },
    
    tubesWorld: function(){
        var spaceRange = Math.floor(Math.random()*5) + 1;
        for (var i = 0; i < 8 ; i++){
            if (i != spaceRange && i != spaceRange + 1){
                this.createTube(370, i * 55 + 20);
            }
        }
    },
    
    createTube: function(x, y){
        var tube = tubes.getFirstDead();
        tube.reset(x, y);
        tube.body.velocity.x = -180;
        tube.checkWorldBounds = true;
        tube.outOfBoundsKill = true;
    }
};
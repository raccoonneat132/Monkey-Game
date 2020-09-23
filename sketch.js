var PLAY = 1
var END = 0
var gameState = PLAY

var monkey , monkey_running
var ground, ground2
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalScore = 0;
var bananaScore


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(100,317,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x = ground.width/2;
  ground2 = createSprite(600,350,800,10);
  ground2.x = ground2.width/2;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  survivalScore = 0;
  bananaScore = 0;
  
  monkey.debug = true;
}


function draw() {
  background(180);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:"+survivalScore, 240, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Bananas:"+bananaScore, 240, 100);
  
  
 if(gameState === PLAY){
    ground.velocityX = -4;
   
   spawnFood();
   spawnObstacle();
   
   survivalScore = Math.ceil(frameCount/frameRate());
  
     if (ground.x < 0){
        ground.x = ground.width/2;
      }
  
     if (ground2.x < 0){
        ground2.x = ground2.width/2;
    }
    
      if(keyDown("space")&& monkey.y >= 310 ) {
        monkey.velocityY = -17;
      }
    
    monkey.velocityY = monkey.velocityY + 0.8;
   
     if(FoodGroup.isTouching(monkey)){
       FoodGroup.destroyEach();
       bananaScore = bananaScore + 1;
     }
     
     if(obstacleGroup.isTouching(monkey)){
       gameState = END; 
     }
     
     
   
     
}
  else if(gameState === END){
       FoodGroup.destroyEach();
       obstacleGroup.destroyEach();
       monkey.visible = false;
       ground.visible = false;
       ground2.visible = false;
    
       stroke("black");
       textSize(20);
       fill("black");
       text("GAME OVER, Press R to restart", 170,300);
    
       if(gameState === END && keyDown("r")){
       reset();
     }  
   }
  
  monkey.collide(ground);
  monkey.collide(ground2);
  
  
  
  drawSprites();
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -7;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 80 === 0) {
    obstacle = createSprite(600,320,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -7;
    
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  survivalScore = 0;
  bananaScore = 0;
  monkey.visible = true;
  ground.visible = true;
  ground2.visible = true;
  
}












var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score= 0;
var Edges;
var play= 1;
var over= 2;
var gameState= play;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restartImage = loadImage("restart.jpg");
 
}



function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(100, 500, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale= 0.2
  
  obstacleGroup= new Group();
  
  FoodGroup= new Group();
  
  restart = createSprite(300, 300, 10, 10);
  restart.scale= 0.5
  restart.visible= false;
  
  Edges= createEdgeSprites();
  
}



function draw() {
background("orange");
  text("Survival Time : "+score, 500, 50);
  

  
  monkey.collide(Edges[3]);
  
  restart.visible= false;
  
  if(gameState === play) {
    spawnObstacles();
    
    spawnbananas();

      if(keyDown("space") && monkey.y>= 535) {
     monkey.velocityY= -20;
     
     }
   
  monkey.velocityY= monkey.velocityY+1;
    
      if(monkey.isTouching(FoodGroup)) {
        score= score+1;
        FoodGroup.destroyEach();
      }
    
    if(monkey.isTouching(obstacleGroup)) {
      
      gameState= over;
    }
    
  }else if(gameState === over) {
    obstacleGroup.destroyEach();
    restart.visible= true;
    restart.addImage(restartImage);
    FoodGroup.destroyEach();     
    
    
    if(mousePressedOver(restart)) {
     reset();
     }
    
  }
  
  drawSprites();
}

function reset() {
  score= 0;
  gameState= play;
}

function spawnObstacles() {
  if(frameCount % 150 === 0){
  stones = createSprite(550, 550, 10, 10);
  stones.velocityX= -8;
  stones.scale= 0.1;  
  stones.addImage(obstacleImage);
  stones.lifetime= 310;
  obstacleGroup.add(stones);  
  }
}

function spawnbananas() {
  if(frameCount % 60 === 0) {
  banana = createSprite(550,Math.round(random(300, 400), 10, 10));
  banana.velocityX= -5;
  banana.addImage(bananaImage);
  banana.scale= 0.1;
  banana.lifetime= 310;
  FoodGroup.add(banana);
  }
}

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score=0;
var survivalTime=0;
var bg,backgroundImage;

var START=1;
var PLAY=2;
var END=0;
var gameState=PLAY;
var restart,restartImage;
var gameOver,gameOverImage;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
             
  restartImage=loadImage("restart.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage=loadImage("gameOver.png")
 backgroundImage=loadImage("background.jpeg")
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bg=createSprite(width/2,height/2);
  bg.addImage("moving",backgroundImage);
  bg.scale=1.2;
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1
  
  
  ground=createSprite(400,height-20,width*2,10);
  ground.velocityX=-4;
  ground.x=ground.width/2; 
  console.log(ground.x)  

  
  gameOver=createSprite(width/2,height-250,10,10)
  gameOver.addImage(gameOverImage);
  gameOver.scale=1.5;
  gameOver.visible=false;
  
  
  
  restart=createSprite(width-295,height-150,10,10);
  restart.addImage(restartImage);
  restart.scale=0.3;
  restart.visible=false;
  
foodGroup=new Group();
obsGroup=new Group();
  
}


function draw() {
  background("white");
  
  if (gameState===PLAY){
   
    
   ground.velocityX=-(4+score/10);
    
    if(keyDown("space")&&monkey.y>320)
    {monkey.velocityY=-11;
   }
     
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
monkey.velocityY=monkey.velocityY+0.8;
    
     if(monkey.isTouching(foodGroup))
    {
      foodGroup.destroyEach();
      score=score+5;
      
    }
    if(monkey.isTouching(obsGroup))
    {
    obsGroup.destroyEach();
    }
    
   stroke("black");
  textSize(20);
  fill("blue");
    textFont("Times of new Roman")
  survivalTime+=Math.round(getFrameRate()/60)
  text("SurvivalTime: "+survivalTime,100,50);
    
    food();
    obstacles();
    monkey.collide(ground);
    
  }
  
  
  if (gameState===END){
    
    if(monkey.isTouching(obstaclesGroup || foodGroup )){
  gameState === END;
 }
    
    ground.velocityX=0
    foodGroup.setVelocityEach(0);
    foodGroup.destroyEach();
    orangeGroup.setVelocityEach(0);
    orangeGroup.destroyEach();
    obsGroup.setVelocityEach(0);
    obsGroup.destroyEach();
    
     restart.visible=true;
    gameOver.visible=true;
    
    
    if(mousePressedOver(restart))
  {
    reset();
  }
  monkey.collide(ground);
  }

  
 
    
 


  drawSprites() 
  
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+score,500,50);
  
}

function reset(){
  gameState=PLAY;
  score=0;
  chances=3;
  survivalTime=10;
  gameOver.visible=false;
  restart.visible=false;
}

function food()
{
  if(frameCount%125===0)
  {
    banana=createSprite(600,100,10,10);
    banana.y=Math.round(random(height-300,height-200));
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.scale=0.1;
    banana.lifetime=width/4;
    foodGroup.add(banana);
  }}

function obstacles()
{
  if(frameCount%120===0)
  {
  obstacle=createSprite(width,height-50,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
  obstacle.velocityX=-4;
  obstacle.lifetime=width/4;
  obsGroup.add(obstacle);
  }
}



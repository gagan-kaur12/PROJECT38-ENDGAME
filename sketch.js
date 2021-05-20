var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;
var banana;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  backgr=createSprite(0,0,windowWidth,windowHeight);
  backgr.addImage(backImage);
  backgr.scale=1.69;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
 
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,displayWidth-20,10);
 // ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
 // console.log(ground.x)
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  // player.velocityX=1;
  if(backgr.x<275){
    backgr.x=backgr.width/2;

    
  } 
  console.log(backgr.x);
  camera.position.x = windowWidth/4;
  camera.position.y = windowHeight/2;
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    if(obstaclesGroup.isTouching(player)){ 
      obstaclesGroup.destroyEach();
      player.scale =0.08;
      player.velocityX =0;
     score = score-1;
  }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
   
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
   
    player.collide(ground);
    spawnFood();
    spawnObstacles();
   
    if(score=== -5){
      backgr.velocityX = 0;
      
      FoodGroup.setVelocityEach(0);
      obstaclesGroup.setVelocityEach(0);

      
      FoodGroup.setLifetimeEach(-1);
      obstaclesGroup.setLifetimeEach(-1);
 
      
    }
    if(score=== 10){
      backgr.velocityX = 0;
      
      FoodGroup.setVelocityEach(0);
      obstaclesGroup.setVelocityEach(0);

      
      FoodGroup.setLifetimeEach(-1);
      obstaclesGroup.setLifetimeEach(-1);   
      
    }
  
  
  drawSprites();
  
  stroke("white");
  textSize(30);
  fill("red");
  text("Score: "+ score, 200,80);
  console.log("score =" +score);

  if(score=== -5){
    textSize(70);
    strokeWeight(8);
    text("GAME END",400,400)
  }
  if(score=== 10){
    textSize(70);
    strokeWeight(8);
    text("YOU WIN",400,400)
  }
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 200 === 0) {
     banana = createSprite(windowWidth,random(100,145),40,10);
    
    console.log(camera. position.x);
  
    banana.addImage(bananaImage);
    banana.scale = 0.05;
     banana.velocityX = -15;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
}
}

function spawnObstacles() {
  if(frameCount % 230 === 0) {
    var obstacle = createSprite(windowWidth,350,10,40);
    obstacle.velocityX = -8;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = random(0.008,0.2);
    obstacle.lifetime = 330;
    obstacle.depth = banana.depth;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  

var path,boy,apples,orange,bananas,watermelons,bomb;
var pathImg,boyImg,appleImg,orangeImg,bananaImg,watermelonImg, bombImg;
var shoppingCart = 0;
var appleG,orangeG,bananaG,watermelonGroup,bombGroup;
var gameOver, gameOverImg;
var boyStanding;
var shoppingBag, shoppingBagImg;
var message, messageImg;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  appleImg = loadImage("apple.png");
  orangeImg = loadImage("orange.png");
  bananaImg = loadImage("banana.png");
  watermelonImg = loadImage("watermelon.png");
  bombImg = loadImage("bomb.png");
  shoppingBagImg = loadImage("shoppingbag.png");
  messageImg = loadImage("bagisfull.png");


  boyStanding = loadAnimation("Runner-1.png");
  
  
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
// Moving background
path=createSprite(width-750, 200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale = 2.5;


//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("BoyStanding", boyStanding);
boy.scale=0.25;

shoppingBag = createSprite(width - 70, 70);
shoppingBag.addImage(shoppingBagImg);
shoppingBag.scale = 0.25;

message = createSprite(width/2, height/2);
message.addImage(messageImg);
message.scale = 1.5;  


  
  
appleG=new Group();
orangeG=new Group();
bananaG=new Group();
watermelonGroup=new Group();
bombG=new Group();

}


function draw() {
  background("gray");
  
  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;

  message.visible = false;

  if(shoppingCart > 0 && shoppingCart % 100 === 0 ){
    shoppingBag.scale+= 0.0001;  
  }
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }

  

  



    createapple();
    createorange();
    createbanana();
    createwatermelon();
    createbomb();

    if (appleG.isTouching(boy)) {
      appleG.destroyEach();
      shoppingCart=shoppingCart+50;
    }
    else if (orangeG.isTouching(boy)) {
      orangeG.destroyEach();
      shoppingCart=shoppingCart+100;
      
    }else if(bananaG.isTouching(boy)) {
      bananaG.destroyEach();
      shoppingCart= shoppingCart + 50;   
      
    }else if(watermelonGroup.isTouching(boy)) {
        watermelonGroup.destroyEach();
        shoppingCart = shoppingCart + 100;
    }     
    
      if(bombG.isTouching(boy) || shoppingCart > 500) {
        if (shoppingCart > 500){
          textSize(30);
          fill("white");
          text("The shopping bag is full!", width/2, height/2);     
          message.visible = true;   
        }
          bombG.destroyEach();
          shoppingCart = 0;
          
          gameState=END;


        boy.changeAnimation("BoyStanding",boyStanding); 

        appleG.destroyEach();
        orangeG.destroyEach();
        bananaG.destroyEach();
        watermelonGroup.destroyEach();
        bombG.destroyEach();
        shoppingBag.destroy();
        
        appleG.setVelocityYEach(0);
        orangeG.setVelocityYEach(0);
        bananaG.setVelocityYEach(0);
        watermelonGroup.setVelocityYEach(0);
        bombG.setVelocityEach(0);
        path.velocityY = 0;

        

        




    
             
    }
  }
  drawSprites();
  textSize(30);
  fill(255);
  text("Shopping Cart: "+ shoppingCart,10,30);
  }



function createapple() {
  if (World.frameCount % 200 == 0) {
  var apple = createSprite(Math.round(random(50, 1000),40, 10, 10));
  apple.addImage(appleImg);
  apple.scale=0.25;
  apple.velocityY = 8;
  apple.lifetime = 150;
  appleG.add(apple);
  }
}

function createorange() {
  if (World.frameCount % 320 == 0) {
  var orange = createSprite(Math.round(random(50, 1000),40, 10, 10));
  orange.addImage(orangeImg);
  orange.scale=0.4;
  orange.velocityY = 12;
  orange.lifetime = 150;
  orangeG.add(orange);
}
}

function createbanana() {
  if (World.frameCount % 410 == 0) {
  var banana = createSprite(Math.round(random(50, 1000),40, 10, 10));
  banana.addImage(bananaImg);
  banana.scale=0.3;
  banana.velocityY = 11;
  banana.lifetime = 150;
  bananaG.add(banana);
  }
}

function createwatermelon(){
  if (World.frameCount % 530 == 0) {
  var watermelon = createSprite(Math.round(random(50, 1000),40, 10, 10));
  watermelon.addImage(watermelonImg);
  watermelon.scale=0.25;
  watermelon.velocityY = 15;
  watermelon.lifetime = 150;
  watermelonGroup.add(watermelon);
  }
}

function createbomb(){
    if (World.frameCount % 530 == 0){
    var bomb = createSprite(Math.round(random(50,1000),40, 10, 10));
    bomb.addImage(bombImg);
    bomb.scale = 1.1;
    bomb.velocityY = 20;
    bomb.lifetime = 150;
    bombG.add(bomb);
    bomb.debug = false;
    bomb.setCollider("circle", 0, 5, 100);
    }
}


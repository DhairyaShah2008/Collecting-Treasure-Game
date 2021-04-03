var path,boy,cash,diamonds,jwellery,sword;
var pathImg,pathImg1,pathImg2
var boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordG;
var Restart,RestartImg
var Coin
var OverSound

//Game States

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  pathImg1 = loadImage("Road.png");
  pathImg2= loadImage("Road.png");
  boyImg= loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg=loadAnimation("gameOver.png");
  RestartImg=loadImage("Restart.png")
  Coin=loadSound("Coin.Mp3")
  OverSound=loadSound("GameOverSound.Mp3")
}

function setup(){
  
  createCanvas(1000,1000);
// Moving background
path=createSprite(500,500);
path.addImage(pathImg);
path.velocityY = 10;
   


//creating boy running
boy= createSprite(500,900,20,20);
boy.addAnimation("SahilRunning",boyImg);

boy.scale=0.08;
boy.debug=true
boy.setCollider('circle',0,0,500)  
  
gameOver=createSprite(500,450,30,30)
gameOver.scale=1
Restart=createSprite(500,500,20,20)
Restart.visible=false

    
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordG=new Group();

}


function draw(){
 background('white')
 
  //gameOver.visible=false
  

  
  if(gameState===PLAY){
    OverSound.stop()
    swordG.setVelocityYEach(10)
    cashG.setVelocityYEach(10)
    diamondsG.setVelocityYEach(10)
    jwelleryG.setVelocityYEach(10)

    gameOver.visible=false
    
    
 
  boy.x = World.mouseX;
    boy.y = World.mouseY;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 1000 ){
    path.y = height/2;
  }
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    
    if (cashG.isTouching(boy)) {
      
   cashG.destroyEach()
      treasureCollection=treasureCollection+50;
      Coin.play()
    
    }
    else if (diamondsG.isTouching(boy)) {
           
   diamondsG.destroyEach()
treasureCollection=treasureCollection+50;
Coin.play()
    }
    else if(jwelleryG.isTouching(boy)) {
      
   jwelleryG.destroyEach()
treasureCollection=treasureCollection+50;
     Coin.play()
      
    }
    else if(swordG.isTouching(boy)) {
      swordG.destroyEach()
      OverSound.play()
          sword.velocityY=0  
   sword.rotate=0
      sword.rotationSpeed=0
gameState=END
    diamondsG.setVelocityYEach(0)
      diamondsG.setLifetimeEach(-1)
cashG.setVelocityYEach(0)
      cashG.setLifetimeEach(-1)
jwelleryG.setVelocityYEach(0)
      jwelleryG.setLifetimeEach(-1)
swordG.setVelocityYEach(0)
      swordG.setLifetimeEach(-1)
      
    
    }
    
  }
        
          if(gameState===END){  
            

            
Restart.visible=true
Restart.addImage(RestartImg)
Restart.scale=1
  
            
            
gameOver.visible=true
            
            gameOver.addAnimation("gameOver",endImg);
  treasureCollection=0;
            
            path.velocityY=0
          }
    if(keyWentDown("r")){
      boy.changeAnimation("SahilRunning",boyImg)
gameOver.visible=false
      Restart.visible=false
      
      
  gameState=PLAY
        }
    
    

    console.log(gameState)

  
    

  
    

  
  drawSprites();
      textSize(100);
  fill('bLUE');
  text("Treasure: "+treasureCollection,330,100);
    

  



}


function createCash() {
  if (World.frameCount % 10 == 0) {
  var cash = createSprite(Math.round(random(50, 900),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
    
  cash.velocityY = 10;
  cash.lifetime = 150;
  cashG.add(cash);
    cash.debug=true

  }
}

function createDiamonds() {
  if (World.frameCount % 20 == 0) {
  var diamonds = createSprite(Math.round(random(50, 900),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 10;
    
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
    diamonds.debug=true

}
}

function createJwellery() {
  if (World.frameCount % 30 == 0) {
  var jwellery = createSprite(Math.round(random(50, 900),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 10;
    
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
    jwellery.debug=true

  }
  
}

function createSword(){
  if (World.frameCount % 25 == 0) {
  sword = createSprite(Math.round(random(50, 900),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.4;
  sword.velocityY =10;
  sword.lifetime = 150;
    
    sword.shapeColor="blue";

  swordG.add(sword);
    sword.debug=true
    sword.rotate=100
sword.rotationSpeed = 10;

  }
  
  
  // if (World.frameCount % 210 == 0) {
  //var sword = createSprite(Math.round(random(50, 900),40, 10, 10));
  //sword.addImage(swordImg);
  //sword.scale=0.4;
  //sword.velocityY =30;
  //sword.lifetime = 150;
  //swordGroup.add(sword);
  //}
}
var trex;
var piso;
var trex,trex_running;
var piso,pisoImage;
var pisoInvisible;
var nubeImage;
var azar;
var score=0;
var grupocactus;
var gruponube;
var gemeOverImage;
var restartImage;
var collided_png;
var salto
var checkpoint
var die 

const PLAY=0
const END=1
const PAUSE=2
var gameState=PLAY;  

function preload(){
salto = loadSound("jump.mp3") 
checkpoint = loadSound("checkpoint.mp3")
die = loadSound("die.mp3")
collided_png=loadAnimation("trex_collided.png")
restartImage=loadImage("restart.png")
gemeOverImage=loadImage("gameOver.png")
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
pisoImage=loadImage("ground2.png");
nubeImage=loadImage("cloud.png");
cactus1=loadImage("obstacle1.png")
cactus2=loadImage("obstacle2.png")
cactus3=loadImage("obstacle3.png")
cactus4=loadImage("obstacle4.png")
cactus5=loadImage("obstacle5.png")
cactus6=loadImage("obstacle6.png")
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  gameOver = createSprite(width/2, height/2);
gameOver.addImage(gemeOverImage)
gameOver.scale=0.6
restart = createSprite(width/2, height/2 +40);
restart.addImage(restartImage)
restart.scale=0.5
  grupocactus= new Group();
  gruponube= new Group();
  console.warn("cuidado")
  trex = createSprite(50,height-20,20,50);
    trex.addAnimation("running",trex_running);
    trex.addAnimation("collided",collided_png);
    trex.scale=0.5;

    piso = createSprite(200,height-20,400,20);
      piso.addImage(pisoImage); 
      
      pisoInvisible=createSprite(200,height-10,400,10)
      pisoInvisible.shapeColor="white"
      pisoInvisible.visible=false
      trex.setCollider("circle",0,0,40)
      
      



azar=round(random(1,100))
}  
  
function draw(){
  background("white")
    if(gameState === PLAY ){
      if (Math.round(score)>0 && Math.round(score)%100==0) {
        checkpoint.play();
      }
      gameOver.visible=false
      restart.visible=false
    text(("puntos:") + Math.round(score),width-100, 50 );
    score=score+0.1;
    if((keyDown("space") || touches.lenght>0) && trex.y>=height-40 ){
      salto.play();
      trex.velocityY=-10;  
      touches=[];
      
    }
    if(piso.x<0){
      piso.x=piso.width/2;
    }  
    trex.velocityY=trex.velocityY+0.8;
    createNubes();
    createCactus();
    if(grupocactus.isTouching(trex)){
      die.play();
      gameState=END; 
    }
    piso.velocityX=-2;
  }else if(gameState === END){
    trex.changeAnimation("collided" , collided_png)
    if(mousePressedOver(restart) || touches.lenght>0){
      reset();
      gameState=PLAY;
      console.log("reinicio");
    }
    trex.velocityY = 0;
    grupocactus.setLifetimeEach(-1);
    gruponube.setLifetimeEach(-1);
    grupocactus.setVelocityXEach(0);
    gruponube.setVelocityXEach(0);
    piso.velocityX=-0;
    restart.visible=true
    gameOver.visible=true
    
    }
  console.info(piso.depth);

drawSprites();
text(mouseX+","+mouseY,mouseX,mouseY);



trex.collide(pisoInvisible);  


 
 

} 
function reset(){
  gameState=PLAY;
  score=0;
  grupocactus.destroyEach();
  trex.changeAnimation("running",trex_running);
}
function createNubes(){
var frecuencia=Math.round(random(10,80));
var velocidad=Math.round(random(-2,-4));
var tamano=(random(0.5,1));
if(frameCount % frecuencia === 0){
var nube = createSprite(width,100,40,10)
nube.y = Math.round(random(10,height-100))
nube.velocityX=velocidad
nube.addImage(nubeImage);
nube.scale=tamano
nube.lifetime=325;
}

}
function createCactus(){
  var imagenAzar=Math.round(random(1,6));
  if(frameCount % 75 === 0){
      var cactus=createSprite(width,height-35,10,40);
      cactus.velocityX=-6
      cactus.lifetime=325;
      switch(imagenAzar){
        case 1: cactus.addImage(cactus1)
          cactus.scale=0.5
              break;
        case 2: cactus.addImage(cactus2)
          cactus.scale=0.5
              break;
        case 3: cactus.addImage(cactus3)
          cactus.scale=0.5
              break;
        case 4: cactus.addImage(cactus4)
                cactus.scale=0.5
              break;
        case 5: cactus.addImage(cactus5)
                cactus.scale=0.5
              break;
        case 6: cactus.addImage(cactus6)
                cactus.scale=0.5
                  break;
      }
      grupocactus.add(cactus);
      gruponube.add(cactus);
  }
} 
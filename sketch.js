var ground;
var ninja,ninjaImage,badNinja,BNImage;
var bg,bgImage;
var ninjaStar,NSImage;
var rock,rockImage;
var med, medimage;
var num=0;
var score = 0;
var kills = 0;
var life = 3;


function preload()
{
ninjaImage = loadImage("ninja.png");
BNImage = loadImage("badman.png")
NSImage = loadImage("ninjaStar.png")
bgImage = loadImage("background.png");
rockImage = loadImage("rock.png");
medImage = loadImage("medkit.png")
}

function setup() {
 createCanvas(600, 400);
  bg= createSprite(400,100)
  bg.addImage("bg",bgImage)
  bg.scale= 1.2
  bg.velocityX=-(5+score/100)
  
  ninja = createSprite(50,340,50,50);
  ninja.addImage("i",ninjaImage);
  ninja.scale=0.4
  
  ground = createSprite(300,340,600,10);
  starGroup= new Group();
  BNGRP = new Group();
  rockgroup = new Group();
  medgroup = new Group();
}

function draw() {
 background("white")
 
  ninja.velocityY = ninja.velocityY+0.5;
  ninja.collide(ground)
  
  if(keyDown("up") && ninja.y>295)
  {
    ninja.velocityY= -9.2;
  }
  if(bg.x<150)
  {
    bg.x=300
  }
  
  if(keyWentDown("space")&&num===0)
  {
    ofninjaStar();
  }
  //console.log(ninja.y)
  ground.visible= false
  
   ofbadman();
   ROCKS();
   medspawn()
   if(starGroup.isTouching(BNGRP))
   {
    BNGRP.destroyEach();
    starGroup.destroyEach()
    score+=10
    kills +=1;
   }
  if (BNGRP.isTouching(ninja)||rockgroup.isTouching(ninja))
    {
    life -= 1;
    if(BNGRP.isTouching(ninja))
    {
    BNGRP.destroyEach();
    }
    if(rockgroup.isTouching(ninja))
    {
    rockgroup.destroyEach();
    }
  }
  if(medgroup.isTouching(ninja))
  {
    life+=1;
    medgroup.destroyEach();
  }
 if (life===0)
  {   
    ninja.velocityY=0;
    BNGRP.setVelocityXEach(0);
    BNGRP.setLifetimeEach(-1);
    rockgroup.setVelocityXEach(0);
    medgroup.setVelocityXEach(0);
    bg.velocityX=0;
    num=1
  }
  
  if(frameCount%30===0&&num===0)
  {
    score+= 1
  }
    
  drawSprites();
  
   if (life===0)
  {
    text("GAME OVER", 185,150,textSize(40),stroke("black"),fill("yellow")) 
     text("Your score was "+ score+" and kills were "+kills,170,210,textSize(18),fill("cyan"))
  }
  
  text ("Score: "+score,500,20,textSize(15),stroke("black"),fill("black"));
  text("Kills: "+kills,23,20 , fill ("red"))
  text("lives "+life,23,40 , fill ("red"))
}

function ofninjaStar()
{
  ninjaStar = createSprite(60,ninja.y,10,10)
  ninjaStar.addImage("ns",NSImage)
  ninjaStar.scale= 0.05
  ninjaStar.velocityX= 20;
  ninjaStar.lifetime= 30;
  //ninjaStar.debug= true;
  starGroup.add(ninjaStar);
}
function ofbadman()
{
  
  if(frameCount%160===0)
  {
    var rand = Math.round(random(-25,-10))
    
    badNinja = createSprite(670,300,10,10);
    badNinja.addImage("bn",BNImage);
    badNinja.scale=0.7
    badNinja.velocityX= rand;
    badNinja.lifetime= 50
    //badNinja.debug= true
    badNinja.setCollider("rectangle",10,0,100,100)
    BNGRP.add(badNinja);
  }
}

function ROCKS(){
  if(frameCount%95===0)
  {
    rock = createSprite (625,320)
    rock.addImage("rock",rockImage)
    rock.scale=0.2
    rock.velocityX = -(5+score/100)
   //rock.debug= true
    rock.setCollider("circle",0,0,100)
    rockgroup.add(rock)
  }
}

function medspawn(){

  if(frameCount%400===0)
  {
    med = createSprite (625,320)
    med.addImage("med",medImage)
    med.scale=0.17
    med.velocityX = -5
   //rock.debug= true
    med.setCollider("circle",0,0,100)
    medgroup.add(med)
  }
}
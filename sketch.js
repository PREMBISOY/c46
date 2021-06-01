const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var armyGroup;
var armySet = 1;
var edges;
var player;
var laserkGroup;
var laseraGroup;
var laserA_img;
var keith_life = 100000; 
var gameState = 'PLAY';
var sheild; 
var sheildActivated = false;
var time = 0;
var sheildRecovery = false;






function preload(){

  
  laserA_img = loadImage('images/glara_lasers.png');
  
}




function setup() {
  createCanvas(displayWidth-100,displayHeight);
  

armyGroup = new Group();
laserkGroup = new Group();
laseraGroup = new Group();

player = new Keith(displayWidth/2,displayHeight/2);



engine = Engine.create();
world = engine.world;
}
  
function draw() {
  background('black');
  edges = createEdgeSprites();
  camera.position.x = player.body.x;
  camera.position.y = player.body.y;

  edges[0].visible = false;
  edges[1].visible = false;
  edges[2].visible = false;
  edges[3].visible = false;

switch(armySet)
{
  case 1 :for(var i = 0;i<2;i++)
         {
          armyGroup.add(new Army(random(100,displayWidth-100),50).body);
         armySet = 'set1';
         }
         break;
 case 2 :for(var i = 0;i<2;i++)
        {
         armyGroup.add(new Army(random(100,displayWidth-100),-100).body);
         armySet = 'set2';
         }
         break; 
 case 3 :for(var i = 0;i<2;i++)
        {
         armyGroup.add(new Army(random(100,displayWidth-100),-200).body);
         armySet = 'set3';
         }
         break; 
 case 4 :for(var i = 0;i<2;i++)
        {
         armyGroup.add(new Army(random(100,displayWidth-100),-300).body);
         armySet = 'set4';
         }
         break; 
 case 5 :for(var i = 0;i<2;i++)
         {
          armyGroup.add(new Army(random(100,displayWidth-100),-300).body);
          armySet = 'set4';
          }
          break;
 case 6 :for(var i = 0;i<2;i++)
        {
         armyGroup.add(new Army(random(100,displayWidth-100),-300).body);
         armySet = 'set4';
         }
         break; 

 case 7 :for(var i = 0;i<2;i++)
        {
         armyGroup.add(new Army(random(100,displayWidth-100),-300).body);
         armySet = 'set4';
         }
         break; 

 case 8 :for(var i = 0;i<2;i++)
        {
         armyGroup.add(new Army(random(100,displayWidth-100),-300).body);
         armySet = 'set4';
         }
         break; 

         

}
armyDestruction();
player.keithActivity();
armyDuty();
keithDestruction();
shieldActivation()
//console.log(armyGroup[5]);
  drawSprites();
  stroke('white');
  strokeWeight(2);
  fill('red');
textSize(22);
  text('LIFE = '+ keith_life,width-200,player.body.y+300);
}

function armyDuty(){

for(var j = 0; j<armyGroup.length && armyGroup.length>0 ; j++)
{
//armyGroup[j].armyActivity();
//console.log(armyGroup[j]);
armyGroup[j].bounceOff(edges);
// console.log(frameCount);
if(frameCount%60 === 0){
  var laserA = createSprite(395,200,5,50);
  console.log('armyActiveted');
  laserA.x = armyGroup[j].x;
  laserA.y = armyGroup[j].y;
  laserA.velocityY = 5;
  laserA.lifetime = 90; 
  laserA.scale = 0.03;
  laserA.addImage('laserA_img',laserA_img);  
  laseraGroup.add(laserA);
}

}

}

function armyDestruction(){

for(var i=0;i<armyGroup.length && laserkGroup.length>0; i++){
  if(armyGroup[i].isTouching(laserkGroup))
  {
    armyGroup[i].destroy();

    if(armyGroup.length === 0 && armySet === 'set1')
    {
    armySet = 2;
     } 

     if(armyGroup.length === 0 && armySet === 'set2')
    {
    armySet = 3;
     } 

     if(armyGroup.length === 0 && armySet === 'set3')
    {
    armySet = 4;
     } 

     if(armyGroup.length === 0 && armySet === 'set4')
     {
     armySet = 5;
      } 
      if(armyGroup.length === 0 && armySet === 'set5')
     {
     armySet = 6;
      }

      if(armyGroup.length === 0 && armySet === 'set6')
     {
     armySet = 7;
      } 

      if(armyGroup.length === 0 && armySet === 'set7')
     {
     armySet = 8;
      } 


  }
}



}


function keithDestruction(){

  for(var i=0;i<laseraGroup.length && laseraGroup.length>0; i++){
    if(laseraGroup[i].isTouching(player.body))
    {
      laseraGroup[i].destroy();
      keith_life  = keith_life - 1;
  
      
  
    }
    if(keith_life === 0)
    {
      player.body.destroy();
      gameState = 'END';
    }
   

  }
  
  
  
  }

  function shieldActivation(){
    var currentTime;
    if(keyDown('shift') && keyDown('s') && sheildActivated === false){
      time = 0;
    sheild = new Sheild(player.body.x,player.body.y);
    sheildActivated = true;
      
      
  }
  if(sheild && sheildActivated === true){
    console.log(time);
    sheild.sheildActivity();
   // sheildRecovery = false;
  }else{
    //sheildActivated = false;
    sheildRecovery = true;
    currentTime = second();
  }

if(sheildRecovery === true){
  
  time = second();
  text('SheildRecovering '+ time,width-200,player.body.y+350);
  if(time === 59){
    sheildActivated = false;
    sheildRecovery = false;
  }
 }
}
  
  
  
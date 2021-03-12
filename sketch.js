var balloon;
var read,database;
function preload(){
  bgImage=loadImage("Images/Background.png");
  balloonFlying=loadAnimation("Images/Hot Air Ballon-02.png","Images/Hot Air Ballon-03.png","Images/Hot Air Ballon-04.png")
}
function setup(){
    database=firebase.database();

    createCanvas(1000,1000);
    balloon = createSprite(500,500,10,10);
    balloon.shapeColor = "red";
    balloon.addAnimation("flying",balloonFlying);
    balloon.size=0.05;
    var balloonpos=database.ref('balloon/position');
    balloonpos.on("value",readPosition);
}

function draw(){
    background(bgImage);
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
        balloon.scale=balloon.scale-0.01;
        balloon.velocityY=-3;
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('balloon/position').set({
       'x': read.x + x,
        'y' :read.y + y,
    })
   
}
function readPosition(data){
    read=data.val();
    balloon.x=read.x;
    balloon.y=read.y;

}
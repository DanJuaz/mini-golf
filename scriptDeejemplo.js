var context = document.getElementById("canvas").getContext("2d");
var context2 = document.getElementById("canvas2").getContext("2d");

var startImg = new Image();   
startImg.src = "images/start.png"; //Images credits: http://www.clker.com/clipart-2849.html and http://www.clker.com/clipart-2850.html
var ball = new Image();
ball.src = "./assets/img/ball.png";

var ballPosition = [];
var holePosition = [];
var boundariesPosition = [];
var sandPosition = [];
var waterPosition = [];
var wallPosition = [];
var arraySize1 = 2;
var arraySize2 = 4;

// Inization biArray
for (var i = 0; i <= 4 ; i++) {
    ballPosition[i] = new Array(arraySize1);
    holePosition[i] = new Array(arraySize1);
}

for (var i = 0; i <= 4; i++) {
    boundariesPosition[i] = new Array(arraySize2);
    sandPosition[i] = new Array(arraySize2);
    waterPosition[i] = new Array(arraySize2);
    wallPosition[i] = new Array(arraySize2);
}

// Nvl             =     1
ballPosition       = [[130,200]];
holePosition       = [[270,200]];
boundariesPosition = [[80,80,80,80]];
sandPosition       = [[0,0,0,0]];
waterPosition      = [[0,0,0,0]];
wallPosition       = [[180,180,40,40]];

//Nvl
var nvl = 0

//Ball
var ballInitialX, ballInitialY;
var width, height = 10;

var strike = 0;

//Mouse
var mouseX, mouseY;

//Hole
var holeX, holeY;
var holeRadius = 5;

//Boundary
var boundaryUpSize, boundaryDownSize, boundaryRightSize, boundaryLeftSize;
var boundaryUp, boundaryDown, boundaryRight, boundaryLeft;

//Sand, Water, Wall
var sandX, sandY, sandW, sandH;
var waterX, waterY, waterW, waterH;
var wallX, wallY, wallW, wallH;

var nvlScore = 0;
var nvlScoreArray = 0

function start(){
    canvas
}
//Draw the Ball
function drawBall(){
    context.drawImage(ball, 0 * ballWidth, 0, ballWidth, ballHeight, ballStartX, ballStartY, ballWidth, ballHeight); 
}
//Draw the Objects
function draw(){
    drawBoundaries(0,0,boundaryLestSize, canvas.heigt);
    drawBoundaries(canvas.width - boundaryRightSize, 0, boundaryRihtSize, canvas.heigt);
    drawBoundaries(0, 0, canvas.width, boundaryUpSize);
    drawBoundaries(0, canvas.height - boundaryDownSize, canvas.heigt, boundaryDownSize) ;
    drawHole();
    drawSand(sanX, sandY, sandW, sandH);
    drawWater(waterX, waterY, waterW, waterH);
    drawWall(wallX, wallY, wallW, wallH);


}
//Draw the boundaries
function drawBoundaries(bonX, bonY, w, h){
    context.beginPath();
    context.fillStyle ="grey";
    context.fillRect(bonX, bonY, w, h);
    context.closePath(); 
    context.fill();
}
//Drw the Sand
function drawSand(sandX, sandY, sandW, sandH){
    context.beginPath();
    context.fillStyle = "#e6e600";
    context.fillRect(sandX, sandY, sandW, sandH);
    context.closePath();
    context.fill();
}
//Draw the Water
function drawWater(waterX, waterY, waterW, waterH){
    context.beginPath();
    context.fillStyle = "blue";
    context.fillRect(waterX, waterY, waterW, waterH);
    context.closePath();
    context.fill();
}
// Draw the wall
function drawWall(wallX, wallY, wallW, wallH){
    context.beginPath();
    context.fillStyle = "grey";
    context.fillRect(wallX, wallY, wallW, wallH);
    context.closePath(); 
    context.fill();
}
function drawHole(){
    //Boder
    context.beginPath();
    context.arc(holePosx, holePosY, holeRadius + 5, 0, 7);
    context.closePath();
    context.fillStyle = "#d6d6c2";
    context.fill();

    //Hole
    context.beginPath();
    context.arc(holePosX, holePosY, holeRadius + 5, 0, 7);
    context.closePath();
    context.fillStyle = "#004d00";
    context.fill();
}

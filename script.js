var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvas2 = document.getElementById('canvas2');
var contex2 = canvas2.getContext('2d');
// Ball
var centerX = canvas.width/2;
var centerY = canvas.height/2;
var radius = 5;
// Rectangle
var rectangleX = (canvas.width-canvas2.width)/2;
var rectangleY = canvas2.height*20;

context.beginPath();
context.arc(centerX, centerY, radius, 0.2 * Math.PI, false);
context.fillStyle = '#FFFFFF';
context.closePath();
context.fill();

context.beginPath();
context.rect(rectangleX, rectangleY, canvas2.width, canvas2.height);
context.fillStyle = '#FFFFFF';
context.closePath();
context.fill();

function start() {
    
}
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var canvas2 = document.getElementById('canvas2');
    var contex2 = canvas2.getContext('2d');

    //Boundary
    var limitTop = 0;
    var limitBottom = canvas.height ;
    var limitLeft = 0;
    var limitRight = canvas.width ;
    // Ball
    var centerX = canvas.width/2;
    var centerY = canvas.height/2;
    var radius = 5;
    var velX = 0;
    var velY = 0;
    var gravity = 0.5;
    var jumpStrength = -5;
    // Rectangle
    var rectangleX = (canvas.width - canvas2.width) / 2;
    var rectangleY = canvas2.height * 20;
    var rectangleWidth = canvas2.width/3;
    var rectangleHeight = canvas2.height/4;

    //Start
    function start(){
        draw();
        update();
        document.addEventListener('keydown',keydown);
        //document.addEventListener('keyup',keyUp);
    }
    //Draw
    function draw(){
        context.clearRect(0, 0, canvas.width, canvas.height);   
        drawBall();
        drawRectangle();
    }
    // Draw ball
    function drawBall(){
        context.beginPath();
        context.arc(centerX, centerY, radius, 0.2 * Math.PI, false);
        context.fillStyle = '#FFFFFF';
        context.closePath();
        context.fill();
    }
    // Draw rectangle
    function drawRectangle(){
        context.beginPath();
        context.rect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);
        context.fillStyle = '#FFFFFF';
        context.closePath();
        context.fill();
    }

    function update(){
        velY += gravity;
        centerY += velY;
        
        if (centerY + radius > limitBottom){
            centerY = limitBottom - radius;
            velY = jumpStrength;
        }
        if (rectangleX < limitLeft){
            rectangleX = limitLeft;
        }else if (rectangleX + rectangleWidth> limitRight){
            rectangleX = limitRight - rectangleWidth;
        }
        // if(
        //     centerX + radius > rectangleX &&
        //     centerX - radius < rectangleX &&//+ rectangleWidth &&
        //     centerY + radius > rectangleY &&
        //     centerY - radius < rectangleY //+ rectangleHeight
        // ){
        //     centerY = rectangleY - radius;
        //     velY = jumpStrength;
        // }
        draw();
        requestAnimationFrame(update);
    }
    function keydown(event){
        if(event.keyCode === 65 || event.keyCode === 37){
            rectangleX -= 7.5;
            draw();
        }else if (event.keyCode === 68 || event.keyCode === 39) {
            rectangleX += 7.5; // Mover hacia la derecha
            draw();
        }
    }

    start();
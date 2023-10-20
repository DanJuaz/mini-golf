    //Get the both Canvas
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var canvas2 = document.getElementById('canvas2');
    var contex2 = canvas2.getContext('2d');
    
    // Score
    var score = 0;
    //Boundary
    var limitTop = 0;
    var limitBottom = canvas.height ;
    var limitLeft = 0;
    var limitRight = canvas.width ;
    // Ball
    var centerX = canvas.width/2;
    var centerY = canvas.height/2;
    var radius = 5;
    // V and G
    var angle = Math.PI/2;
    var velY = -4;
    var velX = 4;
    // Rectangle
    var rectangleWidth = canvas2.width/3;
    var rectangleHeight = canvas2.height/4;
    var rectangleX = (canvas.width - rectangleWidth) / 2;
    var rectangleY = canvas2.height * 20;

    var starPositions = [
        { x: canvas.width / 20, y: canvas.height / 10 },
        { x: canvas.width / 3, y: canvas.height / 7 }, 
        { x: canvas.width * 19 / 20, y: canvas.height / 2 } 
    ];

    //Start
    function start(){
        draw();
        //drawStar();
        moveBall();
        document.addEventListener('keydown',keydown);
    }
    //Draw
    function draw(){
        context.clearRect(0, 0, canvas.width, canvas.height);   
        drawBall();
        drawRectangle();
        drawScore();
        drawStar();
        for (var i = 0; i < starPositions.length; i++) {
            drawStar(starPositions[i].x, starPositions[i].y);
        }
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
    //Draw the score
    function drawScore(){
        context.font= "16px Arial";
        context.fillText("Score: "+ score, 8, 20);
    }
    // Draw the Star
    function drawStar(x, y) {
        var radius = 25;
        var innerRadius = 10;
        context.strokeStyle = 'black';
        context.fillStyle = 'yellow';
        context.beginPath();
    
        // Move to the starting point
        context.moveTo(x, y - radius);
    
        // Loop to draw the five points of the star
        for (var i = 0; i < 5; i++) {
            var angle = ((Math.PI * 2) / 5) * i - Math.PI / 2;
    
            var outerX = x + Math.cos(angle) * radius;
            var outerY = y + Math.sin(angle) * radius;
    
            context.lineTo(outerX, outerY);
            angle += ((Math.PI * 2) / 5) / 2;
    
            var innerX = x + Math.cos(angle) * innerRadius;
            var innerY = y + Math.sin(angle) * innerRadius;
            context.lineTo(innerX, innerY);
        }
        context.closePath();
        context.fill();
        context.stroke();
    }
    //Get math random
    function random() {
        return Math.random() * (20 -1.1) + 1.1;
    }
    function moveBall(){
        // Ball boundaries with canvas boundaries
        if(centerX + velX > limitRight || centerX + velX < radius){
            velX = - velX;
        }
        if(centerY + velY < radius){
            velY = - velY;
        }
        //Ball bottm bundary and LOSE
        if(centerY + velY > limitBottom){
            window.alert(":C, Te rendirás!!");
        }
        // Rectangle with ball boundaries
        if(centerY + radius > rectangleY &&
             centerY - radius < rectangleY + rectangleHeight &&
             centerX + radius > rectangleX &&
             centerX - radius < rectangleX + rectangleWidth
             ){
            velY = -velY;
        }
        // Check for collisions with stars
        for (var i = 0; i < starPositions.length; i++) {
        var starX = starPositions[i].x;
        var starY = starPositions[i].y;
        var distance = Math.sqrt((centerX - starX) ** 2 + (centerY - starY) ** 2);
        if (distance < radius + 25) {
            // Collision detected with a star, increase the score
            score++;
            // Remove the star that was hit
            starPositions.splice(i, 1);
            // You can add more stars if you want here
            }
        }
        // Rectangle boundaries
        if (rectangleX < limitLeft){
            rectangleX = limitLeft;
        }else if (rectangleX + rectangleWidth> limitRight){
            rectangleX = limitRight - rectangleWidth;
        }
        centerX += velX;
        centerY += velY;
        draw();
        requestAnimationFrame(moveBall);
    }
    // Movement with A/S && Left/Right
    function keydown(event){
        if(event.keyCode === 65 || event.keyCode === 37){
            rectangleX -= 15;
            draw();
        }else if (event.keyCode === 68 || event.keyCode === 39) {
            rectangleX += 15; // Mover hacia la derecha
            draw();
        }
    }

    start();
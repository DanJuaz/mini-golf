    //Get the both Canvas
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var canvas2 = document.getElementById('canvas2');
    var contex2 = canvas2.getContext('2d');
    
    // Score
    var score = 20;
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
    var velY = -3.5;
    var velX = 3.5;
    // Rectangle
    var rectangleWidth = canvas2.width/3;
    var rectangleHeight = canvas2.height/4;
    var rectangleX = (canvas.width - rectangleWidth) / 2;
    var rectangleY = canvas2.height * 20;

    //Start
    function start(){
        draw();
        update();
        document.addEventListener('keydown',keydown);
    }
    //Draw
    function draw(){
        context.clearRect(0, 0, canvas.width, canvas.height);   
        drawBall();
        drawRectangle();
        drawScore();
        drawMoney();
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
    function drawScore(){
        context.font= "16px Arial";
        context.fillText("Score: "+ score, 8, 20);
    }
    // Draw the img Money
    function drawMoney(){
        // var widthImg = 100;
        // var heightImg = 100;
    
        // var img = new Image();
        // img.src = "./assets/img/moneda.png";
    
        // img.onload = function() {
        //     context.drawImage(img, 80, 20, widthImg, heightImg);
        // };
        // Define the coordinates for the star points
        var x = canvas.width / 2; // X-coordinate of the center
        var y = canvas.height / 2; // Y-coordinate of the center
        var radius = 50; // Radius of the outer circle
        var innerRadius = 20; // Radius of the inner circle

        // Set the stroke and fill styles
        context.strokeStyle = 'blue'; // Outline color
        context.fillStyle = 'yellow'; // Fill color

        // Begin drawing the star
        context.beginPath();

        // Move to the starting point
        context.moveTo(x, y - radius);

        // Loop to draw the five points of the star
        for (var i = 0; i < 5; i++) {
            // Calculate the angle for the outer point
            var angle = ((Math.PI * 2) / 5) * i - Math.PI / 2;
            
            // Calculate the coordinates for the outer point
            var outerX = x + Math.cos(angle) * radius;
            var outerY = y + Math.sin(angle) * radius;
            
            // Draw a line to the outer point
            context.lineTo(outerX, outerY);
            
            // Calculate the angle for the inner point
            angle += ((Math.PI * 2) / 5) / 2;
            
            // Calculate the coordinates for the inner point
            var innerX = x + Math.cos(angle) * innerRadius;
            var innerY = y + Math.sin(angle) * innerRadius;
            
            // Draw a line to the inner point
            context.lineTo(innerX, innerY);
        }

        // Close the path to complete the star shape
        context.closePath();

        // Fill the star with the fill color
        context.fill();

        // Draw the outline of the star
        context.stroke();

    }
    function update(){
        // Ball boundaries with canvas boundaries
        if(centerX + velX > limitRight || centerX + velX < radius){
            velX = - velX;
        }
        if(centerY + velY < radius){
            velY = - velY;
        }
        //Ball bottm bundary and LOSE
        if(centerY + velY > limitBottom){
            window.alert("Hello world!");
            alert("Hello world!");

        }
        // Rectangle with ball boundaries
        if(centerY + radius > rectangleY &&
             centerY - radius < rectangleY + rectangleHeight &&
             centerX + radius > rectangleX &&
             centerX - radius < rectangleX + rectangleWidth
             ){
            velY = -velY;
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
        requestAnimationFrame(update);
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
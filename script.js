
    //Get the both Canvas
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var canvas2 = document.getElementById('canvas2');
    var contex2 = canvas2.getContext('2d');
    //Get end-screen
    var endScreen = document.getElementById('end-screen');
    var gameOver = document.getElementById('game-over'); 
    // Score
    var score = 0;
    var confetti = [];
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
        { x: canvas.width / random(), y: canvas.height / 10 },
        { x: canvas.width / random(), y: canvas.height / 7 }, 
        { x: canvas.width * random() / random(), y: canvas.height / 2 } 
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
    // Function to create confetti particles
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const color = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 2;
            confetti.push({ x, y, color, angle, speed });
        }
    }

    // Function to draw and animate confetti
    function drawConfetti() {
        for (let i = 0; i < confetti.length; i++) {
            const particle = confetti[i];
            context.beginPath();
            context.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            context.fillStyle = particle.color;
            context.fill();
            context.closePath();

            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed;
        }
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
                score++;
                starPositions.splice(i, 1);
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
        if (starPositions.length === 0) {
            createConfetti();
        }
        draw();
        if (starPositions.length === 0) {
            drawConfetti();
        }
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
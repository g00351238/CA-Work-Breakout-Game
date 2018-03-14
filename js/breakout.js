//Setup the canvas and variables 
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;

//Set the starting point on the screen for the ball
var x = canvas.width/2;
var y = canvas.height-30;

//defines the location of the pixels at the given next frame ( this can increase difficulty of the game )
var dx = 2;
var dy = -2;


// Defining the paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;


// Defining the buttons that will move the paddle
var rightPressed = false;
var leftPressed = false;

// addd lives
var lives = 3;

// Defining the bricks @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;

//Game sounds

var WINNING_SOUND = new Audio('sounds/woohoo.wav');
var SCORE_SOUND = new Audio('sounds/success.wav');
var GAMEOVER_SOUND = new Audio('sounds/gameover.wav');




var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// the two functions below link the html page to the buttons 
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);



// functions and linking to html page controller using mousemove
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
		var relativeX = e.clientX - canvas.offsetLeft;
		if(relativeX > 0 && relativeX < canvas.width) {
			paddleX = relativeX - paddleWidth/2;
		}
		
}



function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
// Detect when we hit bricks
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
					SCORE_SOUND.play();
                    if(score == brickRowCount*brickColumnCount) {
                        WINNING_SOUND.play();
						alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

//Function to draw the ball and fill with a color yet to be defined
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#008000";
    ctx.fill();
    ctx.closePath();
}


// Draws and defines the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}



function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#FF0000";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
	document.getElementById("gamescore").innerHTML = "Score: " + score;
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillstyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
	document.getElementById("gamelives").innerHTML = "Lives: " + lives;
}



// physically draws the ball, paddle and objects inpu tting the size and starting location
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
	drawLives();
    collisionDetection();
    
	// Bounce the ball off the walls with alert if it drops off the bottom
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
		else {
			//live scoreboard in teh console
			console.log("lives left " + lives);
			lives--;
			if(!lives) {
					GAMEOVER_SOUND.play();
					alert("GAME OVER");
					document.location.reload();
			}
			else {
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width-paddleWidth)/2;
			}
		}
	}
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;


}

setInterval(draw, 10);

// sets the screen refresh rate in milliseconds) ( here you could increase the speed and difficulty or even reduce it in a smoother fashion !)
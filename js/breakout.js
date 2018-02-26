//Setup the canvas and variables 
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius= 10;

//Set the starting point on the screen for the ball
var x = canvas.width/2;
var y = canvas.height-30;

//defines the location of the pixels or ball at the given next frame ( this can increase difficulty of the game )
var dx = 2; 
var dy = -2;


//Function to draw the ball and fill with a color yet to be defined
function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI*2);
		ctx.fillStyle = "#color";
		ctx.fill();
		ctx.closePath();
}
// sets the screen refresh rate in milliseconds) ( here you could increase the speed and difficulty or even reduce it in a smoother fashion !)
setInterval(draw, 10);


// physically creates the ball and inputs the size and starting location
function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBall();
		ctx.beginPath();
		ctx.arc(x, y, 10, 0, Math.PI*2);
		ctx.fillStyle = "color";
		ctx.fill();
		ctx.closePath();
 x += dx;
 y += dy;
 
 // defines the boundaries for the pixels or ball to exist in the canvas and mathematically reversing the direction if the opposite conditions are met which has the effect of making the ball bounce in opposite directions
 
 if(y + dy > canvas.height || y + dy < 0) {
 dy = -dy; 
}

if(x + dx > canvas.width || x + dx < 0) {
 dx = -dx;
}

if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
 dx = -dx;
 ctx.fillStyle = "#ffbf00";
		ctx.fill();
}
if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
 dy = -dy;
 ctx.fillStyle = "#00ff40";
		ctx.fill();
}
}



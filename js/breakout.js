var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20,40,100,50);
ctx.rect(370,260,100,50);
ctx.fillStyle = "#FFFF00";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240,160,20,0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.react(160, 10, 100, 40);
ctx.strokestyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();
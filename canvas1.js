var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var pen = canvas.getContext('2d');

mouse = {
    x :undefined,
    y: undefined
}
window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

window.addEventListener('resize', 
    function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        createCircles();
    }
);

var colorArray = ['#423','#842','#875','#f23','#843', '#f324']

var radiusMin = 10;
var radiusMax = 100;

function Circle(x, y, radius, dx, dy, radiusMin){
    // circle class
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.radiusMin = radiusMin;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function(){
        pen.beginPath();
        
        pen.arc(this.x, this.y, this.radius, 0 , Math.PI * 2, false);
        pen.fillStyle = "rgba(32, 123, 134, 0.9)"
        pen.fillStyle = this.color;
        pen.fill();
        pen.stroke();
    }  
    this.update = function(){
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0){
            this.dx *= -1;
        }
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0){
            this.dy *= -1;
        }
        // animate the circle radius 
        if (Math.abs(mouse.x - this.x) < this.radius*2 && Math.abs(mouse.y - this.y)< this.radius * 2){
            if (this.radius >= radiusMin && this.radius <= radiusMax){
                this.radius += 2;
            } 
        }
        else {
            if (this.radius > radiusMin){
                this.radius -=1;
            }
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

var circleArray = [];
function createCircles(){
    circleArray = [];
    for (var i=0; i< 1000; i++){
        // create different circle objects
        var radius = Math.floor(Math.random() * 10) + 2;
        var x = (Math.random() * (window.innerWidth - radius*2))+ radius;
        var y = (Math.random() * (window.innerHeight - radius *2)) + radius;
        
        do{
            var dx = (Math.random() - 0.5) * 10;
        }while (dx == 0);
        do{
            var dy = (Math.random() - 0.5) * 10;
        }while (dy == 0);
        
       
        var circle = new Circle(x, y, radius, dx, dy, radius);
        circleArray.push(circle);
    }
}
createCircles();


function Animate(){
    requestAnimationFrame(Animate);
    pen.clearRect(0,0, innerWidth, innerHeight);
    for (var i=0; i<circleArray.length; i++){
        // draw different circle objects
        circleArray[i].update();
    }
   
}
Animate();

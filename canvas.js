var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


canvas.addEventListener("touchstart", function(e) {
    var touch = e.touches[0];
    // console.log(touch.clientX,touch.clientY);
    phone.touch(touch,"start");

});
canvas.addEventListener("touchend", function (e) {
    phone.scale = phone.scale / 1.2;
  });
  canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    // console.log(touch.clientX,touch.clientY);
    phone.touch(touch,"move");
  });



function Square(x,y,color) {
    this.x = x;
    this.y = y;
    this.color = color;

    var scale = 1;
    var direction = 1;

    this.draw = function() {
        c.fillStyle = this.color;
        c.fillRect(this.x - ((150*scale) / 2),this.y - (150*scale/2), 150*scale, 150*scale);
    }
    this.update = function(touch,status) {
        if(Math.abs(touch.clientX - this.x)<150){
            switch(status) {
                case "start":
                    // console.log("got me!");
                    phone.scale = phone.scale * 1.2;
                    break;
                case "move":
                    phone.x = touch.clientX;
                    phone.y = touch.clientY;
                    checkScan();
                    break;
            }
        }
    }
}
function CanvasImage(x,y,source, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = document.createElement("img");
    this.img.src = source;
    this.draw = function() {
        c.drawImage(this.img,this.x - this.width/2, this.y - (5* this.height/8),this.width,this.height);
    }
    this.update = function() {
        if(this.x < innerWidth + 500 && this.x > 0) {
            this.x = this.x - 5;
        } 
        if (this.x < innerWidth * .2 && this.x > 0) {
            cta.x = innerWidth/2;
        }
    }
    this.touch = function(touch, status) {
        if(Math.abs(touch.clientX - this.x)<150){
            switch(status) {
                case "start":
                    // console.log("got me!");
                    phone.scale = phone.scale * 1.2;
                    break;
                case "move":
                    phone.x = touch.clientX;
                    phone.y = touch.clientY;
                    checkScan();
                    break;
            }
        }
    }
    this.bounce = function() {
        if (this.width < innerWidth / 4 || this.width > innerWidth/3) {
            direction = -direction;
        }
        this.width += 5 * direction;
        this.height += 5 * direction;
    }
}
function Circle(x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius,0,Math.PI*2,false);
        c.strokeStyle=this.color;
        c.fillStyle=this.color;
        c.stroke();
        c.fill();
    }
    this.update = function(touch,status) {
        if(Math.abs(touch.clientX - this.x)<150){
            switch(status) {
                case "start":
                    // console.log("got me!");
                    //touchCircle.radius = touchCircle.radius*1.2;
                    break;
                case "move":
                    //touchCircle.x = touch.clientX;
                    //touchCircle.y = touch.clientY;
                    break;
            }
        }
    }
}

function checkScan() {
	//console.log("checked for scan");
	if (Math.abs(phone.x - receipt.x)<150 && Math.abs(phone.y - receipt.y)<150) {
		receipt.x = innerWidth - receipt.x;
		receipt.y = innerHeight - receipt.y;
		switch(stage) {
			case "0":
				//make school better
				console.log("School is bigger.");
                school.img.src = "bigSchool.png";
                console.log(school);
                arrow.x = -500;
				stage = "1";
				break;
			case "1":
				//add playground
				playground.x = innerWidth * .25;
				stage = "2";
				break;
			case "2":
				//add parkinglot
                parkingLot.x = innerWidth/2;
                //start bus animation
                bus.x = innerWidth;
                //hide receit
                receipt.x = -500;
				//move down logo
				//add copy and CTA
				stage = "3";
		}
	}
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    grassCircle.draw();
    cloud.draw();
    logo.draw();
    
    school.draw();
    parkingLot.draw();
    playground.draw();
    bus.update();
    bus.draw();
    arrow.draw();
    arrow.bounce();
    //update phone position
    
    //animated arrow showing user to drag phone
    receipt.draw();
    phone.draw();

    // failsafe
    if (timer == 2000) {
        cta.x = innerWidth/2;
    }
    cta.draw();
    timer++;
}

var stage = "0";
var phone = new CanvasImage(.25 * innerWidth, .80 * innerHeight, "iphone.png", 300,300*1.6);
var receipt = new CanvasImage(.85 * innerWidth, .80 * innerHeight,"receipt.png", 500,500);
var school = new CanvasImage(.5 * innerWidth, .5* innerHeight,"smallSchool.png",700,700);
var playground = new CanvasImage(-200, .75*innerHeight,"playground.png",400,400);
var parkingLot = new CanvasImage(-500, .97 * innerHeight,"road.jpg",innerWidth, innerWidth * .228);
var bus = new CanvasImage(innerWidth + 500, .93 * innerHeight,"bus.png",500,500);
var arrow = new CanvasImage(9*innerWidth/16, innerHeight * .80, "arrow.png",innerWidth/3,innerWidth/3);

//Static Background
var grassCircle = new Circle(.5* innerWidth, innerHeight, .5 * innerHeight, "#559807");
var cloud = new CanvasImage(innerWidth/2,.2 * innerHeight,"cloud.png",800,800);
var logo = new CanvasImage(9*innerWidth/16, .16 * innerHeight,"logo.png",300,300);

//End
var cta = new CanvasImage(innerWidth * 4,.63*innerHeight,"cta.png",innerHeight*1.2,innerHeight*1.2);





var scale = 1;
var direction = 1;
var timer = 0;
animate();

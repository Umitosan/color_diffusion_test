/*jshint esversion: 6 */

function Particle(x,y,color,rad,vel) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.radius = rad;
  this.xVel = vel;
  this.yVel = vel;

  this.init = function() {

  };

  this.checkCollidePart = function() {
    for (let i = 0; i < myGame.cloud.length; i++) {
      let p2 = myGame.cloud[i];
      if ( (this.xVel > 0) &&
           ((this.x + this.radius) > (p2.x - p2.radius)) &&
           ((this.x + this.radius) < (p2.x + p2.radius))
         ) {
        this.xVel *= -1;
      }
      if ( (this.xVel < 0) &&
           ((this.x - this.radius) < (p2.x + p2.radius)) &&
           ((this.x - this.radius) > (p2.x - p2.radius)) 
         ) {
        this.xVel *= -1;
      }
    }
  };

  this.checkCollideWall = function() {
    if ((this.xVel > 0) && ((this.x + this.radius + this.xVel) > canW)) {
      this.xVel *= -1;
    }
    if ((this.xVel < 0) && ((this.x - this.radius + this.xVel) < 0)) {
      this.xVel *= -1;
    }
    if ((this.yVel > 0) && ((this.y + this.radius + this.yVel) > canH)) {
      this.yVel *= -1;
    }
    if ((this.yVel < 0) && ((this.y - this.radius + this.yVel) < 0)) {
      this.yVel *= -1;
    }
  };

  this.draw = function() {
    // context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    ctx.beginPath();
    ctx.fillStyle = this.color;
    // ctx.strokeStyle = invertRGBAstr(this.color);
    // ctx.lineWidth = 2;
    ctx.arc(this.x,this.y,this.radius,0,360);
    ctx.fill();
    // ctx.stroke();
  };

  this.update = function() {
    this.checkCollidePart();
    this.checkCollideWall();
    this.x += this.xVel;
    this.y += this.yVel;
  };

} // end box

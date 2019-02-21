/*jshint esversion: 6 */

function Particle(x,y,color,rad,xVel,yVel) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.radius = rad;
  this.xVel = xVel;
  this.yVel = yVel;

  this.init = function() {

  };

  this.checkCollidePart = function() {
    for (let i = 0; i < myGame.cloud.length; i++) {
      let p2 = myGame.cloud[i];
      if ( (((this.xVel > 0) && ((this.x + this.radius) > (p2.x - p2.radius)) && ((this.x + this.radius) < (p2.x + p2.radius))) ||
            ((this.xVel < 0) && ((this.x - this.radius) < (p2.x + p2.radius)) && ((this.x - this.radius) > (p2.x - p2.radius)))) &&
           (((this.yVel > 0) && ((this.y + this.radius) > (p2.y - p2.radius)) && ((this.y + this.radius) < (p2.y + p2.radius))) ||
            ((this.yVel < 0) && ((this.y - this.radius) < (p2.y + p2.radius)) && ((this.y - this.radius) > (p2.y - p2.radius))))
          ) {
          // conservation of momentum dictactes...
          //  (very oversimplified)
          // BEOFRE  Mas1*Vel1  + (mass2 * vel2) = AFTER (mass1 * vector1) + (mass2 * vector2)
          console.log('collide');
          console.log("BEFORE p1.xVel,p1.yVel: "+ this.xVel,this.yVel);
          console.log("BEFORE p2.xVel,yVel: "+ p2.xVel,p2.yVel);

          var x1 = this.x;
          var y1 = this.y;
          var r1 = this.radius;
          var x2 = p2.x;
          var y2 = p2.y;
          var r2 = p2.radius;
          // calculate the (x1 y1) (x2 y2) start and finish coords of the arrow
          //   so that the line attachs to the correct location on the cell wall
          let tRad1,tRad2;
          let quadrant;
          let inv;
          if ( (x1 <= x2) && (y1 <= y2) ) {  // c0 left and above c1
            console.log("c0 left and above c1");
            quadrant = 3;
            tRad1 = Math.atan( (y2-y1) / (x2-x1) );
            tRad2 = (Math.PI/2) - tRad1;
            // let angle1 = getDegreeAngle(tRad1);
            // let angle2 = getDegreeAngle(tRad2);

          } else if ( (x1 <= x2) && (y1 >= y2) ) {  // c0 left and below c1
            console.log("c0 left and below c1");
            quadrant = 2;
            tRad1 = Math.atan( (y1-y2) / (x2-x1));
            tRad2 = (Math.PI/2) - tRad1;

          } else if ( (x1 >= x2) && (y1 <= y2) ) {  // p0 right and above p1
            console.log("p0 right and above p1");
            quadrant = 4;
            tRad1 = Math.atan( (y2-y1) / (x1-x2) );
            tRad2 = (Math.PI/2) - tRad1;

          } else if ( (x1 >= x2) && (y1 >= y2) ) {  // p0 right and below p1
            console.log("p0 right and below p1");
            quadrant = 1;
            tRad1 = Math.atan( (y1-y2) / (x1-x2) );
            tRad2 = (Math.PI/2) - tRad1;

          } else {
            console.log("arrow update error");
            console.log("x1 y1 x2 y2: "+x1+" "+y1+" "+x2+" "+y2);
          } // if
          console.log("angle1, angle2 : "+getDegreeAngle(tRad1)+","+getDegreeAngle(tRad2));

          // console.assert(1 === 1, 'x vel not ');
          // let sumBefore = ( x1Vel*Math.cos(tRad1) ) + ( x2Vel*Math.cos(tRad2) );
          // console.log('sumBefore : ', sumBefore);
          //
          // let p1xVel = this.xVel;
          // let p1yVel = this.yVel;
          // this.xVel = ;
          // this.yVel = ;
          // p2.xVel = p1xVel;
          // p2.yVel = p1yVel;
          console.log("AFTER p1.xVel,p1.yVel: "+ this.xVel,this.yVel);
          // console.log("AFTER p2.xVel,yVel: "+ p2.xVel,p2.yVel);
          // let sumAfter = ( x1Vel*Math.cos(tRad1) ) + ( x2Vel*Math.cos(tRad2) );
          // console.log('sumAfter : ', sumAfter);
          myGame.pauseIt();
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

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

      // old collision
      // if ( (((this.xVel > 0) && ((this.x + this.radius) > (p2.x - p2.radius)) && ((this.x + this.radius) < (p2.x + p2.radius))) ||
      //       ((this.xVel < 0) && ((this.x - this.radius) < (p2.x + p2.radius)) && ((this.x - this.radius) > (p2.x - p2.radius)))) &&
      //      (((this.yVel > 0) && ((this.y + this.radius) > (p2.y - p2.radius)) && ((this.y + this.radius) < (p2.y + p2.radius))) ||
      //       ((this.yVel < 0) && ((this.y - this.radius) < (p2.y + p2.radius)) && ((this.y - this.radius) > (p2.y - p2.radius))))
      //     ) {

      // var newVelX1 = (velX1 * (mass1 - mass2) + (2 * mass2 * velX2)) / (mass1 + mass2)
      // var newVelX2 = (velX2 * (mass2 - mass1) + (2 * mass1 * velX1)) / (mass1 + mass2)
      // var newVelY1 = (velY1 * (mass1 - mass2) + (2 * mass2 * velY2)) / (mass1 + mass2)
      // var newVelY2 = (velY2 * (mass2 - mass1) + (2 * mass1 * velY1)) / (mass1 + mass2)

      // collision distance: R= r1 + r2
      // current distance:    diagDistance = sqrt( (x2-x1)^2 + (y2-y2)^2 )
      if ( (Math.abs(this.xVel) > 0) && (Math.abs(p2.xVel) > 0) ) {
        let collisionDistance = (this.radius + p2.radius);
        // diagonal distance between circles = sqrt( |p2.x - p1.x|^2 + |p2.y - p1.y|^2 )
        let currentDiagDistance = Math.sqrt( Math.pow(Math.abs(p2.x-this.x),2) + Math.pow(Math.abs(p2.y-this.y),2) );
        if ( ( currentDiagDistance < collisionDistance  ) && (currentDiagDistance !== 0) ) {
          // console.log('------------------------');
          // console.log('collide');
          // console.log('x,y x2,y2 = ',+this.x+","+this.y+" "+p2.x+","+p2.y);
          // console.log('collisionDistance= ',collisionDistance);
          // console.log('currentDiagDistance= ',currentDiagDistance);
          // console.log('this.xVel,p2.xVel = ', this.xVel+","+p2.xVel);
          // console.log('------------------------');

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
          let angle1,angle2;
          let initXVel1 = this.xVel;
          let initYVel1 = this.yVel;
          let initXVel2 = p2.xVel;
          let initYVel2 = p2.yVel;
            if ( (x1 <= x2) && (y1 <= y2) ) {  // c0 left and above c1
              console.log("c0 left and above c1");
              quadrant = 3;
              tRad1 = Math.atan( (y2-y1) / (x2-x1) );
              tRad2 = (Math.PI/2) - tRad1;
              angle1 = getDegreeAngle(tRad1);
              angle2 = getDegreeAngle(tRad2);
              // console.log("angle1, angle2 : "+angle1+","+angle2);
            } else if ( (x1 <= x2) && (y1 >= y2) ) {  // c0 left and below c1
              console.log("c0 left and below c1");
              quadrant = 2;
              tRad1 = Math.atan( (y1-y2) / (x2-x1));
              tRad2 = (Math.PI/2) - tRad1;
              angle1 = getDegreeAngle(tRad1);
              angle2 = getDegreeAngle(tRad2);
              // console.log("angle1, angle2 : "+angle1+","+angle2);
            } else if ( (x1 >= x2) && (y1 <= y2) ) {  // p0 right and above p1
              console.log("p0 right and above p1");
              quadrant = 4;
              tRad1 = Math.atan( (y2-y1) / (x1-x2) );
              tRad2 = (Math.PI/2) - tRad1;
              angle1 = getDegreeAngle(tRad1);
              angle2 = getDegreeAngle(tRad2);
              // console.log("angle1, angle2 : "+angle1+","+angle2);
            } else if ( (x1 >= x2) && (y1 >= y2) ) {  // p0 right and below p1
              console.log("p0 right and below p1");
              quadrant = 1;
              tRad1 = Math.atan( (y1-y2) / (x1-x2) );
              tRad2 = (Math.PI/2) - tRad1;
              angle1 = getDegreeAngle(tRad1);
              angle2 = getDegreeAngle(tRad2);
              // console.log("angle1, angle2 : "+angle1+","+angle2);
            } else {
              console.log("arrow update error");
              console.log("x1 y1 x2 y2: "+x1+" "+y1+" "+x2+" "+y2);
            } // if

            // var newVelX1 = (velX1 * (mass1 - mass2) + (2 * mass2 * velX2)) / (mass1 + mass2)
            // var newVelY1 = (velY1 * (mass1 - mass2) + (2 * mass2 * velY2)) / (mass1 + mass2)
            // var newVelX2 = (velX2 * (mass2 - mass1) + (2 * mass1 * velX1)) / (mass1 + mass2)
            // var newVelY2 = (velY2 * (mass2 - mass1) + (2 * mass1 * velY1)) / (mass1 + mass2)

            this.xVel = ( (initXVel1 * (this.radius - p2.radius) + (2 * p2.radius * initXVel2)) / (this.radius + p2.radius) );
            this.yVel = ( (initYVel1 * (this.radius - p2.radius) + (2 * p2.radius * initYVel2)) / (this.radius + p2.radius) );
            p2.xVel = ( (initXVel2 * (p2.radius - this.radius) + (2 * this.radius * initXVel1)) / (this.radius + p2.radius) );
            p2.yVel = ( (initYVel2 * (p2.radius - this.radius) + (2 * this.radius * initYVel1)) / (this.radius + p2.radius) );

            // preemptive apply new movement right away
            // this.x += this.xVel;
            // this.y += this.yVel;
            // p2.x += p2.xVel;
            // p2.y += p2.yVel;

            myGame.pauseIt();
          }
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
    this.checkCollideWall();
    this.checkCollidePart();
    this.x += this.xVel;
    this.y += this.yVel;
  };

} // end box

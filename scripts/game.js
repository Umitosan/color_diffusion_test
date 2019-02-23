/*jshint esversion: 6 */


function Game(updateDur) {
  this.timeGap = 0;
  this.lastUpdate = 0;
  this.lastDirKeyX = undefined;
  this.lastDirKeyY = undefined;
  this.updateDuration = 1000/updateDur; // milliseconds duration between update()
  this.paused = false;
  this.bg = new Image();
  this.pausedTxt = undefined;
  this.mode = 'init';
  this.cloud = undefined;

  this.init = function() {
    this.bg.src = 'diff1.jpg';
    this.lastUpdate = performance.now();
    let arr = [];
    for (let i = 0; i < 30; i++) {
      let newX, newY;
      let newRad = 8;
      while (newX === undefined) { // get unique good X and Y starting point
        let xyGood = true;
        let randX = getRandomIntInclusive(newRad,canW-newRad);
        let randY = getRandomIntInclusive(newRad,canH-newRad);
        for (let j = 0; j < arr.length; j++) {
          if ( (Math.abs(arr[j].x - randX) < (newRad+5)) && (Math.abs(arr[j].y - randY) < (newRad+5)) ) {
            xyGood = false;
            break;
          }
        }
        if (xyGood === true) {
          newX = randX;
          newY = randY;
        }
      }
      // Particle(x,y,color,rad,vel)
      let velLowBounds = 0.1;
      let velHighBounds = 1.1;
      let randXVel = (getRandomIntInclusive(velLowBounds*10,velHighBounds*10)/10) * randSign();
      let randYVel = (getRandomIntInclusive(velLowBounds*10,velHighBounds*10)/10) * randSign();
      let part = new Particle(/* x     */ newX,
                              /* y     */ newY,
                              /* color */ randColor("rgba"),
                              /* rad   */ newRad,
                              /* xVel  */ randXVel,
                              /* yVel  */ randYVel
                             );
      arr.push(part);
    }
    this.cloud = arr;
  };

  this.pauseIt = function() {
    myGame.paused = true;
  };
  this.unpauseIt = function() {
    myGame.paused = false;
    // this prevents pac from updating many times after UNpausing
    this.lastUpdate = performance.now();
    this.timeGap = 0;
  };

  this.drawBG = function() { // display background over canvas
    ctx.imageSmoothingEnabled = false;  // turns off AntiAliasing
    ctx.drawImage(this.bg,0,0,CANVAS.width,CANVAS.height);
  };

  this.draw = function() {  // draw everything!
    for (let i = 0; i < this.cloud.length; i++) {
      this.cloud[i].draw();
    }
  }; // end draw

  this.update = function() {
      if (this.paused === false) { // performance based update: myGame.update() runs every myGame.updateDuration milliseconds
            this.timeGap = performance.now() - this.lastUpdate;

            if ( this.timeGap >= this.updateDuration ) { // this update is restricted to updateDuration
              let timesToUpdate = this.timeGap / this.updateDuration;
              for (let i=1; i < timesToUpdate; i++) { // update children objects
                // if (timesToUpdate > 2) {
                //   console.log('timesToUpdate = ', timesToUpdate);
                // }
                // general update area
                for (let i = 0; i < this.cloud.length; i++) {
                  this.cloud[i].update();
                }
              }
              this.lastUpdate = performance.now();
            } // end if

            // if (this.mode === "draw") { // run this every update cycle regardless of timing
            //   // general draw area
            // } else {
            //   // mode is none
            // }

      } else if (this.paused === true) {
        // PAUSED! do nothin
      } else {
        console.log('game pause issue');
      }

  }; // end update

} // end myGame

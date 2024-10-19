function Box(x, y, w, h, word) {
    var options = {
      friction: 0.5,
      restitution: 0.7, // bouncy
      angle: PI
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.word = word
    this.size = h
    World.add(world, this.body);
  
    this.show = function() {
      var pos = this.body.position;
      var angle = this.body.angle;

    // console.log(this.word)
  
    //  push();
    ////   stroke(200);
    ////   strokeWeight(2);
    //fill(255, 255, 255, 100);
    // translate(pos.x, pos.y);
    // //rotate(angle);
    // rectMode(CENTER);
    // rect(0, 0, this.w, this.h);
    //  pop();
      
      push()
      fill(255);
      stroke(255);
      strokeWeight(0);
      textAlign(CENTER, CENTER); 
      textSize(this.size);
      translate(pos.x, pos.y);
       //rotate(angle);
      text(this.word, this.w/12, this.h/8);
      pop()
      
    }
  }

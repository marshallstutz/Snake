function mutate(x) {
  if (random(1) < 0.5) {
    let offset = randomGaussian();
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class Snake{
  constructor(brain){
    this.x = [];
    this.y = [];
	this.w = 10;
    this.x[0] = width/(w*2);
    this.y[0] = height/(w*2);
    this.currX = width/(w*2);
    this.currY = height/(w*2);
	this.currDir = 0;
    this.hasEaten = false;
	this.score = 0;
	this.bodyR = floor(random(200))+55;
	this.headR = floor(random(200))+55;
	this.bodyG = floor(random(200))+55;
	this.headG = floor(random(200))+55;
	this.bodyB = floor(random(200))+55;
	this.headB = floor(random(200))+55;
	if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(8, 5, 4);
      //this.brain = new NeuralNetwork(3600, 40, 4);
    }
  }
  show(){
    fill(255);
    for(var i = 0; i < this.x.length; i++){
      fill(this.bodyR, this.bodyG, this.bodyB);
      if(i == this.x.length-1){
        fill(this.headR,this.headG,this.headB);
      }
      rect(this.x[i]*10, this.y[i]*10, this.w, this.w);
    }

  }
  
  copy(){
    return new Snake(this.brain);
  }
  
  think(snack){
    let inputs = [];
	
	inputs[0] = this.currX;
	inputs[1] = this.currY;
	inputs[2] = snack.x;
	inputs[3] = snack.y;
	//inputs[4] = this.currDir;
	var left = 0;
	var right = 0;
	var up = 0;
	var down = 0;
	for(var i = 0; i < this.x.length; i++){
		if(this.x[i] == this.currX - 1 && this.y[i] == this.currY){
			left = -1;
		}
		if(this.x[i] == this.currX + 1 && this.y[i] == this.currY){
			right = -1;
		}
		if(this.x[i] == this.currX && this.y[i] == this.currY + 1){
			up = -1;
		}
		if(this.x[i] == this.currX && this.y[i] == this.currY - 1){
			down = -1
		}
	}
	if(snack.x == this.currX - 1 && snack.y == this.currY){
		left = 1;
	}
	if(snack.x == this.currX + 1 && snack.y == this.currY){
		right = 1;
	}
	if(snack.x == this.currX && snack.y == this.currY + 1){
		up = 1;
	}
	if(snack.x == this.currX && snack.y == this.currY - 1){
		down = 1;
	}
	if(-1 == this.currX - 1){
		left = -1;
	}
	if(60 == this.currX + 1){
		right = -1;
	}
	if(60 == this.currY + 1){
		up = -1;
	}
	if(-1 == this.currY - 1){
		down = -1;
	}
	/*
	if(this.dir == 1){
		inputs[5] = left;
		inputs[6] = up;
		inputs[7] = down;
	}
	else if(this.dir == 2){
		inputs[5] = down;
		inputs[6] = left;
		inputs[7] = right;
	}
	else if(this.dir == 3){
		inputs[5] = right;
		inputs[6] = down;
		inputs[7] = up;
	}
	else if(this.dir == 4){
		inputs[5] = up;
		inputs[6] = right;
		inputs[7] = left;
	}
	else{
		inputs[5] = 0;
		inputs[6] = 0;
		inputs[7] = 0;
	}
	*/
	inputs[4] = left;
	inputs[5] = right;
	inputs[6] = up;
	inputs[7] = down;
    return this.brain.predict(inputs);

/*
	for(var i = 0; i <= 3599; i++){
		inputs[i] = 0;
	}
	for(var i = 0; i < this.x.length; i++){
		for(var j = 0; j < this.y.length; j++){
			inputs[i + 59*j] = 1;
		}
	}
	inputs[this.currX + 59*this.currY]= 2;
	inputs[snack.x + 59 * snack.y] = 3;
	return this.brain.predict(inputs);
  }
  */
}
  setDir(dir){
	  this.currDir = dir;
  }
  
  update(snack){
  	if(this.currDir == 1){
      this.currX -= 1;
  	}
  	else if(this.currDir == 2){
      this.currY -= 1;
  	}
  	else if(this.currDir == 3){
      this.currX += 1;
  	}
  	else if(this.currDir == 4){
      this.currY += 1;
  	}
	if(this.currX == snack.x && this.currY == snack.y){
		this.hasEaten = true;
		snack.isEaten = true;
		this.score = this.score + 1000;
	}
    if(this.currDir != 0){
      this.x.push(this.currX);
      this.y[this.y.length] = this.currY;
    }
    if(!this.hasEaten && this.currDir != 0 && this.x.length > 3){
      this.x.splice(0,1);
      this.y.splice(0,1);
    }
	this.hasEaten = false;
	this.score++;
  }
  
  spaces(){
	let retVal = [];
	for(var i = 0; i < this.x.length; i++){
		retVal[i] = this.x[i] + this.y[i]*10;
	}
	return retVal;
  }

  died(){
    for(var i = 0; i < this.x.length-1; i++){
      if(this.x[i] == this.currX && this.y[i] == this.currY){
        return true;
      }
    }
	if(this.currX > 59 || this.currX < 0 || this.currY < 0 || this.currY > 59){
		//this.score = this.score - 10;
		return true;
	}
    return false;
  }
}

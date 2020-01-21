class Snack{
  constructor(availSpaces){
	let val = floor(random(availSpaces.length));
    this.x = availSpaces[val]%60;
    this.y = floor(availSpaces[val]/60);
	this.isEaten = false;
  }
  
  getX(){
	  return this.x;
  }
  getY(){
	  return this.y;
  }
  
  
  draw(r, g, b){
	  fill(r,g,b);
	  ellipse(this.x * 10 + 5, this.y*10 + 5, 10);
  }
}

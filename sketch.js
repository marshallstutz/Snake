var updateFrame = 0;
var snake1;
let availPoints = [];
let snakePoints = [];
let activeSnakes = [];
let activeSnacks = [];
let allSnakes = [];
var snackPoint;
var pointsX = 59;
var pointsY = 59;
var w = 10;
var population = 1000;
var showButton;
var gameMode = 0;
var numberOfRunsSpan;
var allTimeHighScoreSpan;
var averageScoreSpan;
var averageScore;
var highScore = 0;
var numberOfRuns = 0;


function setup() {
	var canvas = createCanvas(600, 600);
	canvas.parent('canvascontainer');
	background(0);
	showButton = select('#show');
	showButton.mousePressed(toggleState);
	numberOfRunsSpan = select('#nr');
	allTimeHighScoreSpan = select('#ahs');
	averageScoreSpan = select('#avg');
	for(var i = 0; i < population; i++){
		var snake = new Snake();
		activeSnakes[i] = snake;
		allSnakes[i] = snake;
		availPoints[i] = [];
		for(var j = 0; j < pointsY * pointsX; j++){
			availPoints[i][j] = j;
		}
		activeSnacks[i] = new Snack(availPoints[i]);
	}
	//snake1 = new Snake();
	//getAvail();
	//snackPoint = new Snack(availPoints);
}

function toggleState() {
  if(gameMode < 2){
	  gameMode++;
  }
  else {
	  gameMode = 0;
  }
  // Show the best ball
  if (gameMode == 0) {
    showButton.html('Show: 1 snake');
    // Go train some more
  } else if(gameMode == 1){
    showButton.html('Show: 10 snake');
  }
  else if(gameMode == 2){
	  showButton.html('Show: Nothing (fast train)');
  }
  else if(gameMode = 3){
	  showButton.html('Human player mode');
  }
}

function draw() {
	if(gameMode != 3){
		for(var i = activeSnakes.length -1; i >= 0; i--){
			let snake = activeSnakes[i];
			let outputs = [];
			outputs = snake.think(activeSnacks[i]);
			snake.setDir(outputs.indexOf(max(outputs)) + 1);
			snake.update(activeSnacks[i]);
			//activeBoards[i].updateScore();
			if(snake.died()){
				//averageScore += activeBoards[i].score;
				if(snake.score > highScore){
					highScore = snake.score;
				}
				averageScore += snake.score;
				activeSnakes.splice(i,1);
				//activeSnacks.splice(i,1);
			}
		}
		if(activeSnakes.length == 0){
			averageScoreSpan.html(averageScore/population);
			averageScore = 0;
			numberOfRuns++;
			nextGeneration();
			for(var i = 0; i < activeSnakes.length; i++){
				activeSnacks[i] = new Snack(availPoints[i]);
			}
		}
	}
	background(0);
	if(gameMode == 1){
		if(activeSnakes.length > 10){
			for(var i = 0; i < 10; i++){
				activeSnakes[i].show();
				activeSnacks[i].draw(activeSnacks[i].bodyR, activeSnacks[i].bodyG, activeSnacks[i].bodyB);
			}
		}
		else{
			for(var i = 0; i < activeSnakes.length; i++){
				activeSnakes[i].show();
				activeSnacks[i].draw(activeSnacks[i].bodyR, activeSnacks[i].bodyG, activeSnacks[i].bodyB);
			}
		}
	}
	else if(gameMode == 0){
		activeSnakes[0].show();
		activeSnacks[0].draw();
	}
	else if(gameMode == 0){
		if(activeSnakes[0].died()){
			activeSnakes[0] = new Snake();
			
		}
	}
	
	allTimeHighScoreSpan.html(highScore);
	numberOfRunsSpan.html(numberOfRuns);
	/*
	background(0);
	stroke(255);
	snake1.show();
	snackPoint.draw();
	if(snake1.died()){
		console.log("gameover");
		noLoop();
	}
	if(snackPoint.isEaten){
		getAvail();
		snackPoint = new Snack(availPoints);
	}
	if(updateFrame > 7){
		updateFrame = 0;
		snake1.update(snackPoint);

	}
	console.log(availPoints.length);
	updateFrame++;
	*/
}

function getAvail(val){
	for(var i = 0; i < pointsY * pointsX; i++){
		availPoints[val][i] =i;
	}
	let nonAvail = activeSnakes[val].spaces();
	for(var i = 0; i < nonAvail.length; i++){
		availPoints[val].splice(nonAvail[i],1);
	}
}

function keyPressed(){
	if(keyCode === LEFT_ARROW){
		activeSnakes[0].currDir = 1;
	}
	else 	if(keyCode === UP_ARROW){
			activeSnakes[0].currDir = 2;
	}
	else 	if(keyCode === RIGHT_ARROW){
		activeSnakes[0].currDir = 3;
	}
	else 	if(keyCode === DOWN_ARROW){
		activeSnakes[0].currDir = 4;
	}
	else if(keyCode == ENTER){
		loop();
    }
    else if(keyCode == SHIFT){
		noLoop();
    }
}
/*
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}*/

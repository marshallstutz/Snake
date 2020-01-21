// Start the game over
function resetGame() {
}

// Create the next generation
function nextGeneration() {
  resetGame();
  // Normalize the fitness values 0-1
  normalizeFitness(allSnakes);
  // Generate a new set of birds
  activeSnakes = generate(allSnakes);

  //for(var i = 0; i < activeS
  // Copy those birds to another array
  allSnakes = activeSnakes.slice();
}

// Generate a new population of birds
function generate(oldSnakes) {
  let newSnakes = [];
  for (let i = 0; i < oldSnakes.length; i++) {
    // Select a bird based on fitness
    let snake = poolSelection(oldSnakes);
    newSnakes[i] = snake;
  }
  return newSnakes;
}

// Normalize the fitness of all birds
function normalizeFitness(snakes) {
  // Make score exponentially better?
  for (let i = 0; i < snakes.length; i++) {
    snakes[i].score = pow(snakes[i].score, 2);
  }

  // Add up all the scores
  let sum = 0;
  for (let i = 0; i < snakes.length; i++) {
    sum += snakes[i].score;
  }
  // Divide by the sum
  for (let i = 0; i < snakes.length; i++) {
    snakes[i].fitness = snakes[i].score / sum;
  }
}


// An algorithm for picking one bird from an array
// based on fitness
function poolSelection(snakes) {
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= snakes[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  // Make sure it's a copy!
  // (this includes mutation)
  return snakes[index].copy();
}

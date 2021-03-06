

  // Set backdrop
  setBackdropURL('../images/fly-backdrop.jpg')

  // Create frog sprite
  var frog = new Image({
    url: "../images/fly-frog.png",
    width: 150,
    height: 129  ,
    y: minY + 50,
    angle: 0
  })

  // Make frog move with arrow keys
  forever(() => {
    if (keysDown.includes('LEFT')) {
      frog.x -= 10
    }
    if (keysDown.includes('RIGHT')) {
      frog.x += 10
    }
    if (keysDown.includes('UP')) {
      frog.y += 10
    }
    if (keysDown.includes('DOWN')) {
      frog.y -= 10
    }
  })

  // Create tongue sprite
  var tongue = new Line({
    color: "red",
    width: 5,
    x: frog.x,
    y: frog.y,
    x1: frog.x,
    y1: frog.y
  })

  // Send tongue back a layer
  tongue.sendToBack()

  forever(() => {
    // Make tongue forever follow frog
    tongue.x = frog.x
    tongue.y = frog.y
    tongue.x1 = frog.x
    // Make tongue grow if space is pressed, otherwise make it shrink
    if (keysDown.includes('SPACE')) {
      tongue.y1 += 20
    } else {
      tongue.y1 -= 20
    }
    // Stop tongue from moving below frog
    if (tongue.y1 <= frog.y) {
      tongue.y1 = frog.y
    }
    // Make tongue move back to original position if it reaches top of screen
    if (tongue.y1 >= maxY) {
      tongue.y1 = frog.y
    }
  })

  // Create fly sprite
  var fly = new Image({
    url: "../images/fly-fly.png",
    width: 40,
    height: 40,
    x: minX,
    y: random(minY + 100, maxY - 50)
  })

  // Send fly back a layer
  fly.sendToBack()

  // Create variable to manage fly speed and set it to 1
  var flySpeed = 1

  // Move fly by flySpeed variable
  forever(() => {
    fly.move(flySpeed)
  })

  // Increase flySpeed variable every 5 seconds
  every(5, 'second', () => {
    flySpeed++
  })

  // Create score variable
  var score = 0
  var scoreText = new Text({
    text: () => "Flies: " + score,
    size: 20,
    y: maxY - 30
  })

  forever(() => {
    // If tongue touching fly, increase score and bring fly back to random position on left side of screen
    if (tongue.touching(fly) && !fly.touching(frog)) {
      score++
      fly.y = random(minY + 100, maxY - 50)
      fly.x = minX
    }
  })

  // Create lilypad sprite
  var lilypad = new Image({
    url: '../images/fly-lilypad.png',
    width: 60,
    height: 60,
    x: randomX(),
    y: maxY
  })

  forever(() => {
    // Make lilypad fall continuously
    lilypad.y -= 5
    // Make lilypad move to a random spot at the top of the screen if it goes past the bottom
    if (lilypad.y < minY) {
      lilypad.y = maxY
      lilypad.x = randomX()
    }
  })

  // Create text sprite to display instructions
  var instructions = new Text({
    text: () => "Press space to catch the fly before it's gone!",
    size: 30,
    y: maxY - 120,
    color: "#486d24",
  })

  // Hide instructions after 2 seonds
  after(3, 'second', () => {
    instructions.hide()
  })

  forever(() => {
    // Display game over message if fly moves past right side of screen and freeze game
    if (fly.x > maxX + 40) {
      new Text({
        text: () => "Bye bye fly! Game Over",
        color: "red",
        size: 40
      })
      freeze()
      // Display game over message if lilypad touches frog and freeze game
    } else if (lilypad.distanceTo(frog) < 80) {
      new Text({
        text: () => "Ay Caramba! Game Over",
        color: "red",
        size: 40
      })
      freeze()
    }
  })
  

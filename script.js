const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const gameContainer = document.getElementById('gameContainer');

let playerPosition = 135; // Centered on the x-axis
let obstacleSpeed = 2;
let gameOver = false;

// Handle gyroscope input
window.addEventListener('deviceorientation', function(event) {
    // Gamma is the left-to-right tilt in degrees (from -90 to 90)
    let gamma = event.gamma;

    // Convert gamma to a range of 0 to 270 (width of the game container minus player width)
    let range = 135 + gamma * 1.5;
    playerPosition = Math.max(0, Math.min(range, 270));

    // Move the player
    player.style.left = playerPosition + 'px';
});

// Move obstacle down
function moveObstacle() {
    let obstaclePosition = obstacle.offsetTop;
    if (obstaclePosition >= 470) {
        obstaclePosition = 0;
        obstacle.style.left = Math.floor(Math.random() * 270) + 'px';
    } else {
        obstaclePosition += obstacleSpeed;
    }
    obstacle.style.top = obstaclePosition + 'px';
    
    // Collision detection
    if (
        obstaclePosition > 420 &&
        obstaclePosition < 470 &&
        playerPosition + 30 >= obstacle.offsetLeft &&
        playerPosition <= obstacle.offsetLeft + 30
    ) {
        gameOver = true;
        alert('Game Over!');
        return;
    }
    
    if (!gameOver) {
        requestAnimationFrame(moveObstacle);
    }
}

// Start the game
moveObstacle();

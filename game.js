document.addEventListener("DOMContentLoaded", function() {
    const player = document.getElementById("player");
    const gameContainer = document.querySelector(".game-container");
    
    // Player object
    const playerObj = {
        x: player.offsetLeft,
        y: player.offsetTop,
        width: player.offsetWidth,
        height: player.offsetHeight,
        velocityX: 0,
        velocityY: 0,
        speed: 2, // Adjust player speed here
        jumping: false
    };
    
    // Key codes
    const keys = {
        left: 37,
        right: 39,
        up: 38
    };

    // Key state object
    const keyState = {};

    // Update player position
    function update() {
        // Move player horizontally
        if (keyState[keys.left]) {
            playerObj.velocityX = -playerObj.speed;
        } else if (keyState[keys.right]) {
            playerObj.velocityX = playerObj.speed;
        } else {
            playerObj.velocityX = 0;
        }

        // Apply gravity
        playerObj.velocityY += 0.5;

        // Apply velocity
        playerObj.x += playerObj.velocityX;
        playerObj.y += playerObj.velocityY;

        // Prevent player from going out of bounds
        if (playerObj.x < 0) {
            playerObj.x = 0;
        }
        if (playerObj.x > gameContainer.offsetWidth - playerObj.width) {
            playerObj.x = gameContainer.offsetWidth - playerObj.width;
        }
        if (playerObj.y > gameContainer.offsetHeight - playerObj.height) {
            playerObj.y = gameContainer.offsetHeight - playerObj.height;
            playerObj.velocityY = 0;
            playerObj.jumping = false;
        }

        // Update player position
        player.style.left = playerObj.x + "px";
        player.style.top = playerObj.y + "px";

        requestAnimationFrame(update);
    }

    // Keydown event handler
    window.addEventListener("keydown", function(e) {
        keyState[e.keyCode] = true;
    });

    // Keyup event handler
    window.addEventListener("keyup", function(e) {
        keyState[e.keyCode] = false;
    });

    // Start the game loop
    update();
});

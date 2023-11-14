// canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    color: 'red', 
    speed: 5,
    dx: 0,
    dy: 0,
    bounces: 0
};

// display bounce count 
const bounceCountElement = document.getElementById('bounceCount');

// mouse click event listener
canvas.addEventListener('click', (event) => {
    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;

    // calc the direction vector
    const deltaX = clickX - ball.x;
    const deltaY = clickY - ball.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    ball.dx = (deltaX / distance) * ball.speed;
    ball.dy = (deltaY / distance) * ball.speed;
});

// reset button event listener
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', () => {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 0;
    ball.dy = 0;
    ball.bounces = 0;

    // update bounce count display when resetting
    updateBounceCount();
});

// ball design
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// update game
function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // bounce off canvas border
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
        ball.bounces++;
        updateBounceCount();
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
        ball.bounces++;
        updateBounceCount();
    }
}

// game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    update();
    requestAnimationFrame(gameLoop);
}

// bounce count update display
function updateBounceCount() {
    bounceCountElement.textContent = 'Bounces: ' + ball.bounces;
}

// start game loop
gameLoop();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const playerImg = new Image();
playerImg.src = 'mike.png';

const bars = [
    "Sharkeez", "Malarky's", "Stag Bar", "American Junkie",
    "The Alley", "Aurora", "The Blue Beet", "Mutt Lynch's"
];

let player = { x: canvas.width / 2, y: canvas.height - 100, size: 50, speed: 7 };
let obstacles = [];
let gameOver = false;
let score = 0;

function createObstacle() {
    const text = bars[Math.floor(Math.random() * bars.length)];
    const x = Math.random() * (canvas.width - 100);
    const speed = Math.random() * 3 + 2;
    obstacles.push({ text, x, y: -20, speed });
}

function drawPlayer() {
    ctx.drawImage(playerImg, player.x, player.y, player.size, player.size);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    ctx.font = '20px Arial';
    obstacles.forEach(o => ctx.fillText(o.text, o.x, o.y));
}

function updateObstacles() {
    obstacles.forEach(o => o.y += o.speed);
    obstacles = obstacles.filter(o => o.y < canvas.height + 20);
}

function detectCollision() {
    obstacles.forEach(o => {
        const textWidth = ctx.measureText(o.text).width;
        if (player.x < o.x + textWidth &&
            player.x + player.size > o.x &&
            player.y < o.y + 20 &&
            player.y + player.size > o.y) {
            endGame();
        }
    });
}

function endGame() {
    gameOver = true;
    document.getElementById('gameOverScreen').classList.remove('hidden');
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    updateObstacles();
    detectCollision();
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

function startGame() {
    player = { x: canvas.width / 2, y: canvas.height - 100, size: 50, speed: 7 };
    obstacles = [];
    gameOver = false;
    score = 0;
    document.getElementById('overlay').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.add('hidden');
    setInterval(createObstacle, 1000);
    gameLoop();
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') player.x -= player.speed;
    if (e.key === 'ArrowRight') player.x += player.speed;
});

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', startGame);

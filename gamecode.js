let BlockSize = 50;
let rows = 15;
let columns = 15;
let canvas;
let ctx; 

let SnakeX = BlockSize * 5;
let SnakeY = BlockSize * 5;

let Snake = [];

let death = false;

//speelveld 

window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.height = rows * BlockSize;
    canvas.width = columns * BlockSize;
    ctx = canvas.getContext("2d"); 

    AppleBlock();
    document.addEventListener("keyup", SnakeMovement);
    setInterval(update, 750/10); 
};

let TempoX = 0;
let TempoY = 0;

//keys voor de slang om te bewegen

function SnakeMovement(e) {
    if (e.code == "ArrowUp" && TempoY != 1) {
        TempoX = 0;
        TempoY = -1;
    }
    else if (e.code == "ArrowDown" && TempoY != -1) {
        TempoX = 0;
        TempoY = 1;
    }
    else if (e.code == "ArrowLeft" && TempoX != 1) {
        TempoX = -1;
        TempoY = 0;
    }
    else if (e.code == "ArrowRight" && TempoX != -1) {
        TempoX = 1;
        TempoY = 0;
    }
}

let AppleX;
let AppleY;

//appel RNG

function AppleBlock() {
    AppleX = Math.floor(Math.random() * columns) * BlockSize;
    AppleY = Math.floor(Math.random() * rows) * BlockSize;
}

function update() {
    if (death) {
        return;
    }

    //placements voor slang en appel

    ctx.fillStyle="black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle="red";
    ctx.fillRect(AppleX, AppleY, BlockSize, BlockSize);

    if (SnakeX == AppleX && SnakeY == AppleY) {
        Snake.push([AppleX, AppleY]);
        AppleBlock();
    }

    for (let i = Snake.length-1; i > 0; i--) {
        Snake[i] = Snake[i-1];
    }
    if (Snake.length) {
        Snake[0] = [SnakeX, SnakeY];
    }

    ctx.fillStyle="blue";
    SnakeX += TempoX * BlockSize;
    SnakeY += TempoY * BlockSize;
    ctx.fillRect(SnakeX, SnakeY, BlockSize, BlockSize);
    for (let i = 0; i < Snake.length; i++) {
        ctx.fillRect(Snake[i][0], Snake[i][1], BlockSize, BlockSize);
    }

    //slang gaat dood als hij uit de border gaat

    if (SnakeX < 0 || SnakeX > columns*BlockSize || SnakeY < 0 || SnakeY > rows*BlockSize) {
        death = true;
    }

    //slang gaat dood als hij zichzelf aanraakt
    
    for (let i = 0; i < Snake.length; i++) {
        if (SnakeX == Snake[i][0] && SnakeY == Snake[i][1]) {
            death = true;
        }
    }
}


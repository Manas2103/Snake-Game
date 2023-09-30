let snakeArr = [{x:15 , y:16}];
let a = 2;
let b = 16;
food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
let lastPaint = 0;
let inputDir = {x : 0, y : 0};
let score = 0;
let speed = 10;
const gameAudio = new Audio('music/music.mp3');
const moveAudio = new Audio('music/move.mp3');
const gameOver = new Audio('music/gameover.mp3');
const eat = new Audio('music/food.mmp3');



function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaint)/1000 < 1/speed){
        return;
    }
    lastPaint = ctime;
    gameAudio.play();
    gameEngine();
}


function isCollide(snakeArr){
    if(snakeArr[0].x >= 18 || snakeArr[0].y >= 18 ||snakeArr[0].x <= 0 || snakeArr[0].y <= 0){
        return true;
    }

    for(let i = 1; i < snakeArr.length; i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    return false;
}

function gameEngine(){
    console.log("hi");
    gameAudio.play();
    if(isCollide(snakeArr)){
        alert("Game Over, Press any key to continue");
        speed = 10;
        score = 0;
        scoreBox.innerHtml = "Score: " + score;
        inputDir = {x:0, y:0};
        snakeArr = [{x : 15, y : 16}];
    }

    if(snakeArr[0].x == food.x && snakeArr[0].y == food.y){
        eat.play();
        console.log(food);
        speed += 0.5;
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }

        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y : snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }

    //printing the snake and food
     // 1. snake printing:

    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement); 
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


gameAudio.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0, y:0}
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break
        default:
            break;    
    }
});
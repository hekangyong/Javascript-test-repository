var map = document.getElementById("snake_map");
var score = document.getElementById("score");
var row = 25,       //地图的高总共有多少个格子
    col = 20;       //地图的宽总共有多少个格子
var rowHeight = row * 20 + "px",          //地图的高度
    colWidth = col * 20 + "px";           //地图的宽度
map.style.width = colWidth;             //将colWidth定义到map的css中
map.style.height = rowHeight;           //将rowHeight定义到map的css中
var snake_map_arr = [];                 //定义一个数组，用来储存地图的所有格子

/* 
 *  第一个for循环用来循环新建地图的竖排的表格
 *  第二个for循环用来循环新建一行中的每一个格子
 */
for (var i = 0; i < row; i++) {
    var rowNumber = document.createElement("div");     //新建一个div并定一个rowNumber的变量
    rowNumber.className = "row";                        //给rowNumber的变量定义一个row的class
    map.appendChild(rowNumber);                         //将rowNumber插入map中
    var row_Arr = [];                                   //定义一个row_Arr的数组
    for (var a = 0; a < col; a++) {
        var colNumber = document.createElement("div");  //新建一个div并定一个colNumber的变量
        colNumber.className = "col";                    //给colNumber的变量定义一个col的class
        rowNumber.appendChild(colNumber);               //将colNumber插入rowNumber中
        row_Arr.push(colNumber);                        //将colNumber插入的row_Arr的数组中
    }
    snake_map_arr.push(row_Arr);                        //将row_Arr插入到snake_map_arr的数组
}
console.log(row_Arr);
console.log(snake_map_arr);

var snake = [];                                         //定义一个snake的数组，这个数组是用来存储蛇的身体的数组
for (var z = 0; z < 3; z++) {                           //这个for循环是用来创建蛇身体的
    snake_map_arr[0][z].className = 'col activeSnake';  
    snake[z] = snake_map_arr[0][z];
}

var x = 2,
    y = 0;
var eggx = 0,
    eggy = 0;
var soutscore = 0;
var changDiv = true;
var direction = 'right';
var delayTimer = null;

document.onkeydown = function (event) {
    if (!changDiv) {
        return;
    }
    if (direction == 'right' && event.keyCode == 37) {
        return;// 终止事件执行
    }
    if (direction == 'left' && event.keyCode == 39) {
        return;
    }
    if (direction == 'up' && event.keyCode == 40) {
        return;
    }
    if (direction == 'down' && event.keyCode == 38) {
        return;
    }
    switch (event.keyCode) {
        case 37:
            direction = 'left';// 向左
            break;
        case 38:
            direction = 'up';// 向上;
            break;
        case 39:
            direction = 'right';// 向右
            break;
        case 40:
            direction = 'down';// 向下
            break;
    }
    changDiv = false;
    delayTimer = setTimeout(function () {
        changDiv = true;
    }, 300);
}

function snakeMove() {
    switch (direction) {
        case 'left':
            x--;
            break;
        case 'right':
            x++;
            break;
        case 'up':
            y--;
            break;
        case 'down':
            y++;
            break;
    }
    if (x < 0 || y < 0 || y >= row || x >= col) {
        alert("游戏结束");
        clearInterval(moveTime);
        return;
    }
    for (var i = 0; i < snake.length; i++) {
        if (snake[i] == snake_map_arr[y][x]) {
            alert("游戏结束");
            clearInterval(moveTime);
            return;
        }
    }
    if (snake_map_arr[eggY][eggX] == snake_map_arr[y][x]) {
        snake_map_arr[eggY][eggX].className = 'col activeSnake';
        snake.push(snake_map_arr[eggY][eggX]);
        soutscore++;
        score.innerHTML = soutscore;
        createEgge();
    }else{
        snake[0].className = "col",
        snake.shift();
        snake_map_arr[y][x].className = "col activeSnake";
        snake.push(snake_map_arr[y][x]);
    }
}
var moveTime = setInterval('snakeMove()', 300);

function randoam(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createEgge() {
    eggX = randoam(0, col - 1);
    eggY = randoam(0, row - 1);
    if (snake_map_arr[eggY][eggX].className == 'col activeSnake') {
        createEgge();
    } else {
        snake_map_arr[eggY][eggX].className = 'col egg';
    }

}
createEgge();

var pause = document.getElementById('Pause');
var start = document.getElementById('Start');
var refresh = document.getElementById('Refresh');
var speed = document.getElementById('Speed');
// 添加暂停按钮
pause.onclick = function () {
    clearInterval(moveTime);
};
// 添加开始按钮
start.onclick = function () {
    clearInterval(moveTime);
    moveTime = setInterval('snakeMove()', speed1);
};
// 添加刷新按钮
refresh.onclick = function () {
    window.location.reload();
};
// 添加加速按钮
var speed1 = 300;
speed.onclick = function () {
    speed1 -= 20;
    clearInterval(moveTime);
    moveTime = setInterval('snakeMove()', speed1);
};
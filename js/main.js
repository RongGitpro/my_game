var board = new Array();
var hasConflicted = new Array();
var score = 0;

// $(function () {
//     newgame();
// });

let touchStartX = 0;
let touchStartY = 0;

$(function () {
    newgame();

    // 添加触摸事件
    $('#grid-container').on('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    });

    $('#grid-container').on('touchmove', function(event) {
        event.preventDefault(); // 防止页面滚动
    });

    $('#grid-container').on('touchend', function(event) {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // 水平移动
            if (deltaX > 0) {
                moveRight(); // 向右移动
            } else {
                moveLeft(); // 向左移动
            }
        } else {
            // 垂直移动
            if (deltaY > 0) {
                moveDown(); // 向下移动
            } else {
                moveUp(); // 向上移动
            }
        }
    });
});

//左边的移动函数
function moveLeft() {
    if (!canMove(board)) return;

    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                let targetIndex = j;
                while (targetIndex > 0 && board[i][targetIndex - 1] === 0) {
                    board[i][targetIndex - 1] = board[i][targetIndex];
                    board[i][targetIndex] = 0;
                    targetIndex--;
                }
                if (targetIndex > 0 && board[i][targetIndex - 1] === board[i][targetIndex] && !hasConflicted[i][targetIndex - 1]) {
                    board[i][targetIndex - 1] += board[i][targetIndex];
                    board[i][targetIndex] = 0;
                    hasConflicted[i][targetIndex - 1] = true; // 标记合并过的方块
                }
            }
        }
    }
    generateOneNumber();
    updateBoardView();
}

//右边的移动函数
function moveRight() {
    if (!canMove(board)) return;

    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                let targetIndex = j;
                while (targetIndex < 3 && board[i][targetIndex + 1] === 0) {
                    board[i][targetIndex + 1] = board[i][targetIndex];
                    board[i][targetIndex] = 0;
                    targetIndex++;
                }
                if (targetIndex < 3 && board[i][targetIndex + 1] === board[i][targetIndex] && !hasConflicted[i][targetIndex + 1]) {
                    board[i][targetIndex + 1] += board[i][targetIndex];
                    board[i][targetIndex] = 0;
                    hasConflicted[i][targetIndex + 1] = true; // 标记合并过的方块
                }
            }
        }
    }
    generateOneNumber();
    updateBoardView();
}

//向上的移动函数
function moveUp() {
    if (!canMove(board)) return;

    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (board[i][j] !== 0) {
                let targetIndex = i;
                while (targetIndex > 0 && board[targetIndex - 1][j] === 0) {
                    board[targetIndex - 1][j] = board[targetIndex][j];
                    board[targetIndex][j] = 0;
                    targetIndex--;
                }
                if (targetIndex > 0 && board[targetIndex - 1][j] === board[targetIndex][j] && !hasConflicted[targetIndex - 1][j]) {
                    board[targetIndex - 1][j] += board[targetIndex][j];
                    board[targetIndex][j] = 0;
                    hasConflicted[targetIndex - 1][j] = true; // 标记合并过的方块
                }
            }
        }
    }
    generateOneNumber();
    updateBoardView();
}

//向下的移动函数
function moveDown() {
    if (!canMove(board)) return;

    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (board[i][j] !== 0) {
                let targetIndex = i;
                while (targetIndex < 3 && board[targetIndex + 1][j] === 0) {
                    board[targetIndex + 1][j] = board[targetIndex][j];
                    board[targetIndex][j] = 0;
                    targetIndex++;
                }
                if (targetIndex < 3 && board[targetIndex + 1][j] === board[targetIndex][j] && !hasConflicted[targetIndex + 1][j]) {
                    board[targetIndex + 1][j] += board[targetIndex][j];
                    board[targetIndex][j] = 0;
                    hasConflicted[targetIndex + 1][j] = true; // 标记合并过的方块
                }
            }
        }
    }
    generateOneNumber();
    updateBoardView();
}



function newgame() {
	if($('#gameover')){
		$('#gameover p').remove();
	    $('#gameover span').remove();
	    $('#gameover a').remove();
	    $('#gameover').remove();
	};
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function restartgame() {
    $('#gameover p').remove();
    $('#gameover span').remove();
    $('#gameover a').remove();
    $('#gameover').remove();
    newgame();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
    $('#score').text(0);
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j);

            if (board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 50);
                numberCell.css("left", getPosLeft(i, j) + 50);
            } else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;
        }
    }

    $(".number-cell").css("line-height", "100px");
    $(".number-cell").css("font-size", "60px");
}

function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }
    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randx][randy] == 0) {
            break;
        }
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
    }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    ShowNumberWithAnimation(randx, randy, randNumber);

    return true;
}

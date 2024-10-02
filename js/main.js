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

function moveLeft() {
    // 实现向左移动的逻辑
    // 调用合并和更新的相关函数
    updateBoardView(); // 更新视图
}

function moveRight() {
    // 实现向右移动的逻辑
    // 调用合并和更新的相关函数
    updateBoardView(); // 更新视图
}

function moveUp() {
    // 实现向上移动的逻辑
    // 调用合并和更新的相关函数
    updateBoardView(); // 更新视图
}

function moveDown() {
    // 实现向下移动的逻辑
    // 调用合并和更新的相关函数
    updateBoardView(); // 更新视图
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

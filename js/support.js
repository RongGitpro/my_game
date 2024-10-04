function getPosTop(i, j) {  // 定义一个函数，用于计算单元格的顶部位置
    return 20 + i * 120;    // 返回顶部位置，20为边距，i为行索引，120为单元格的高度
}

function getPosLeft(i, j) { // 定义一个函数，用于计算单元格的左侧位置
    return 20 + j * 120;    // 返回左侧位置，20为边距，j为列索引，120为单元格的宽度
}

function getNumberBackgroundColor(number) { // 定义一个函数，根据数字返回对应的背景颜色
    switch (number) {   // 根据数字的不同选择颜色
        case 2:
            return "#eee4da";   // 返回对应的颜色
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65"
    }
    return "white";
}

function nospace(board) {   // 检查棋盘是否还有空位
    for (var i = 0; i < 4; i++) {   // 遍历行
        for (var j = 0; j < 4; j++) {   // 遍历列
            if (board[i][j] == 0) {     // 如果当前单元格为空 0
                return false;   // 返回false，表示还有空位
            }
        }
    }
    return true;    // 如果没有空位，返回true
}

function nomove(board) {    // 检查棋盘上是否还有可移动的数字
    // 检查四个方向是否可以移动
    if (canMoveDown(board) || canMoveLeft(board) || canMoveRight(board) || canMoveUp(board)) {
        return false;   // 如果任何方向可以移动着返回false
    }
    return true;
}

// 判断该方向是否可以移动
function canMoveLeft(board) {   // 检查棋盘是否可以向次方向移动
    for (var i = 0; i < 4; i++) {   // 遍历每一行（i表示行的索引）
        for (var j = 1; j < 4; j++) {   // 从第二列开始遍历（j表示列索引）
            if (board[i][j] != 0) {     // 如果当前单元格不为空
                // 检查左侧单元格是否为空或与当前单元格的值相同
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;    // 如果可以移动（左侧为空或可以合并），返回true
                }
            }
        }
    }
    return false;   // 如果没有找到可以移动的情况，返回false
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 判断块与块之间是否存在阻挡
function noBlokCol(row, col1, col2, board) {    // 定义一个函数，检查在同一行中col1和col2之间的列是否有阻挡物
    for (var i = col1 + 1; i < col2; i++) {     // 遍历col1+1到col2的列
        if (board[row][i] != 0) {       // 如果有任何一个单元格不为空
            return false;       // 返回false表示有阻挡物
        }
    }
    return true;        // 如果所有单元格都为空，返回true，表示没有阻挡物
}

function noBlokRow(row1, row2, col, board) {        // 定义一个函数，检查在同一列中row1和row2之间的行是否有阻挡物
    for (var i = row1 + 1; i < row2; i++) {     // 遍历row1+1到row2的行
        if (board[i][col] != 0) {       // 如果有任何一个单元格不为空
            return false;       // 返回false，表示有阻挡物
        }
    }
    return true;        // 如果所有单元格都为空，返回true，表示没有阻挡物
}

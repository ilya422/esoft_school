const game_field = document.querySelector(".game-field");
const lable = document.querySelector(".text");
let cells = document.getElementsByClassName("game-field_cell");
let n = 3;
let count = 0;
let win = [];
let game_end = false;
let last_choise = [];
last_choise.length = n * n;

window.onload = load_game();
function load_game() {
    game_field.style.gridTemplateColumns = `repeat(${n}, auto)`;
    for (i = 0; i < n * n; i++) {
        document.querySelector(".game-field").innerHTML += '<div class="game-field_cell" id="null""></div>';
    }

    win.length = 2 * n + 2;
    for (i = 0; i < win.length; i++)
        win[i] = [];

    for (i = 0; i < n; i++)
        for (j = 0; j < n; j++)
            win[i][j] = j + n * i;

    for (i = 0; i < n; i++)
        for (j = 0; j < n; j++)
            win[i + n][j] = i + n * j;

    for (i = 0; i < n; i++)
        win[n + n][i] = i * n + i;

    for (i = 0; i < n; i++)
        win[n + n + 1][i] = (n - 1) * (i + 1);
}

function add_n() {
    if (n > 2) {
        n++;
        reset();
        document.querySelector(".game-field").innerHTML = "";
        load_game();
    }
}

function delete_n() {
    if (n > 2) {
        n--;
        reset();
        document.querySelector(".game-field").innerHTML = "";
        load_game();
    }
}

function reset() {
    count = 0;
    lable.innerHTML = "Ходят крестики";
    game_end = false;
    for (i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
        cells[i].style.background = "white";
    }
}

function back() {
    if (count > 0 && game_end == false) {
        count--;
        last_choise[count].id == "x" ? lable.innerHTML = "Ходят крестики" : lable.innerHTML = "Ходят нолики";
        last_choise[count].id = "null";
        last_choise[count].innerHTML = "";
    }
    else if (count > 0 && game_end == true) {
        count--;
        last_choise[count].id == "x" ? lable.innerHTML = "Ходят крестики" : lable.innerHTML = "Ходят нолики";
        last_choise[count].id = "null";
        last_choise[count].innerHTML = "";
        game_end = false;
        for (i = 0; i < cells.length; i++) {
            cells[i].style.background = "white";
        }
    }
}

function check() {
    check_count_x = 0;
    check_count_o = 0;
    for (i = 0; i < win.length; i++) {
        for (j = 0; j < n; j++) {
            if (cells[win[i][j]].id == "x")
                check_count_x++;
            else if (cells[win[i][j]].id == "o")
                check_count_o++;
        }

        if (check_count_x == n) {
            game_end = true;
            for (j = 0; j < n; j++) {
                cells[win[i][j]].style.background = "red";
            }
            lable.innerHTML = "Победили кристики";
        }
        else if (check_count_o == n) {
            game_end = true;
            for (j = 0; j < n; j++) {
                cells[win[i][j]].style.background = "red";
            }
            lable.innerHTML = "Победили нолики";
        }
        check_count_x = 0;
        check_count_o = 0;
    }
}

game_field.addEventListener('click', e => {
    if (e.target.className == "game-field_cell" && e.target.innerHTML == "") {
        if (count % 2 == 0 && game_end == false) {
            e.target.innerHTML = document.getElementById("cross").outerHTML;
            e.target.id = 'x';
            last_choise[count] = e.target;
            lable.innerHTML = "Ходят нолики";
            count++;
            check()
        }
        else if (count % 2 == 1 && game_end == false) {
            e.target.innerHTML = document.getElementById("circle").outerHTML;
            e.target.id = 'o';
            last_choise[count] = e.target;
            lable.innerHTML = "Ходят крестики";
            count++;
            check()
        }

        if (count >= n * n && game_end == false) {
            lable.innerHTML = "Ничья"
            game_end = true;
        }
    }
});
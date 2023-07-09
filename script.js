//board and snake, food size 
let block = 20;
let block_width = 25;
let block_height = 25;

// element variable
let board = document.querySelector('.body');
let snake_head = document.querySelector('.snake_head');
let snake_food = document.querySelector('.snake_food');
let snake_body = document.querySelectorAll('.snake_body');
let snake_body_array = Array.from(snake_body);


//direction
let x = 0;
let y = 0;

// snakes starting position and body element
let snake_head_position = [block *4, block * 5];

//snake movement
let velocity_y = 0;
let velocity_x = 0;

//score board

let score = 0;

/***************game function***************/
/*********snake food****** */

snake_food.style.width = `${block}px`;
snake_food.style.height = `${block}px`;
snake_food.style.top = `${block * Math.ceil((block_height-1) * Math.random())}px`;
snake_food.style.left = `${block * Math.ceil((block_width-1) * Math.random())}px`;


// board style
board.style.width = `${block * block_width}px`;
board.style.height = `${block * block_height}px`;


//snake head style
snake_head.style.width = `${block}px`;
snake_head.style.height = `${block}px`;




/*********main function******** */

let game_loop = () => {
    /*********snake ******* */

    //snake head movement
    velocity_y += (y * block);
    velocity_x += (x * block);

    // TO READ THE VALUE OF HEAD BEFORE UPDATE;
    let snake_body_from_top = snake_head.style.top;
    let snake_body_from_left = snake_head.style.left;

    snake_head.style.top = `${snake_head_position[0] + velocity_y}px`;
    snake_head.style.left = `${snake_head_position[1] + velocity_x}px`;


    snake_body = document.querySelectorAll('.snake_body');
    snake_body_array = Array.from(snake_body);

     // Snake body style

    snake_body_array.forEach((snake_body_each) => {
        snake_body_each.style.width = `${block}px`;
        snake_body_each.style.height = `${block}px`;
    });

    // first movement

    for (let index = snake_body_array.length - 1; index > 0; index--) {
        snake_body_array[index].style.top = snake_body_array[index - 1].style.top;
        snake_body_array[index].style.left = snake_body_array[index - 1].style.left;
    }

    //the first snake body movement
    snake_body_array[0].style.top = snake_body_from_top;
    snake_body_array[0].style.left = snake_body_from_left;




    /*********snake eating food********/

    if (snake_food.style.top == snake_head.style.top && snake_food.style.left == snake_head.style.left) {
        food_placement();
        score += 1;
        document.querySelector('.score').innerHTML = `<h1> Score : ${score}</h1>`;
        
        let snake_body_add = document.createElement('div');
        snake_body_add.className = 'snake_body';
        board.appendChild(snake_body_add);
    }

    /***********snake collaiding******* */

    // if touches the boundary or touches own body

    // Check if snake head reaches the board boundaries
    if (
        snake_head.offsetLeft < 0 ||
        snake_head.offsetLeft + snake_head.offsetWidth > board.offsetWidth ||
        snake_head.offsetTop < 0 ||
        snake_head.offsetTop + snake_head.offsetHeight > board.offsetHeight
    ) {
        console.log("Snake collided with the boundaries.");
        window.location.reload();
    }
}

//********Function for (snake after eating food)********* */

let food_placement = () => {
    snake_food.style.top = `${block * Math.ceil((block_height-1) * Math.random())}px`;
    snake_food.style.left = `${block * Math.ceil((block_width-1) * Math.random())}px`;
};


/****************main logic************/


window.addEventListener('keydown', (event) => {

    let key = event.key;
    switch (key) {
        case "ArrowUp":
            if(y != 1){
                y = -1;
                x = 0;
            }
            break;

        case "ArrowDown":
            if(y != -1){
                y = 1;
                x = 0;
            }
            break;

        case "ArrowRight":
            if ( x != -1) {
                y = 0;
                x = 1;
            }
            break;

        case "ArrowLeft":
            if ( x != 1) {
                y = 0;
                x = -1;
            }
            break;
    }

});

/*************game loop************ */
setInterval(game_loop, 200);

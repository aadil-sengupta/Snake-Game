
var c = document.getElementById('MainCanvas')
var ctx = c.getContext("2d");


//ctx.fillRect(0, 0, c.width, c.height);

// ctx.fillStyle = "white";
// ctx.fillRect(0,0,25,25)
// ctx.stroke()


let randomSquare = () => {
    let x = Math.floor(Math.random() * 16) + 1;
    let y = Math.floor(Math.random() * 16) + 1;
    console.log(`(${x}, ${y})`)
    return {x,y}
}

let generateGrid = () => {
    ctx.lineWidth = 0.25;
    for(let i = 0; i <=17; i++){
        ctx.moveTo(0,i*25)
        ctx.lineTo(17*25,i*25)
    }
    for(let i = 0; i <=17; i++){
        ctx.moveTo(i*25,0)
        ctx.lineTo(i*25, 17*25)
    }
    ctx.stroke()
}

//generateGrid()




ctx.fillStyle = "green";
ctx.fillRect(8*25,9*25, 25,25)
ctx.stroke()

let firstPress = false;
let direction = null;
let directionFruit1 = null;
let directionFruit2 = null;
let currentPosition = [{x: 8, y: 9}]
let PlayerLength = 1;
let fruitLocation;
let fruit2Location;
let score = 0;

let GenerateFruit = () => {
    let {x,y} = randomSquare()
    fruitLocation = {x: x, y: y}
    ctx.fillStyle = "red";
    ctx.fillRect(x*25,y*25, 25,25)
    ctx.stroke()
}

let GenerateFruit2 = () => {
    let {x,y} = randomSquare()
    fruit2Location = {x: x, y: y}
    ctx.fillStyle = "blue";
    ctx.fillRect(x*25,y*25, 25,25)
    ctx.stroke()
}

GenerateFruit()
GenerateFruit2()

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    
    if (e.keyCode == '38') {
        // up arrow
        console.log('up')
        firstPress = true
        if (direction == 'down' && PlayerLength > 1){
            return
        }
        direction = 'up';
        
    }
    else if (e.keyCode == '40') {
        // down arrow
        console.log('down')
        firstPress = true
        if (direction == 'up' && PlayerLength > 1){
            return
        }
        direction = 'down';
    }
    else if (e.keyCode == '37') {
       // left arrow
       console.log('left')
       firstPress = true
       if (direction == 'right' && PlayerLength > 1){
        return
        }
       direction = 'left';
    }
    else if (e.keyCode == '39') {
       // right arrow
       console.log('right')
       firstPress = true
       if (direction == 'left' && PlayerLength > 1){
        return
    }
       direction = 'right';

    } else if (e.keyCode == '87') { // w
        console.log('Fruit 1 up')
        

        directionFruit1 = 'up';

    } else if (e.keyCode == '83') { // s
        console.log('Fruit 1 down')

        directionFruit1 = 'down';
    } else if (e.keyCode == '65') { // a
        console.log('Fruit 1 left')

        directionFruit1 = 'left';
    } else if (e.keyCode == '68') { // d
        console.log('Fruit 1 right')
        directionFruit1 = 'right';
    } else if (e.keyCode == '73') { // i
        console.log('Fruit 2 up')
        directionFruit2 = 'up';
    } else if (e.keyCode == '75') { // k
        console.log('Fruit 2 down')
        directionFruit2 = 'down';
    } else if (e.keyCode == '74') { // j
        console.log('Fruit 2 left')
        directionFruit2 = 'left';
    } else if (e.keyCode == '76') { // l
        console.log('Fruit 2 right')
        directionFruit2 = 'right';
    }
}

let movePlayer = () => {
    if (!firstPress) {
        return
    }
    console.log('move')
    
    firstSquare = currentPosition.at(-1)
    //remove green player square

    if (direction == 'up') {firstSquare = {x: firstSquare.x, y: firstSquare.y-1}} else if (direction == 'down') {firstSquare = {x: firstSquare.x, y: firstSquare.y+1}}  else if (direction == 'right') {firstSquare = {x: firstSquare.x+1, y: firstSquare.y}}  else if (direction == 'left') {firstSquare = {x: firstSquare.x-1, y: firstSquare.y}}
    if (firstSquare.x > 16 || firstSquare.y > 16 || firstSquare.x < 0 || firstSquare.y < 0) {
        location.reload()
    }

    currentPosition.forEach((item) => {
        if (item.x == firstSquare.x && item.y == firstSquare.y){
            location.reload()
        }
    })

    currentPosition.push(firstSquare)
    
    // Track if fruits were eaten this frame
    let fruit1Eaten = false;
    let fruit2Eaten = false;
    
    // Check collision with fruits BEFORE they move
    if (fruitLocation.x == firstSquare.x && fruitLocation.y == firstSquare.y){
        console.log('Red fruit eaten! Snake at:', firstSquare, 'Fruit at:', fruitLocation);
        PlayerLength += 1;
        document.getElementById('counter').innerHTML = PlayerLength-1;
        fruit1Eaten = true;
        GenerateFruit()
    }

    if (fruit2Location.x == firstSquare.x && fruit2Location.y == firstSquare.y){
        console.log('Blue fruit eaten! Snake at:', firstSquare, 'Fruit at:', fruit2Location);
        PlayerLength += 1;
        document.getElementById('counter').innerHTML = PlayerLength-1;
        fruit2Eaten = true;
        GenerateFruit2()
    }

    // Move fruit based on directionFruit1 AFTER collision detection (only if not eaten)
    if (directionFruit1 && !fruit1Eaten) {
        // Clear the old fruit position
        ctx.fillStyle = "white";
        ctx.fillRect(fruitLocation.x*25, fruitLocation.y*25, 25, 25);
        ctx.stroke();
        
        // Update fruit position
        if (directionFruit1 == 'up') {
            fruitLocation = {x: fruitLocation.x, y: fruitLocation.y-1};
        } else if (directionFruit1 == 'down') {
            fruitLocation = {x: fruitLocation.x, y: fruitLocation.y+1};
        } else if (directionFruit1 == 'right') {
            fruitLocation = {x: fruitLocation.x+1, y: fruitLocation.y};
        } else if (directionFruit1 == 'left') {
            fruitLocation = {x: fruitLocation.x-1, y: fruitLocation.y};
        }
        
        // Check if fruit went out of bounds
        if (fruitLocation.x > 16 || fruitLocation.y > 16 || fruitLocation.x < 0 || fruitLocation.y < 0) {
            location.reload();
        }
        
        // Draw fruit in new position
        ctx.fillStyle = "red";
        ctx.fillRect(fruitLocation.x*25, fruitLocation.y*25, 25, 25);
        ctx.stroke();
    }

    // Move fruit2 based on directionFruit2 AFTER collision detection (only if not eaten)
    if (directionFruit2 && !fruit2Eaten) {
        // Clear the old fruit2 position
        ctx.fillStyle = "white";
        ctx.fillRect(fruit2Location.x*25, fruit2Location.y*25, 25, 25);
        ctx.stroke();
        
        // Update fruit2 position
        if (directionFruit2 == 'up') {
            fruit2Location = {x: fruit2Location.x, y: fruit2Location.y-1};
        } else if (directionFruit2 == 'down') {
            fruit2Location = {x: fruit2Location.x, y: fruit2Location.y+1};
        } else if (directionFruit2 == 'right') {
            fruit2Location = {x: fruit2Location.x+1, y: fruit2Location.y};
        } else if (directionFruit2 == 'left') {
            fruit2Location = {x: fruit2Location.x-1, y: fruit2Location.y};
        }
        
        // Check if fruit2 went out of bounds
        if (fruit2Location.x > 16 || fruit2Location.y > 16 || fruit2Location.x < 0 || fruit2Location.y < 0) {
            location.reload();
        }
        
        // Draw fruit2 in new position
        ctx.fillStyle = "blue";
        ctx.fillRect(fruit2Location.x*25, fruit2Location.y*25, 25, 25);
        ctx.stroke();
    }

    if (currentPosition.length > PlayerLength){
        lastSquare = currentPosition.shift()
        ctx.fillStyle = "white";
        ctx.fillRect(lastSquare.x*25,lastSquare.y*25, 25,25)
        ctx.stroke()   
    }
    console.log(currentPosition)

    ctx.fillStyle = "green";
    ctx.fillRect(firstSquare.x*25,firstSquare.y*25, 25,25)
    ctx.stroke()
}

var gameId = window.setInterval(movePlayer, 150)
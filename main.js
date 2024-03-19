import {Character} from './character.js';
import {Platform} from './platform.js';

// Configuración inicial
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let rightPressed = false;
let leftPressed = false;

let sprite = new Image();
sprite.src = 'adventurer.png';

let level1 = new Image();
level1.src = 'level1/level1.png';

let startButton = document.querySelector('#startButton');
startButton.addEventListener('click', function() {
    // Reproduce y pausa todos los sonidos para "desbloquear" el audio
    // Ahora puedes comenzar el juego...
    draw();
});



const character = new Character(ctx, canvas);
const platform = new Platform(ctx, canvas, character);



document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
 // movimientos del personaje 

 function keyDownHandler(e) {
    var maxSpeed = 2; 
    var acceleration = 1; 
    var initialSpeed = 2; 
    var jumpStrength = 10; 


    if(e.key === "ArrowRight") {
        rightPressed = true;
    }
    if(e.key === "ArrowLeft") {
        leftPressed = true;
    }


    if( leftPressed &&  rightPressed) { 
        leftPressed = false;
        rightPressed = false;
        character.dx = 0;
    }else{
        if(e.key === "ArrowRight") {
            rightPressed = true;
            if (character.dx <= 0) { 
                character.dx = initialSpeed; // velocidad inicial
            } else if (character.dx < maxSpeed) { // 
                character.dx += acceleration; // Aumenta la velocidad derecha
            }
        }
        if(e.key === "ArrowLeft") {
            leftPressed = true;
            if (character.dx >= 0) { 
                character.dx = -initialSpeed; // velocidad inicial
            } else if (character.dx > -maxSpeed) { // 
                character.dx -= acceleration; // Aumenta la velocidad izquierda
            }
        }

    }

    if(e.key === "ArrowUp") { 
        if(character.onGround === true)
        character.dy = -jumpStrength  // Hace que la pelota salte
    }
}

function keyUpHandler(e) {
  
    if(e.key === "ArrowRight") {
      rightPressed = false;
      character.dx = 0;
    }else if(e.key === "ArrowLeft") {
      leftPressed = false;
      character.dx = 0;
    }

}

const parsedCollisions = collisionsLevel1.parse2D()
const collisionBlock = parsedCollisions.createObjectsFrom2D()

// Función para actualizar el juego cada frame
function draw() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(144, 187, 133, 0.87)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(level1, 0, 0, canvas.width, canvas.height);



    collisionsLevel1.foreach(collisionsLevel1=>collisions.draw());

    // Dibujar el personaje
    character.draw();
    //platform.draw();

    //choques
    //plataformXcharacter();
    //platform.movePlatform();

    if (character.onGround === false) {
        character.jumpPressed();
    } else if (rightPressed || leftPressed) {
        character.sidesPressed();
    } else {
        character.noMovement();
    }
    
    

    requestAnimationFrame(draw);
}



function plataformXcharacter(){
    if(platform.checkCollision(character)) {
        if(character.dy > 0) { // si la bola esta arriba de la plataforma
            character.dy = 0;
            character.y = platform.y - character.characterHeight; // Asegura que la bola se mantenga encima de la plataforma
        } else if(character.dy < 0) { // Si la bola está abajo de la plataforma
            character.dy = 0;
            character.y = platform.y + platform.height; // Asegura que la bola se mantenga debajo de la plataforma
        }
    }

};


draw();

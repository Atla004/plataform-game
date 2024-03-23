import { Character } from './character.js';
import { Platform } from './platform.js';

// Configuración inicial
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Variables para el movimiento del personaje
let rightPressed = false;
let leftPressed = false;

//background
let level1 = new Image();
level1.src = 'level1/level1.png';


// bloques de colision
const parsedCollisions = collisionsLevel1.parse2D()
const collisionBlock = parsedCollisions.createObjectsFrom2D()

// Crear el personaje y la plataforma
const character = new Character(ctx, canvas );
const platform = new Platform(ctx, canvas, character);

// lo hace mas rapido
let startButton = document.querySelector('#startButton');
startButton.addEventListener('click', function() {
    draw();
});

// Event listeners para el movimiento del personaje
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

 // movimientos del personaje 
function keyDownHandler(e) {
    if(e.key === "ArrowRight") {
        rightPressed = true;
    }
    if(e.key === "ArrowLeft") {
        leftPressed = true;
    }


    if( leftPressed &&  rightPressed) { 
        leftPressed = false;
        rightPressed = false;
        character.velocidad.dx = 0;
    }else{
        if(e.key === "ArrowRight") {
            rightPressed = true;
            if (character.velocidad.dx <= 0) { 
                character.velocidad.dx = character.parameters.initialSpeed; // velocidad inicial
            } else if (character.velocidad.dx < character.parameters.maxSpeed) { // 
                character.velocidad.dx += character.parameters.acceleration; // Aumenta la velocidad derecha
            }
        }
        if(e.key === "ArrowLeft") {
            leftPressed = true;
            if (character.velocidad.dx >= 0) { 
                character.velocidad.dx = -character.parameters.initialSpeed; // velocidad inicial
            } else if (character.velocidad.dx > -character.parameters.maxSpeed) { // 
                character.velocidad.dx -= character.parameters.acceleration; // Aumenta la velocidad izquierda
            }
        }

    }

    if(e.key === "ArrowUp") { 
        if(character.onGround === true)
        character.velocidad.dy = -character.parameters.jumpStrength  // Hace que la pelota salte
    }
}

function keyUpHandler(e) {
  
    if(e.key === "ArrowRight") {
      rightPressed = false;
      character.velocidad.dx = 0;
    }else if(e.key === "ArrowLeft") {
      leftPressed = false;
      character.velocidad.dx = 0;
    }

}




// Función para actualizar el juego cada frame
function draw() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(144, 187, 133, 0.87)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(level1, 0, 0, canvas.width, canvas.height); //añadir el fondo


    collisionBlock.forEach(collisions => collisions.draw(ctx)); 
    // Dibujar el personaje
    character.draw();

    platform.draw();
    // platform.checkCollision(character);

    //choques

   



    


    
    // Llamar a la función draw() 60 veces por segundo
    requestAnimationFrame(draw);
}



draw();

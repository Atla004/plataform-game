import {Character} from './character.js';
import {Platform} from './platform.js';
// Configuración inicial
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
var gravity = 0.5; // Fuerza de gravedad

let rightPressed = false;
let leftPressed = false;

let sprite = new Image();

sprite.src = 'adventurer.png';

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




 
 
// Función para actualizar el juego cada frame
function draw() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(144, 187, 133, 0.87)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // Dibujar el personaje
    character.draw();
    platform.draw();

    //choques
    plataformXcharacter();
    movePlatform();

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
            character.y = platform.y - character.h; // Asegura que la bola se mantenga encima de la plataforma
        } else if(character.dy < 0) { // Si la bola está abajo de la plataforma
            character.dy = 0;
            character.y = platform.y + platform.height; // Asegura que la bola se mantenga debajo de la plataforma
        }
    }

};

function movePlatform(){
    platform.x += platform.movimiento;
    if (platform.x + platform.width> canvas.width || platform.x < 0) {
        platform.movimiento = -platform.movimiento;
    } 
};


draw();

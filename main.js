import { Character } from './clases/character.js';
import {  CollisionManager } from './clases/collisionmanager.js';
import { Platform } from './clases/platform.js';
import { levelCollision } from './clases/levelCollision.js';

const collisionsLevel1=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 0, 0,
    0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
    0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
    0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
    0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
    0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
    0, 0, 46, 46, 46, 0, 0, 46, 46, 46, 46, 46, 46, 46, 46, 0, 0,
    0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

const collisionsLevel2 = [105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105,
    105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105,
    105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 105,
    105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 105,
    105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 105,
    105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 0, 0, 0, 105,
    105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 105,
    105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 105,
    105, 0, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105,
    105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 105,
    105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 105,
    105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 0, 0, 105, 105, 105, 105, 105,
    105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 105,
    105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 105,
    105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105
];

// Configuración inicial
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Variables para el movimiento del personaje
let rightPressed = false;
let leftPressed = false;

//background
let level1 = new Image();
level1.src = 'levels/level1.png';
let levelsoundtrack = new Audio('soundtrack.wav');
levelsoundtrack.volume = 0.05;
levelsoundtrack.loop = true;

// lo hace mas rapido
let startButton = document.querySelector('#startButton');
startButton.addEventListener('click', function() {
    draw();
});

// bloques de colision
const map1 = new levelCollision(collisionsLevel1);
const collisionBlock = map1.collision();

// Crear el personaje y la plataforma y la colision
const character = new Character(ctx, canvas );
const platform = new Platform(ctx, canvas, character);
const colision = new CollisionManager(character, collisionBlock);


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
    levelsoundtrack.play();
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //añadir el fondo
    ctx.drawImage(level1, 0, 0, canvas.width, canvas.height); 

    // Dibujar el personaje
    character.draw();

    //colision.draw(ctx); //!dibuja los bloques de colision

    colision.applyCollision(ctx); //aplica las colisiones con el mapa

    // actualizar los valores de posicion del personaje par a el siguiente frame
     character.update();

    // Llamar a la función draw() 60 veces por segundo
    requestAnimationFrame(draw);
}



draw();

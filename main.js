import {Character} from './character.js';
import {Platform} from './platform.js';
// Configuración inicial
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
var gravity = 0.5; // Fuerza de gravedad



let sprite = new Image();

sprite.src = 'adventurer.png';

const character = new Character(ctx, canvas);
const platform = new Platform(ctx, canvas, character);


let keys = {
    ArrowRight: false,
    ArrowLeft: false,
};

document.addEventListener('keydown', function(e) {
    if (e.repeat) {
        return;  // Ignora el evento si es una repetición
    }
    if (e.key in keys) {
        keys[e.key] = true;
    }
    keyDownHandler(e);  // Llama a tu función existente
});

document.addEventListener('keyup', function(e) {
    if (e.key in keys) {
        keys[e.key] = false;
    }
    keyUpHandler(e);  // Llama a tu función existente
});

function keyDownHandler(e) {
    var maxSpeed = 2; 
    var acceleration = 1; 
    var initialSpeed = 2; 
    var jumpStrength = 10; 

    if(keys.ArrowRight && keys.ArrowLeft) {
        console.log("Ambas teclas están presionadas");
        // Ambas teclas están presionadas
        character.dx = 0;
        keys.ArrowRight = false;
        keys.ArrowLeft = false;
    } else if(keys.ArrowRight) {
        console.log("Tecla de flecha derecha está presionada");
        // Solo la tecla de flecha derecha está presionada
        if (character.dx <= 0) { 
            character.dx = initialSpeed; // velocidad inicial
        } else if (character.dx < maxSpeed) { 
            character.dx += acceleration; // Aumenta la velocidad derecha
        }
    } else if(keys.ArrowLeft) {
        console.log("Tecla de flecha izquierda está presionada");
        // Solo la tecla de flecha izquierda está presionada
        if (character.dx >= 0) { 
            character.dx = -initialSpeed; // velocidad inicial
        } else if (character.dx > -maxSpeed) { 
            character.dx -= acceleration; // Aumenta la velocidad izquierda
        }
    }

    if(e.key === "ArrowUp" && character.onGround === true) { 
        character.dy = -jumpStrength  // Hace que la pelota salte
    }
}

function keyUpHandler(e) {
    if(e.key === "ArrowRight" || e.key === "ArrowLeft") {
        character.dx = 0;
    }
    if(e.key === "ArrowRight"){
        console.log("Tecla de flecha derecha está suelta");
    }
    if(e.key === "ArrowLeft"){
        console.log("Tecla de flecha izquierda está suelta");
    }

    keyDownHandler(e);
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
    } else if (keys.ArrowRight || keys.ArrowLeft) {
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

import { Character } from './clases/character.js';
import {  CollisionManager } from './clases/collisionmanager.js';
import { Platform } from './clases/platform.js';
import { levelCollision } from './clases/levelCollision.js';

/*
Charcter (ctx, canvas,ancho del Personaje , Altura del Personaje)
    .draw() //dibuja el personaje
    .update() //actualiza la posicion del personaje

levelCollision (array de colisiones del nivel)
    .collision() //devuelve un array de colisiones para poder aplicarlas al CollisionManager

CollisionManager (Personaje,  bloque al que se le quiera aplicar colision) 
    .draw(ctx) //dibuja los bloques de colision
    .drawDoor(ctx) // Dibuja los bloques de colision de la puerta
    .applyCollision() //aplica las colisiones
    .applyDoor() // cuando estas dentro de la puerta retorna true

Platform (ctx, canvas, x, y, ancho, alto)
    .draw() //dibuja la plataforma
    .drawDoor() //dibuja la puerta
    .movePlatform() //mueve la plataforma
*/


// Configuración inicial
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Variables para el movimiento del personaje
let rightPressed = false;
let leftPressed = false;

//background
let levelbackground = new Image();

let levelsoundtrack = new Audio('soundtrack.wav');
levelsoundtrack.volume = 0.05;
levelsoundtrack.loop = true;

// lo hace mas rapido
let startButton = document.querySelector('#startButton');
startButton.addEventListener('click', function() {
    draw();
});

// Crear el personaje y la plataforma y la colision
const character = new Character(ctx, canvas,50,50 );

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
    if(e.key === "ArrowUp") { 
        if(character.onGround === true)
        character.velocidad.dy = -character.parameters.jumpStrength  // Hace que la pelota salte
    }
}

function keyUpHandler(e) {
  
    if(e.key === "ArrowRight") {
      rightPressed = false;
      character.velocidad.dx = 0;
    }
    if(e.key === "ArrowLeft") {
      leftPressed = false;
      character.velocidad.dx = 0;
    }

}

function movement(){
    if(rightPressed == true && leftPressed == true){
        character.velocidad.dx =0
        return
    }
    if(rightPressed == true) {
        if (character.velocidad.dx <= 0) { 
            character.velocidad.dx = character.parameters.initialSpeed; // velocidad inicial
        } 
    }
    if(leftPressed == true) {
        if (character.velocidad.dx >= 0) { 
            character.velocidad.dx = -character.parameters.initialSpeed; // velocidad inicial
        } 
    }
}

let change= false;
let level = 1;
let levels = {
    collision: {
        apply: ()=>{
            let levelCollision1 = new levelCollision(levels.collision[level]); // colisiones del mapa
            let collisionBlock = levelCollision1.collision(); // colisiones del mapa resueltas
            let colisionMapa = new CollisionManager(character, collisionBlock); // aplica las colisiones con  metodo applyCollision(ctx)
            colisionMapa.applyCollision(); //aplica las colisiones con el mapa
        },
        1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
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
        ],
        2:[19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19,
            19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19,
            19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 0, 0, 19,
            19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19,
            19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19,
            19, 0, 0, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19,
            19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 0, 0, 19, 19, 19, 19, 19,
            19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19,
            19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
    },
    1: {
        initx: 200,
        inity: 200,
        init:()=>{
            //Dibuja el fondo del nivel
            levelbackground.src = 'levels/level1.png';

            //Crea las colisiones del nivel
            levels.collision.apply(); 
            character.initx =     levels[level].initx // punto de partida del jugador
            character.inity =    levels[level].inity  // punto de partida del jugador

            // Crea Bloques de Colision de las plataformas            
            let platform1 = new Platform(ctx, canvas,250, 288, 100, 300); // crea plataforma ( la dibuja con metodo draw())
            let collisionplatform1 = new CollisionManager(character, platform1); // aplica las colisiones con  metodo applyCollision(ctx)
            
            //puerta
            let door = new Platform(ctx, canvas, 600, 250, 60, 38);  //crea la puerta ( la dibuja con metodo drawDoor()
            let colisionDoor = new CollisionManager(character, door); // aplica las colisiones con  metodo applyCollision(ctx)
            
            

            
            // Limpiar el canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            
            //añadir el fondo
            ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height); 
            
            
            door.drawDoor(); // dibuja la puerta
            character.draw(); //Dibuja el personaje
            
            platform1.draw(); //dibuja las plataformas

            // collisionplatform1.applyCollision(); //!aplica las colisiones de la plataforma


            //colisionDoor.drawDoor(ctx); //!dibuja el hitbox de la puerta
            
            

            // actualizar los valores de posicion del personaje par a el siguiente frame
            character.update();
            
            if(colisionDoor.applyDoor()){
                change= true;
            } //entro en la puerta

        }

    },
    2: {
        initx:60,
        inity:780,
        trigger: true,

        init:()=>{
            let radius = 100;

            
            levelbackground.src = 'levels/level2.png';

            levels.collision.apply();
            character.initx =     levels[level].initx // punto de partida del jugador
            character.inity =    levels[level].inity  // punto de partida del jugador

            //puerta
            let door = new Platform(ctx, canvas, 710, 415, 60, 33);  //crea la puerta ( la dibuja con metodo drawDoor()
            let colisionDoor = new CollisionManager(character, door); // aplica las colisiones con  metodo applyCollision(ctx)
            
            let plataforma1 = new Platform(ctx, canvas, 600, 360, 100, 200) //?
            let collisionplatform1 = new CollisionManager ( character,plataforma1); //?

            let plataform2 = new Platform(ctx, canvas, 450, 300, 10, 50) //?
            let collisionplatform2 = new CollisionManager ( character,plataform2); //?
            
            
            


            
            //añadir el fondo
            let x = character.position.x;
            let y = character.position.y;
            let width = character.position.width;
            let height = character.position.height;
            
            
            
            // Limpiar el canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            //TODO Creacion del circulo donde se va a ver el personaje 
            ctx.save();
            ctx.beginPath();
            ctx.arc(x+ width/2, y+ height/2, radius, 0, Math.PI * 2);
            ctx.clip(); 
            
            // Background
            ctx.drawImage(levelbackground, 0, 0);
            door.drawDoor(); // dibuja la puerta

            if(collisionplatform2.checkcollision()){
                levels[2].trigger = false;
            }
            
            if(levels[2].trigger){
                plataforma1.draw();
                collisionplatform1.applyCollision() //!colision de plataforma para evitar llegar al level 3
            }
            
            //TODO cierre del circulo donde se va a ver el personaje 
            ctx.restore();



            
            
            character.draw(); //Dibuja el personaje

            // actualizar los valores de posicion del personaje par a el siguiente frame
            character.update();
            
            if(colisionDoor.applyDoor()){
                level=0;
                change= true;
                levels[2].trigger = true;


            } //entro en la puerta

        }
    }
}

// Función para actualizar el juego cada frame
function draw() {
    //soundtrack
    levelsoundtrack.play();
    movement();




    //nivel
    levels[level].init();

    if (change){
        level++;
        character.position.x = levels[level].initx
        character.position.y = levels[level].inity 
        change = false;
    }





    // Llamar a la función draw() 60 veces por segundo
    requestAnimationFrame(draw);
}



draw();

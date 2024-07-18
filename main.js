import { Character } from './clases/character.js';
import {  CollisionManager } from './clases/collisionmanager.js';
import { Platform } from './clases/platform.js';
import { levelCollision } from './clases/levelCollision.js';

// Configuración inicial
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Variables para el estado del juego
let gameStarted = false;

// Función para mostrar la pantalla de inicio
function showStartScreen() {
    // Cargar la imagen de fondo
    const backgroundImage = new Image();
    backgroundImage.src = 'menu.png';
    backgroundImage.onload = function() {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        // Dibujar el texto y los botones
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Bienvenido a Mi Juego', canvas.width / 2, 100);
        
        // Botón "Empezar a jugar"
        ctx.fillRect(canvas.width / 2 - 100, 150, 200, 50);
        ctx.fillStyle = 'black';
        ctx.fillText('Empezar a jugar', canvas.width / 2, 185);

        // Botón "Opciones"
        ctx.fillRect(canvas.width / 2 - 100, 220, 200, 50);
        ctx.fillStyle = 'black';
        ctx.fillText('Opciones', canvas.width / 2, 255);

        // Botón "Cómo jugar"
        ctx.fillRect(canvas.width / 2 - 100, 290, 200, 50);
        ctx.fillStyle = 'black';
        ctx.fillText('Cómo jugar', canvas.width / 2, 325);

        // Botón "Salir"
        ctx.fillRect(canvas.width / 2 - 100, 360, 200, 50);
        ctx.fillStyle = 'black';
        ctx.fillText('Salir', canvas.width / 2, 395);
    };

    // Escuchar clics en el canvas para detectar botones
    canvas.addEventListener('click', function(event) {
        const x = event.clientX - canvas.getBoundingClientRect().left;
        const y = event.clientY - canvas.getBoundingClientRect().top;

        // Comprobar qué botón se ha clicado
        if (!gameStarted) {
            if (x >= canvas.width / 2 - 100 && x <= canvas.width / 2 + 100) {
                if (y >= 150 && y <= 200) {
                    // Botón "Empezar a jugar" clicado
                    startGame();
                } else if (y >= 220 && y <= 270) {
                    // Botón "Opciones" clicado
                    // Implementar la lógica para opciones si es necesario
                    console.log('Opciones clicado');
                } else if (y >= 290 && y <= 340) {
                    // Botón "Cómo jugar" clicado
                    // Implementar la lógica para instrucciones de juego si es necesario
                    console.log('Cómo jugar clicado');
                } else if (y >= 360 && y <= 410) {
                    // Botón "Salir" clicado
                    // Implementar la lógica para salir del juego si es necesario
                    console.log('Salir clicado');
                }
            }
        }
    });
}

// Función para iniciar el juego desde el botón "Empezar a jugar"
function startGame() {
    // Ocultar el botón de inicio y mostrar el canvas
    canvas.style.display = 'block';
    startButton.style.display = 'none';
    gameStarted = true; // Cambiar el estado del juego a iniciado

    // Inicializar el primer nivel del juego
    levels.changeLevel(0); // Cambia el número de nivel si es necesario
}

// Llamar a la función para mostrar la pantalla de inicio al cargar el juego
showStartScreen();

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

let platformlevel3 = new Platform(ctx, canvas, 490, 289, 210, 100,'rgb(61,34,11)');
let collisionplatformlevel3 = new CollisionManager(character, platformlevel3);
let count = 0;
let countdead = 2;
let change= false;
let level =1;

let levels = {
    marcador: () => {
        character.drawMenuCharacter(10,5,30,30);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px arial';
        ctx.fillText(`= ${countdead}`, 36, 27);
    },
    deathScreen: (x) => {
        if(count < 20){
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            //texto muerte
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.fillText(`Lives: ${countdead}`, canvas.width / 2, canvas.height / 2);

            //imagen personaje
            character.drawMenuCharacter(375,205,50,50);
            count++;
        } else {
            character.deadcomplete = false;
            countdead--;
            count = 0;
            x;
        }

    },
    collision: {
        apply: ()=>{
            let levelCollision1 = new levelCollision(levels.collision[level]); // colisiones del mapa
            let collisionBlock = levelCollision1.collision(); // colisiones del mapa resueltas
            let colisionMapa = new CollisionManager(character, collisionBlock); // aplica las colisiones con  metodo applyCollision(ctx)
            colisionMapa.applyCollision(); //aplica las colisiones con el mapa
        },
        1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
            0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0,
            0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
            0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
            0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
            0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
            0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
            0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
            0, 0, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 0, 0,
            0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ],
        2:[, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            46, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            46, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56,
            46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46],
        3:[9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
            9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
            9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
            9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
            9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
            9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
            9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
            9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
            9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
            9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9,
            9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0,
            9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0,
            9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0,
            9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0,
            0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0],

            4:[173,173,173,173,173,173,173,173,173,173,173,173,173,173,173,173,173,
                173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,173,
                173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,173,
                173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,173,
                173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,173,
                173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,173,
                173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,173,
                173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,173,
                173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,173,
                173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                173,173,0,0,0,0,0,0,0,0,0,0,0,0,0,173,173,
                173,173,0,0,0,0,0,0,0,0,0,0,0,0,0,173,173,
                173,173,0,0,0,0,0,0,0,0,0,0,0,0,0,173,173,
                173,173,0,0,0,0,0,0,0,0,0,0,0,0,0,173,173],
                5 :[91, 107, 17, 71, 31, 83, 59, 69, 23, 83, 41, 91, 27, 37, 82, 16, 80,
                    11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    73, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    120, 0, 95, 78, 31, 105, 88, 0, 30, 8, 0, 77, 47, 0, 105, 0, 0,
                    104, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 60, 0, 0, 96, 0, 0,
                    50, 0, 0, 0, 0, 0, 0, 0, 82, 0, 0, 128, 0, 0, 50, 0, 0,
                    94, 0, 0, 0, 123, 0, 0, 0, 117, 0, 0, 39, 0, 0, 25, 0, 0,
                    109, 94, 1, 84, 57, 0, 0, 0, 41, 0, 0, 41, 0, 0, 53, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 84, 0, 0, 38, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 51, 0, 0, 39, 0, 0, 15, 124, 110,
                    28, 76, 63, 81, 103, 131, 20, 0, 9, 0, 0, 63, 0, 0, 117, 10, 26,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 0, 0, 0, 33, 34, 105,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 67, 31, 68,
                    0, 0, 0, 0, 0, 0, 0, 0, 123, 53, 0, 0, 56, 130, 96, 93, 3],

                6: [1, 0, 0, 0, 5, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0,
                    20, 21, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0,
                    39, 40, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0,
                    58, 59, 60, 61, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0,
                    77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0,
                    96, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 6, 0, 0, 0, 0,
                    115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 196, 196, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    156, 156, 175, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 174, 174,
                    156, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 174, 174,
                    156, 156, 0, 0, 0, 0, 0, 0, 0, 0, 196, 196, 196, 0, 0, 174, 174,
                    156, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 174, 174,
                    156, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 174, 174],  

                7:[1049, 1049, 1049, 1049, 1049, 1049, 1049, 1049, 1049, 1049, 1049, 1049, 1049, 1049, 1049, 1049, 1049,
                    1049, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1049,
                    1049, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1049,
                    1049, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1049,
                    1049, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1049,
                    1049, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1049,
                    1049, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1049,
                    1049, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1049,
                    1049, 1049, 1049, 1049, 1049, 0, 0, 0, 0, 0, 0, 0, 0, 1049, 1049, 1049, 1049,
                    0, 0, 0, 0, 1049, 0, 0, 0, 0, 0, 0, 0, 0, 1049, 0, 0, 0,
                    0, 0, 0, 0, 1049, 0, 0, 0, 0, 0, 0, 0, 0, 1049, 0, 0, 0,
                    0, 0, 0, 0, 1049, 0, 0, 0, 0, 0, 0, 0, 0, 1049, 0, 0, 0,
                    0, 0, 0, 0, 1049, 0, 0, 0, 0, 0, 0, 0, 0, 1049, 0, 0, 0,
                    0, 0, 0, 0, 1049, 0, 0, 0, 0, 0, 0, 0, 0, 1049, 0, 0, 0,
                    0, 0, 0, 0, 1049, 0, 0, 0, 0, 0, 0, 0, 0, 1049, 0, 0, 0]
        },    
    
    0: {
        init:()=>{


            if(count < 100){
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
    
                ctx.fillStyle = 'white';
                ctx.font = '25px Arial';
                ctx.fillText(`Made by: Andres Garcia, Odiar, Victoria, Burgos`, canvas.width / 2 - 280, canvas.height / 2);

    

                count++;
            } else {
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
    
                //texto muerte
                ctx.fillStyle = 'white';
                ctx.font = '25px Arial';
                ctx.fillText(`Click to start Level `, canvas.width / 2 - 280, canvas.height / 2);
                function handleClick() {
                    level=1;
                    console.log(level);
                    canvas.removeEventListener('click', handleClick);
                }
        
                // Agregar el event listener al canvas
                canvas.addEventListener('click', handleClick);

            }
        }
    },
    1: {
        restart:() => {
            
        },
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
            let platform1 = new Platform(ctx, canvas,250, 288, 100, 300,"rgba(69,238,0,1)"); // crea plataforma ( la dibuja con metodo draw())
            let collisionplatform1 = new CollisionManager(character, platform1); // aplica las colisiones con  metodo applyCollision(ctx)
            
            //puerta
            let door = new Platform(ctx, canvas, 600, 250, 60, 38);  //crea la puerta ( la dibuja con metodo drawDoor()
            let colisionDoor = new CollisionManager(character, door); // aplica las colisiones con  metodo applyCollision(ctx)
            
            let platform2 = new Platform(ctx, canvas,200, 100, 50, 50,"red"); // crea plataforma ( la dibuja con metodo draw())
            let collisionplatform2 = new CollisionManager(character, platform2); // aplica las colisiones con  metodo applyCollision(ctx)
  
            
            
            // Limpiar el canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            
            //añadir el fondo
            ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height); 
            
            
            door.drawDoor(); // dibuja la puerta
            character.draw(); //Dibuja el personaje
            
            // platform1.draw(); //dibuja las plataformas

            //collisionplatform1.applyCollision(); //!aplica las colisiones de la plataforma


            //colisionDoor.drawDoor(ctx); //!dibuja el hitbox de la puerta


            // actualizar los valores de posicion del personaje par a el siguiente frame
            character.update();
            
            if(colisionDoor.applyDoor()){
                change= true;
            } //entro en la puerta

        }

    },
    2: {restart: () => {
        levels[2].trigger = true;
    },
    initx: canvas.width / 2,
    inity: canvas.height / 2,
    trigger: true,
    trigger2: false,
    init: () => {
        character.initx = canvas.width / 2; // punto de partida del jugador en el centro del canvas
        character.inity = canvas.height / 2; // punto de partida del jugador en el centro del canvas
    
        levelbackground.src = 'levels/level2.png';
    
        levels.collision.apply();
    
        // Puerta derecha
        let doorRight = new Platform(ctx, canvas, 630, 360, 60, 33); // crea la puerta derecha
        let colisionDoorRight = new CollisionManager(character, doorRight); // aplica las colisiones con metodo applyCollision(ctx)
    
        // Puerta izquierda
        let doorLeft = new Platform(ctx, canvas, 120, 360, 60, 33); // crea la puerta izquierda
        let colisionDoorLeft = new CollisionManager(character, doorLeft); // aplica las colisiones con metodo applyCollision(ctx)
    
        // Comentamos o eliminamos la creación de la plataforma y su colisión
        // let plataforma1 = new Platform(ctx, canvas, 600, 365, 40, 80, "rgb(69,238,221)");
        // let collisionplatform1 = new CollisionManager(character, plataforma1);
    
        let tile = new Image();
        tile.src = '/levels/tilset.png';
    
        let detect = new Platform(ctx, canvas, 450, 300, 10, 50, "rgb(112, 146, 190)");
        let colisiondetect = new CollisionManager(character, detect);
    
        let detect2 = new Platform(ctx, canvas, 60, 108, 50, 70, "red");
        let colisiondetect2 = new CollisionManager(character, detect2);
        character.drawHitbox;
    
        // Añadir el fondo
        let x = character.position.x;
        let y = character.position.y;
        let width = character.position.width;
        let height = character.position.height;
    
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        // Background: Escalar la imagen al tamaño del canvas
        ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height);
    
        // Dibujar las puertas
        // doorRight.drawDoor();
        // doorLeft.drawDoor();
    
        if (colisiondetect.checkcollision()) {
            levels[2].trigger = false;
        }
    
        if (colisiondetect2.checkcollision()) {
            levels[2].trigger2 = true;
            character.dead = true;
            levels[2].trigger = true;
        }
    
        if (character.dead == true) {
            puas.drawImage(p);
        }
    
        if (levels[2].trigger) {
            // Comentamos o eliminamos el dibujo de la plataforma y la aplicación de colisión
            // plataforma1.drawImage(tile);
            // collisionplatform1.applyCollision(); //!colision de plataforma para evitar llegar al level 3
        }
    
        // colisionpuas.draw(ctx);
    
        // TODO cierre del circulo donde se va a ver el personaje
        ctx.restore();
    
        character.draw(); // Dibuja el personaje
    
        // Actualizar los valores de posicion del personaje para el siguiente frame
        character.update();
    
        // Verificar colisiones con ambas puertas
        if (colisionDoorRight.applyDoor() || colisionDoorLeft.applyDoor()) {
            change = true;
            levels[2].restart();
        } // entro en cualquiera de las puertas
    }
    
    },
    3:{
        restart:() => {
            levels[3].trigger = true;
            levels[3].trigger2 = true;
            levels[3].trigger3 = false;
            platformlevel3.position.y = 289;
        },
        initx:60,
        inity:200,
        trigger: true,
        trigger2: true,
        trigger3: false,
        init:()=>{
            //Dibuja el fondo del nivel
            levelbackground.src = 'levels/nivel33.png';


            //Crea las colisiones del nivel
            levels.collision.apply(); 
            character.initx =     levels[level].initx // punto de partida del jugador
            character.inity =    levels[level].inity  // punto de partida del jugador
            
      
            //puerta
            
            let door = new Platform(ctx, canvas, 770, 251, 60, 38);  //crea la puerta ( la dibuja con metodo drawDoor()
            let colisionDoor = new CollisionManager(character, door); // aplica las colisiones con  metodo applyCollision(ctx)

            let platform1 = new Platform(ctx, canvas, 250, 288, 80, 500,'rgb(61,34,11)');

            let collisionplatform1 = new CollisionManager(character, platform1);

            let platform2 = new Platform(ctx, canvas, 330, 288, 160, 100,'rgb(61,34,11)');


            let collisionplatform2 = new CollisionManager(character, platform2);


            let invplataform = new Platform(ctx, canvas, 330, 288, 450, 10,'rgb(61,34,11)');   
            let collisioninv = new CollisionManager(character, invplataform);
            
            let detect = new Platform(ctx, canvas, 386, 50, 10, 400,'red');
            let colisiondetect = new CollisionManager(character, detect);

            let detect2 = new Platform(ctx, canvas, 250, 280, 80, 10,'red');
            let colisiondetect2 = new CollisionManager(character, detect2);

            let  platform4 = new Platform(ctx, canvas, 50, 320, 150, 100,'rgb(194,164,131)');
            let collisionplatform4 = new CollisionManager(character, platform4);
            
            let platform5 = new Platform(ctx, canvas, 200, 355, 50, 65,'rgb(194,164,131)');
            let collisionplatform5 = new CollisionManager(character, platform5);

            let door2 = new Platform(ctx, canvas, 55, 382, 60, 38);  //crea la puerta ( la dibuja con metodo drawDoor()
            let colisionDoor2 = new CollisionManager(character, door2); // aplica las colisiones con  metodo applyCollision(ctx)
            
               
            // Limpiar el canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height); 
            
            
            if(colisiondetect.checkcollision()){
                levels[3].trigger = false;
            } 

            if(levels[3].trigger){
                platform2.draw(); //dibuja las plataformas
                collisionplatform2.applyCollision(); //!aplica las colisiones de la plataforma
            }else if(colisiondetect2.checkcollision()){

                levels[3].trigger2 = false;
            }
            if(levels[3].trigger2){
                platform1.draw(); //dibuja las plataformas
                collisionplatform1.applyCollision(); //!aplica las colisiones de la plataforma
 
            }

            platformlevel3.draw()
            platformlevel3.movePlatform(0, 0.4);
            collisionplatformlevel3.applyCollision();



            if (collisionplatform4.checkcollision() || collisionplatform5.checkcollision()){
                platform4.draw();
                platform5.draw();
                
                door2.drawDoor(); // dibuja la puerta
            }
      
            if (levels[3].trigger3 == false){
                if(collisioninv.checkcollision()){
                    if(collisioninv.checkSiteOfCollision()==4){
                    levels[3].trigger3 = true;
                    }
                }
            }
            
            if(levels[3].trigger3){
                invplataform.draw(); //dibuja las plataformas
                collisioninv.applyCollision(); //!aplica las colisiones de la plataforma
            }


            door.drawDoor(); // dibuja la puerta
                                   
            character.draw(); //Dibuja el personaje

            character.update();
            if(colisionDoor2.applyDoor()){
                change= true;
                levels[3].restart();
            } //entro en la puerta

        }
        
    },
    4: {
        restart:() => {
            levels[4].trigger = true;
            
        },
        initx: 60,
        inity: 200,
        trigger: true,
        init:()=>{
            //Dibuja el fondo del nivel
            levelbackground.src = 'levels/nivel4.png';

            //Crea las colisiones del nivel
            levels.collision.apply(); 
            character.initx =     levels[level].initx // punto de partida del jugador
            character.inity =    levels[level].inity  // punto de partida del jugador


            

            let door = new Platform(ctx, canvas, 780, 315, 60, 38);  
            let colisionDoor = new CollisionManager(character, door); 

  
            let platform1 = new Platform(ctx, canvas, 180, 300, 50, 10,'rgb(220,254,255)');
            let collisionPlatform1 = new CollisionManager(character, platform1);
            
            let platform2 = new Platform(ctx, canvas, 330, 250, 50, 10, 'rgb(220,254,255)');
            let collisionPlatform2 = new CollisionManager(character, platform2);
            
            let platform3 = new Platform(ctx, canvas, 662, 280, 50, 10, 'rgb(220,254,255)');
            let collisionPlatform3 = new CollisionManager(character, platform3);
            
            let platform4 = new Platform(ctx, canvas, 440, 354, 67, 10, 'rgb(220,254,255)');
            let collisionPlatform4 = new CollisionManager(character, platform4);

            let detect = new Platform(ctx, canvas, 290, 50, 100, 1000, "purple");
            let colisiondetect = new CollisionManager(character, detect);
            
            
            // Limpiar el canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //añadir el fondo
            ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height); 
            door.drawDoor(); // dibuja la puerta
            character.draw(); //Dibuja el personaje
            
            collisionPlatform1.applyCollision();

            collisionPlatform3.applyCollision();
            platform1.draw();
            platform3.draw();
            //detect.draw();
            
            if(levels[4].trigger){
                platform2.draw();
                
            }else{
                collisionPlatform4.applyCollision();
                platform4.draw();

            }

            if(colisiondetect.checkcollision()){
                levels[4].trigger = false;
            }
            
            
            if(colisionDoor.applyDoor()){
                change= true;
                levels[4].restart();
            }


            character.update();


        }

    },

5:{
    restart: () => {
        levels[5].trigger = true;
    },
    initx: 60,
    inity: 250,
    trigger: true,
    init: () => {
        //Dibuja el fondo del nivel
        levelbackground.src = 'levels/Eclipse.png';
    
        //Crea las colisiones del nivel
        levels.collision.apply();
        character.initx = levels[level].initx;
        character.inity = levels[level].inity;
    
        //puerta
        let door = new Platform(ctx, canvas, 785, 280, 60, 38); //crea la puerta ( la dibuja con metodo drawDoor()
        let colisionDoor = new CollisionManager(character, door); // aplica las colisiones con metodo applyCollision(ctx)

        let radius = 70;

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
    
        //añadir el fondo
        ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height);
        
    
        door.drawDoor(); // dibuja la puerta

        ctx.restore();

        character.draw(); //Dibuja el personaje

        character.update();

    
        if (colisionDoor.applyDoor()) {
            change = true; // Change the level
            levels[5].restart(); // Restart the level
        }

        
    },
},


6:{
    restart: () => {
        levels[6].trigger = true;
    },
    initx: 60,
    inity: 250,
    trigger: true,
    init: () => {
        //Dibuja el fondo del nivel
        levelbackground.src = 'levels/Dungeon.png';
    
        //Crea las colisiones del nivel
        levels.collision.apply();
        character.initx = levels[level].initx;
        character.inity = levels[level].inity;
    
        //puerta
        let door = new Platform(ctx, canvas, 750, 280, 60, 38); //crea la puerta ( la dibuja con metodo drawDoor()
        let colisionDoor = new CollisionManager(character, door); // aplica las colisiones con metodo applyCollision(ctx)

       
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       

        //añadir el fondo
        ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height);
        
    
        door.drawDoor(); // dibuja la puerta
        character.draw(); //Dibuja el personaje

        character.update();

    
        if (colisionDoor.applyDoor()) {
            change = true; // Change the level
            levels[6].restart(); // Restart the level
        }

        
            }
        },

        7:{
            restart:() => {
            
            },
            initx: 200,
            inity: 200,
            init:()=>{
                //Dibuja el fondo del nivel
                levelbackground.src = 'levels/nivel77.png';
    
                let lava = new Image();
                lava.src = 'levels/lava.jpg';
    
                //Crea las colisiones del nivel
                levels.collision.apply(); 
                character.initx =     levels[level].initx // punto de partida del jugador
                character.inity =    levels[level].inity  // punto de partida del jugador
    
                // Crea Bloques de Colision de las plataformas            
                // let platform1 = new Platform(ctx, canvas,250, 288, 100, 300,"rgba(69,240,0,1)"); // crea plataforma ( la dibuja con metodo draw())
                // let collisionplatform1 = new CollisionManager(character, platform1); // aplica las colisiones con  metodo applyCollision(ctx)
                
                //puerta
                let door = new Platform(ctx, canvas, 700, 220, 60, 38,);  //crea la puerta ( la dibuja con metodo drawDoor()
                let colisionDoor = new CollisionManager(character, door); // aplica las colisiones con  metodo applyCollision(ctx)
    
                let platform1 = new Platform(ctx, canvas, 320, 150, 100, 10, 'rgb(255,255,255)');
                let platform2 = new Platform(ctx, canvas, 500, 190, 100, 10, 'rgb(255,255,255)');
                let platform3 = new Platform(ctx, canvas, 250, 255, 400, 230, 'rgb(255,255,255)');
                
                
                // let platform2 = new Platform(ctx, canvas, 200, 100, 50, 50,"blue"); // crea plataforma ( la dibuja con metodo draw())
                // let collisionplatform2 = new CollisionManager(character, platform2); // aplica las colisiones con  metodo applyCollision(ctx)
      
                
                
                // Limpiar el canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                
                //añadir el fondo
                ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height); 
                
                platform1.draw();
                let collisionp1 = new CollisionManager(character, platform1);
                collisionp1.applyCollision();
    
                platform2.draw();
                let collisionp2= new CollisionManager(character, platform2);
                collisionp2.applyCollision();
    
                platform3.draw();
                let collisionp3= new CollisionManager(character, platform3);
                if(collisionp3.checkcollision()){
                    // levels[4].trigger2 = true;
                    character.dead = true;
                    // levels[4].trigger = true;
                }
                
                platform3.drawImage(lava);
                
                door.drawDoor(); // dibuja la puerta
                character.draw(); //Dibuja el personaje
                
                // platform1.draw(); //dibuja las plataformas
    
                //collisionplatform1.applyCollision(); //!aplica las colisiones de la plataforma
                //colisionDoor.drawDoor(ctx); //!dibuja el hitbox de la puerta
                //actualizar los valores de posicion del personaje par a el siguiente frame
    
                character.update();
                
                if(colisionDoor.applyDoor()){
                    change= true;
                    level = 0; // Set the level to 1
                    levels[7].restart(); // Restart the level


                } //entro en la puerta
    
            }
    
        }
    }
        

// Función para actualizar el juego cada frame
function draw() {
    
    //soundtrack
    if(level ==0){
        levels[0].init();
    }else{
        
    
    levelsoundtrack.play();
    movement();
    if(character.deadcomplete == true){
        levels.deathScreen(levels[level].restart());
    }else{
        levels[level].init();
        levels.marcador();
    }
    //nivel
    
    if (change){
        level++;
        character.position.x = levels[level].initx;
        character.position.y = levels[level].inity;
        character.velocidad.dx = 0;
        character.velocidad.dy= 0;
        character.update();
        character.velocidad.dx = 0;
        character.velocidad.dy= 0;
        levels[level].init();
        character.position.x = levels[level].initx;
        character.position.y = levels[level].inity;
        change = false;
    }


    // Llamar a la función draw() 60 veces por segundo
    }
    requestAnimationFrame(draw);
}



draw();

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
        1: [23, 23, 23, 23, 23, 23, 23, 23, 23, 32, 23, 32, 23, 23, 23, 23, 23, 
            46, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 23,
            46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46],

        2:[23, 23, 23, 23, 23, 23, 23, 23, 23, 32, 23, 32, 23, 23, 23, 23, 23, 
            46, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 23,
            46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46],

        3:[23, 23, 23, 23, 23, 23, 23, 23, 23, 32, 23, 32, 23, 23, 23, 23, 23, 
            46, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 23,
            46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46],

        4:[23, 23, 23, 23, 23, 23, 23, 23, 23, 32, 23, 32, 23, 23, 23, 23, 23, 
                46, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 23,
                46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
                46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
                46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
                46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
                46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
                46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
                46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
                46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
                46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
                46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
                46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
                46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 23,
                46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46],
            
        5 :[23, 23, 23, 23, 23, 23, 23, 23, 23, 32, 23, 32, 23, 23, 23, 23, 23, 
            46, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 23,
            46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46],

        6: [23, 23, 23, 23, 23, 23, 23, 23, 23, 32, 23, 32, 23, 23, 23, 23, 23, 
            46, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 23,
            46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46],  

        7:[23, 23, 23, 23, 23, 23, 23, 23, 23, 32, 23, 32, 23, 23, 23, 23, 23, 
            46, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23,
            46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 23,
            46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46]
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
            let door = new Platform(ctx, canvas, 360, 344, 160, 7);  //crea la puerta ( la dibuja con metodo drawDoor()
            let colisionDoor = new CollisionManager(character, door); // aplica las colisiones con  metodo applyCollision(ctx)
            
            let platform2 = new Platform(ctx, canvas,200, 100, 50, 50,"red"); // crea plataforma ( la dibuja con metodo draw())
            let collisionplatform2 = new CollisionManager(character, platform2); // aplica las colisiones con  metodo applyCollision(ctx)
  
            
            
            // Limpiar el canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            
            //añadir el fondo
            ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height); 
            
            
            // door.drawDoor(); // dibuja la puerta
            character.draw(); //Dibuja el personaje
            
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
        let doorRight = new Platform(ctx, canvas, 680, 360, 110, 36); // crea la puerta derecha
        let colisionDoorRight = new CollisionManager(character, doorRight); // aplica las colisiones con metodo applyCollision(ctx)
    
        // Puerta izquierda
        let doorLeft = new Platform(ctx, canvas, 50, 360,110, 36); // crea la puerta izquierda
        let colisionDoorLeft = new CollisionManager(character, doorLeft); // aplica las colisiones con metodo applyCollision(ctx)
    
    
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

        if (colisionDoorRight.applyDoor()) {
            level = 2; // Cambia al nivel 3
            change = true;
            levels[2].restart();
          } else if (colisionDoorLeft.applyDoor()) {
            level = 0; // Cambia al nivel 1
            change = true;
            levels[2].restart();
          }

    }
    
    },
   
    3: {restart: () => {
            levels[3].trigger = true;
            levels[3].trigger2 = true;
            levels[3].trigger3 = false;
        },
        initx: canvas.width / 2,
        inity: canvas.height / 2,
        trigger: true,
        trigger2: true,
        trigger3: false,
        init: () => {
            // Dibuja el fondo del nivel
            const levelbackground = new Image();
            levelbackground.src = 'levels/level3.png';
    
            // Crea las colisiones del nivel
            levels.collision.apply();
            character.initx = canvas.width / 3; // punto de partida del jugador en el centro del canvas
            character.inity = canvas.height / 3; // punto de partida del jugador en el centro del canvas
        
    
            let doorRight = new Platform(ctx, canvas, 680, 360, 110, 36); // crea la puerta derecha
            let colisionDoorRight = new CollisionManager(character, doorRight); // aplica las colisiones con metodo applyCollision(ctx)
        
            // Puerta izquierda
            let doorLeft = new Platform(ctx, canvas, 50, 360,110, 36); // crea la puerta izquierda
            let colisionDoorLeft = new CollisionManager(character, doorLeft);
            
            levelbackground.onload = () => {
                // Limpiar el canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
    
                // Dibujar el fondo del nivel
                ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height);
    
                // Dibujar las puertas
                // doorRight.drawDoor();
                // doorLeft.drawDoor();
    
                // Dibujar el personaje
                character.draw();
    
                // Actualizar los valores de posición del personaje para el siguiente frame
                character.update();
    
                // Verificar colisiones con ambas puertas y cambiar de nivel
                if (colisionDoorRight.applyDoor()) {
                    level = 3; // Cambia al nivel 3
                    change = true;
                    levels[3].restart();
                } else if (colisionDoorLeft.applyDoor()) {
                    level = 1; // Cambia al nivel 1
                    change = true;
                    levels[3].restart();
                }
            };
        }
    },
    
    4: {restart: () => {
        levels[4].trigger = true;
    },
    initx: canvas.width / 2,
    inity: canvas.height / 2,
    trigger: true,
    init: () => {
        // Dibuja el fondo del nivel
        levelbackground.src = 'levels/level4.png';
    
        // Crea las colisiones del nivel
        levels.collision.apply();
        character.initx = levels[level].initx; // punto de partida del jugador
        character.inity = levels[level].inity; // punto de partida del jugador
    
          // Puerta derecha
          let doorRight = new Platform(ctx, canvas, 632, 400, 82, 34); // crea la puerta derecha
          let colisionDoorRight = new CollisionManager(character, doorRight); // aplica las colisiones con metodo applyCollision(ctx)
      
          // Puerta izquierda
          let doorLeft = new Platform(ctx, canvas, 103, 400,82, 34); // crea la puerta izquierda
          let colisionDoorLeft = new CollisionManager(character, doorLeft); // aplica las colisiones con metodo applyCollision(ctx)
      
    
        let detect = new Platform(ctx, canvas, 290, 50, 100, 1000, "purple");
        let colisiondetect = new CollisionManager(character, detect);
    
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Añadir el fondo
        ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height);

        character.draw(); // Dibuja el personaje
    
        if (colisiondetect.checkcollision()) {
            levels[4].trigger = false;
        }
    
        if (colisionDoorLeft.applyDoor() || colisionDoorRight.applyDoor()) {
            change = true;
            levels[4].restart();
        }
    
        character.update();
    }
    
    },

5:{restart: () => {
    levels[5].trigger = true;
},
initx: canvas.width / 2,
inity: canvas.height / 2,
trigger: true,
init: () => {
    // Dibuja el fondo del nivel
    levelbackground.src = 'levels/level5.png';

    // Crea las colisiones del nivel
    levels.collision.apply();
    character.initx = levels[level].initx; // Punto de partida del jugador
    character.inity = levels[level].inity; // Punto de partida del jugador

    // Puerta derecha
    let doorRight = new Platform(ctx, canvas, 632, 400, 82, 34); // Crea la puerta derecha
    let colisionDoorRight = new CollisionManager(character, doorRight); // Aplica las colisiones con la puerta derecha

    // Puerta izquierda
    let doorLeft = new Platform(ctx, canvas, 103, 400, 82, 34); // Crea la puerta izquierda
    let colisionDoorLeft = new CollisionManager(character, doorLeft); // Aplica las colisiones con la puerta izquierda

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Añadir el fondo
    ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height);

    // Dibujar las puertas
    // doorRight.drawDoor();
    // doorLeft.drawDoor();

    // Dibujar el personaje
    character.draw();

    // Actualizar el personaje
    character.update();

    // Verificar colisión con la puerta derecha
    if (colisionDoorRight.applyDoor()) {
        change = true; // Cambiar el nivel
        levels[5].restart(); // Reiniciar el nivel
    }

    // Verificar colisión con la puerta izquierda
    if (colisionDoorLeft.applyDoor()) {
        change = true; // Cambiar el nivel
        levels[5].restart(); // Reiniciar el nivel
    }
},
},
6:{restart: () => {
    levels[6].trigger = true;
},
initx: canvas.width / 2,
inity: canvas.height / 2,
trigger: true,
init: () => {
    // Dibuja el fondo del nivel
    levelbackground.src = 'levels/level6.png';

    // Crea las colisiones del nivel
    levels.collision.apply();
    character.initx = levels[level].initx; // Punto de partida del jugador
    character.inity = levels[level].inity; // Punto de partida del jugador

    // Puerta derecha
    let doorRight = new Platform(ctx, canvas, 632, 400, 82, 34); // Crea la puerta derecha
    let colisionDoorRight = new CollisionManager(character, doorRight); // Aplica las colisiones con la puerta derecha

    // Puerta izquierda
    let doorLeft = new Platform(ctx, canvas, 103, 400, 82, 34); // Crea la puerta izquierda
    let colisionDoorLeft = new CollisionManager(character, doorLeft); // Aplica las colisiones con la puerta izquierda

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Añadir el fondo
    ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height);

    // Dibujar las puertas
    // doorLeft.drawDoor();
    // doorRight.drawDoor();

    // Dibujar el personaje
    character.draw();

    // Actualizar el personaje
    character.update();

    // Verificar colisión con la puerta derecha
    if (colisionDoorRight.applyDoor()) {
        change = true; // Cambiar el nivel
        levels[6].restart(); // Reiniciar el nivel
    }

    // Verificar colisión con la puerta izquierda
    if (colisionDoorLeft.applyDoor()) {
        change = true; // Cambiar el nivel
        levels[6].restart(); // Reiniciar el nivel
    }
},
},7: {
    restart: () => {
        levels[7].trigger = true;
    },
    initx: 200,
    inity: 200,
    trigger: true,
    init: () => {
        // Dibuja el fondo del nivel
        levelbackground.src = 'levels/level7.png';

      
    // Crea las colisiones del nivel
    levels.collision.apply();
    character.initx = levels[level].initx; // Punto de partida del jugador
    character.inity = levels[level].inity; // Punto de partida del jugador

    // Puerta derecha
    let doorRight = new Platform(ctx, canvas, 615, 366, 176, 34); // Crea la puerta derecha
    let colisionDoorRight = new CollisionManager(character, doorRight); // Aplica las colisiones con la puerta derecha

    
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Añadir el fondo
    ctx.drawImage(levelbackground, 0, 0, canvas.width, canvas.height);

    // Dibujar las puertas

    // doorRight.drawDoor();

    // Dibujar el personaje
    character.draw();

    // Actualizar el personaje
    character.update();

    // Verificar colisión con la puerta derecha
    if (colisionDoorRight.applyDoor()) {
        level = 0; // Cambia al nivel 3
        change = true;
        levels[7].restart();


    }
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

import { Character } from './clases/character.js';
import {  CollisionManager } from './clases/collisionmanager.js';
import { Platform } from './clases/platform.js';
import { levelCollision } from './clases/levelCollision.js';
// 
/*
Character (ctx, canvas,ancho del Personaje , Altura del Personaje)
    .draw() //dibuja el personaje
    .update() //actualiza la posicion del personaje

levelCollision (array de colisiones del nivel)
    .collision() //devuelve un array de colisiones para poder aplicarlas al CollisionManager

CollisionManager (Personaje,  bloque al que se le quiera aplicar colision) 
    .draw(ctx) //dibuja los bloques de colision
    .drawDoor(ctx) // Dibuja los bloques de colision de la puerta
    .applyCollision() //aplica las colisiones
    .applyDoor() // cuando estas dentro de la puerta retorna true

Platform (ctx, canvas, x, y, ancho,  alto, color)
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

let platformlevel3 = new Platform(ctx, canvas, 490, 289, 210, 100,'blue');
let collisionplatformlevel3 = new CollisionManager(character, platformlevel3);
let count = 0;
let countdead = 2;
let change= false;
let level =0;
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
    2: {
        restart:() => {
            levels[2].trigger = true;
        },
        initx:60,
        inity:400,
        trigger: true,
        trigger2: false,
        init:()=>{

            
            character.initx =     levels[level].initx // punto de partida del jugador
            character.inity =    levels[level].inity  // punto de partida del jugador
            
            levelbackground.src = 'levels/lvl2.png';


            levels.collision.apply();
            
            //puerta
            let door = new Platform(ctx, canvas, 700, 415, 60, 33);  //crea la puerta ( la dibuja con metodo drawDoor()
            let colisionDoor = new CollisionManager(character, door); // aplica las colisiones con  metodo applyCollision(ctx)
            
            let plataforma1 = new Platform(ctx, canvas, 600, 365, 40, 80,"rgb(69,238,221)") //?
            let collisionplatform1 = new CollisionManager ( character,plataforma1); //?
            
            let radius = 100;
            let p= new Image()
            p.src = '/levels/PUAS.png'

            let tile= new Image()
            tile.src = '/levels/tilset.png'
            
            let detect = new Platform(ctx, canvas, 450, 300, 10, 50,"rgb(112, 146, 190)") //?
            let colisiondetect = new CollisionManager ( character,detect); //?


            
            let puas = new Platform(ctx, canvas, 100, 108, 100, 70,"red") //?
            let colisionpuas = new CollisionManager ( character, puas); //?

            let detect2 = new Platform(ctx, canvas, 60, 108, 50, 70,"red") //?
            let colisiondetect2 = new CollisionManager ( character, detect2); //?
            character.drawHitbox
            
            
            
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
            
            if(colisiondetect.checkcollision()){
                levels[2].trigger = false;
            }
            
            
            

            if(colisiondetect2.checkcollision()){
                levels[2].trigger2 = true;
                character.dead = true;
                levels[2].trigger = true;
                
            }

            if(character.dead == true){
                puas.drawImage(p);
            }
            

            
            if(levels[2].trigger){
                plataforma1.drawImage(tile);
                collisionplatform1.applyCollision() //!colision de plataforma para evitar llegar al level 3
            }

            // colisionpuas.draw(ctx);
            
            
            //TODO cierre del circulo donde se va a ver el personaje 
            ctx.restore();


            
            character.draw(); //Dibuja el personaje
            
            // actualizar los valores de posicion del personaje par a el siguiente frame
            character.update();
            
            
            if(colisionDoor.applyDoor()){
                change= true;
                levels[2].restart()



            } //entro en la puerta

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
            levelbackground.src = 'levels/map.png';

            //Crea las colisiones del nivel
            levels.collision.apply(); 
            character.initx =     levels[level].initx // punto de partida del jugador
            character.inity =    levels[level].inity  // punto de partida del jugador
            
      
            //puerta
            
            let door = new Platform(ctx, canvas, 720, 250, 60, 38);  //crea la puerta ( la dibuja con metodo drawDoor()
            let colisionDoor = new CollisionManager(character, door); // aplica las colisiones con  metodo applyCollision(ctx)

            let platform1 = new Platform(ctx, canvas, 250, 288, 80, 500,'rgb(112,146,190)');
            let collisionplatform1 = new CollisionManager(character, platform1);

            let platform2 = new Platform(ctx, canvas, 330, 288, 160, 100,'rgb(112,146,190)');
            let collisionplatform2 = new CollisionManager(character, platform2);


            let invplataform = new Platform(ctx, canvas, 350, 288, 350, 10,'blue');   
            let collisioninv = new CollisionManager(character, invplataform);
            
            let detect = new Platform(ctx, canvas, 386, 50, 10, 400,'rgb(112,146,190)');
            let colisiondetect = new CollisionManager(character, detect);

            let detect2 = new Platform(ctx, canvas, 250, 280, 80, 10,'rgb(112,146,190)');
            let colisiondetect2 = new CollisionManager(character, detect2);

            let  platform4 = new Platform(ctx, canvas, 50, 320, 150, 100,'rgb(153,217,234)');
            let collisionplatform4 = new CollisionManager(character, platform4);
            let platform5 = new Platform(ctx, canvas, 200, 355, 50, 65,'rgb(153,217,234)');
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
                level=0;
                change= true;
                levels[3].restart();
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

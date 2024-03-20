class Character {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;

        this.sprite = new Image();
        this.sprite.src = 'adventurer.png';

        // Posicion de aparicion del personaje y tamaño
        this.position = { 
            x: 480, 
            y: 330,
            width: 50,
            height: 50
        }

        this.parameters = {
            maxSpeed: 4, 
            acceleration: 1, 
            initialSpeed: 4, 
            jumpStrength: 18
        }


        // Tamaño del cuadro del sprite que se va a dibujar
        this.spriteWidth = 20;
        this.spriteHeight = 22;


        // Posicion en el sprite
        this.initialSpriteWidth = 4;
        this.initialSpriteHeight = 8;

        // frame de animacion   
        this.frameX = 0;
        this.frameY = 0;

        // Velocidad en x y y
        this.velocidad = {
            dx: 0,
            dy: 0
        }
        this.onGround = true;
        this.lastDy = 0;
        this.gravity = 0.8;
        
        //sonidos del jugado
        this.moveSound = new Audio('walk.wav');
        this.moveSound.loop = true;

        this.jumpSound = new Audio('jump.wav');
        this.jumpSound.volume = 0.1;


        //Otros
        this.move = 0;  //movimiento actual
        this.frameCount = 0; // contador de frames que han pasado
        this.numFramesxAction = 0; // Numero de frames que dura cada accion
        this.numFramexSprite = 0; // Numero de frames que dura cada sprite
        this.direction = 1; // 1 derecha, -1 izquierda
        this.formerMove = 0; //movimiento anterior

        //movement boolean
        this.movementBool={
            moveBool: false,
            jumpBool: false,
            noMoveBool: false
        };

    }

    //dibujo del sprite en el canvas
    draw() {
        this.ctx.save(); //guarda el estado del canvas (solo sirve si flipImageIfNecessary() se ejecuta antes de createCharacter()
        this.flipImageIfNecessary(); //cambia la direccion del sprite si va a la izquierda
        this.createCharacter(); //dibuja el sprite
        this.characterinCanvas(); //evita que se mueva si se sale del canvas
        this.characterPosicion(); //actualiza la posicion del personaje
        this.spriteAnimation(); //actualiza la animacion del sprite
        this.ctx.restore(); //restaura el estado del canvas
    }
    //cambio de direccion del sprite (cuando corre al lado izquierdo)
    flipImageIfNecessary() {
        if (this.direction === -1) {
            this.ctx.scale(-1, 1);
        }
    }

    //dibujo del sprite
    createCharacter() {
        this.ctx.drawImage(
            this.sprite,
            this.initialSpriteWidth + this.frameX * 32,
            this.initialSpriteHeight + this.frameY * 32,
            this.spriteWidth,
            this.spriteHeight,
            this.direction === -1 ? -this.position.x - this.position.width : this.position.x,
            this.position.y,
            this.position.width,
            this.position.height
        );
    }

    spriteAnimation(){
        if (this.onGround === false) {
            this.jumpPressed();
        } else if (this.velocidad.dx>0 || this.velocidad.dx<0) {
            this.sidesPressed();
        } else {
            this.noMovement();
        }
    }

    //movimiento del personaje
    sidesPressed(){
        this.frameY = 1;
        this.numFramexSprite = 6;
        this.numFramesxAction= 7;
   
        this.move=1;
        this.movementBool.moveBool=true;
        this.moveSound.play();
        this.update();
  

    }
    //movimiento del personaje cuando esa quieto
    noMovement(){
        this.frameY = 0;
        this.numFramexSprite = 30;
        this.numFramesxAction = 12;
        this.move=0;
        this.movementBool.noMoveBool=true;
        this.update();
    }
    //movimiento del personaje cuando salta
    jumpPressed(){
        this.frameY = 5;
        this.numFramexSprite = 10;
        this.numFramesxAction = 6;
        this.move=2;
        this.movementBool.jumpBool=true;
        this.update();
    }


    update() {
        this.updateSound(); //actualiza sonidos
        this.updateFrame(); //actualiza el sprite para crear animacion   
        this.updateBool(); //actualiza booleanos a falsos para volver a empezar
    }
    updateSound(){
        if (this.movementBool.moveBool===false){
            this.moveSound.pause();
        }
        if (this.movementBool.jumpBool===true && this.formerOnGround===true  && this.velocidad.dy<0 ){
            this.jumpSound.play();
        }
    }
    //movimiento de los frames para formar la animacion
    updateFrame() {
        
        //ver direccion del personaje
        this.setDirection();
        
        //reinicio de la animacion si cambia de movimiento
        if (this.move !== this.formerMove){
            this.frameCount = 0; 
            this.formerMove = this.move;
            this.frameX = 0;
        }
        this.frameCount += 1;
        if (this.frameCount > this.numFramexSprite) {
            this.frameCount = 0;
            this.frameX += 1 ;
            //se reinicia la animacion si llega al final
            if (this.frameX > this.numFramesxAction) {

                this.frameX = 0;
            } 
        }
    }

    updateBool(){
        this.movementBool.moveBool=false;
        this.movementBool.jumpBool=false;
        this.movementBool.noMoveBool=false;
    }
    
    //ajusta posicion del personaje
    characterPosicion(){
        this.position.x += this.velocidad.dx;
        this.position.y += this.velocidad.dy;  
        this.velocidad.dy += this.gravity ;
        this.formerOnGround = this.onGround;
        //onGround 
        if (this.velocidad.dy === this.lastDy) {
            this.onGround = true;
        } else {
            this.lastDy = this.velocidad.dy;  
            this.onGround= false;
        }

        
    };

    characterinCanvas(){
        if(this.position.x + this.velocidad.dx > this.canvas.width-this.position.width|| this.position.x + this.velocidad.dx < 0 ) {
            this.velocidad.dx = 0;
        }
        if(this.position.y + this.velocidad.dy > this.canvas.height-this.position.height || this.position.y + this.velocidad.dy < this.position.height) {
            this.velocidad.dy = 0;
        }
    }

    setDirection(){
        if(this.velocidad.dx !==0)  this.velocidad.dx > 0? this.direction = 1 : this.direction = -1;
    }
     
};



export {Character};
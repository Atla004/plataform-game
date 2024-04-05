class Character {
    constructor(ctx, canvas, width, height) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.initx = 800;
        this.inity = 800;
        
        this.hitbox = {
            position: {
                x: this.initx + 7,
                y: this.inity + 4,
                width: 31,
                height: 42,
            },
        };
        this.dead = false;

        this.sprite = new Image();
        this.sprite.src = 'adventurer.png';

        // Posicion de aparicion del personaje y tamaño
        this.position = { 
            x: this.initx, 
            y: this.inity,
            width: width,
            height: height
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
    }

    //dibujo del sprite en el canvas
    draw() {
        /*
                //!cuadro rojo para pero el hitbox del personaje      
                this.ctx.beginPath();
                this.ctx.rect(this.position.x, this.position.y, this.position.width, this.position.height);
                this.ctx.fillStyle = "red";
                this.ctx.fill();
                this.ctx.closePath();
                //!cuadro rojo para pero el hitbox del personaje
        */
        this.ctx.save(); //guarda el estado del canvas (solo sirve si flipImageIfNecessary() se ejecuta antes de createCharacter()
        this.flipImageIfNecessary(); //cambia la direccion del sprite si va a la izquierda
        this.keepCharacterinCanvas(); //evita que se mueva si se sale del canvas
        this.drawCharacter(); //dibuja el sprite
        this.spriteAnimation(); //actualiza la animacion del sprite
        this.ctx.restore(); //restaura el estado del canvas
    }
     
    //cambio de direccion del sprite (cuando corre al lado izquierdo)
    flipImageIfNecessary() {

        const setDirection =()=>{
            if(this.velocidad.dx !==0) {
                this.velocidad.dx > 0? this.direction = 1 : this.direction = -1;
            }
        }

        setDirection();

        if (this.direction === -1) {
            this.ctx.scale(-1, 1);
        }
    }

    
    //dibujo del sprite
    drawCharacter() {
    
        this.ctx.drawImage(
            this.sprite,
            this.initialSpriteWidth + this.frameX * 32,
            this.initialSpriteHeight + this.frameY * 32,
            this.spriteWidth+3,
            this.spriteHeight+3,
            this.direction === -1 ? -this.position.x - this.position.width : this.position.x,
            this.position.y,
            this.position.width,
            this.position.height
        );

    
        


    }

    //movimiento del personaje
    spriteAnimation(){

        //movimiento del personaje cuando salta
        const jumpPressed = () =>{
            this.frameY = 5;
            this.numFramexSprite = 10;
            this.numFramesxAction = 6;
            this.move=2;

        }

        //movimiento del personaje
        const sidesPressed = () => {
            this.frameY = 1;
            this.numFramexSprite = 6;
            this.numFramesxAction= 7;
       
            this.move=1;

      
    
        }
        
        //movimiento del personaje cuando esa quieto
        const noMovement = () =>  {      
            this.frameY = 0;
            this.numFramexSprite = 30;
            this.numFramesxAction = 12;
            this.move=0;
        }

        const deadAnimation = () => {
            this.frameY = 7;
            this.numFramexSprite = 10;
            this.numFramesxAction = 6;
            this.move=3;
            this.velocidad.dx = 0;
            this.velocidad.dy = 0;
        }
        
        if (this.dead === true) {
            deadAnimation();
            
        } else{
            if (this.onGround === false) {
                jumpPressed();
            } else if (this.velocidad.dx>0 || this.velocidad.dx<0) {
                sidesPressed();
            } else {
                noMovement();
            }
        }
    }
    
    updateHitbox() {
        if(this.direction === -1) {

            this.hitbox.position.x = this.position.x +15;
            this.hitbox.position.y = this.position.y + 5;
            this.hitbox.position.width = this.position.width-25;
            this.hitbox.position.height = this.position.height- 10;
        }else{
        this.hitbox.position.x = this.position.x + 10;
        this.hitbox.position.y = this.position.y +5;
        this.hitbox.position.width = this.position.width -25;
        this.hitbox.position.height = this.position.height - 10;
        }
        

        //this.drawHitbox();

    }

    drawHitbox = () => {
        this.ctx.beginPath();
        this.ctx.rect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.position.width, this.hitbox.position.height);
        this.ctx.fillStyle = "rgba(204, 15, 15, 0.400)";
        this.ctx.fill();
        this.ctx.closePath();
    }

    update() {

        const updateSound = ()=> {
            
            //sonido de movimiento
            this.move===1? this.moveSound.play() : this.moveSound.pause();
            
            //sonido de salto
            if (this.move===2 && this.formerOnGround===true ){
                this.jumpSound.play();
            }
        }
        
        //movimiento de los frames para formar la animacion
        const updateFrame = () => {

            //reinicio de la animacion si cambia de movimiento
            if (this.move !== this.formerMove){
                this.frameCount = 0; 
                this.formerMove = this.move;
                this.frameX = 0;
            }

            //animacion de muerte
            if (this.move === 3) {
                this.frameCount += 1;
                if (this.frameCount > this.numFramexSprite) {
                    this.frameCount = 0;
                    this.frameX += 1 ;
                    //se reinicia la animacion si llega al final
                    if (this.frameX > this.numFramesxAction) {
        
                        this.move=0;
                        this.position.y = this.inity;
                        this.position.x = this.initx;
                        this.dead = false;
                    } 
                }
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
        
        
        //ajusta posicion del personaje
        const updatePosition =() =>{
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
        
        updateSound(); //actualiza sonidos
        updateFrame(); //actualiza el sprite para crear animacion   
        updatePosition(); //actualiza posicion para siguiente ciclo
        this.updateHitbox();

    }
    
    
    
    keepCharacterinCanvas(){
        
        //evita que el personaje se salga del canvas horizontalmente
        if(this.position.x + this.velocidad.dx  + this.position.width> this.canvas.width|| this.position.x + this.velocidad.dx < 0 ) { 
            this.velocidad.dx = 0;
        }
        
        //evita que el personaje se salga del canvas verticalmente
        if(this.position.y + this.velocidad.dy  + this.position.height > this.canvas.height || this.position.y + this.velocidad.dy < 0) { 
            if ( this.position.y == this.canvas.height - this.position.height) { // lleva a su posicion inicial si cae al vacio
                this.position.y = this.inity;
                this.position.x = this.initx;
                this.move=0;
            }else{
            this.velocidad.dy = 0;
            this.position.y = this.canvas.height - this.position.height}
        }
    }

    
    
};



export {Character};
class Character {
    constructor(ctx, sprite, canvas) {
        this.ctx = ctx;
        this.sprite = sprite;
        this.canvas = canvas;

        // Posicion y tamaño del personaje
        this.x = canvas.width / 2 - 150;
        this.y = canvas.height - 200;
        this.w = 20;
        this.h = 22;

        // Posicion del sprite
        this.sW = 4;
        this.sH = 9;
        this.frameX = 0;
        this.frameY = 0;

        // Velocidad en x y y
        this.dx = 0;
        this.dy = 0;
        this.onGround = true;


        this.move = 0;  //movimiento actual
        this.frameCount = 0; // contador de frames que han pasado
        this.numFramesxAction = 0; // Numero de frames que dura cada accion
        this.numFramexSprite = 0; // Numero de frames que dura cada sprite
        this.direction = 1; // 1 derecha, -1 izquierda
        this.formerMove = 0; //movimiento anterior
    }

    draw() {
        this.ctx.save();
        this.flipImageIfNecessary();
        this.createCharacter();
        this.ctx.restore();
    }
    flipImageIfNecessary() {
        if (this.direction === -1) {
            this.ctx.scale(-1, 1);
        }
    }
    createCharacter() {
        this.ctx.drawImage(
            this.sprite,
            this.sW + this.frameX * 32,
            this.sH + this.frameY * 32,
            this.w,
            this.h,
            this.direction === -1 ? -this.x - this.w : this.x,
            this.y,
            this.w,
            this.h
        );
    }

    sidesPressed(){
        this.frameY = 1;
        this.numFramexSprite = 6;
        this.numFramesxAction= 7;
   
        this.move=1;

        this.updateFrame();

    }

    noMovement(){
        this.frameY = 0;
        this.numFramexSprite = 30;
        this.numFramesxAction = 12;
        this.move=0;
        this.updateFrame();
    }

    jumpPressed(){
        this.frameY = 5;
        this.numFramexSprite = 10;
        this.numFramesxAction = 6;
        this.move=2;
        this.updateFrame();
    }


    updateFrame() {
        //reinicio de la animacion si cambia de movimiento
        if (this.move !== this.formerMove)
        {
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
     
};


export {Character};
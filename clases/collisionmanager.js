class CollisionManager {
    constructor(character, mapOfCollision) {
        this.character = character;
        this.blocks = mapOfCollision;
    }

    
    //!cuadro rojo para pero el hitbox de la plataforma
    draw(ctx) {
        const drawBlock = (block) => {
            ctx.beginPath();
            ctx.rect(block.position.x, block.position.y, block.position.width, block.position.height);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }
        
        Array.isArray(this.blocks) ? 
        this.blocks.forEach(block => { drawBlock(block); }) //si son las colisiones del mapa
        : drawBlock(this.blocks); // si es una plataforma
        
    }
    //!cuadro rojo para pero el hitbox de la plataforma
    
    //!cuadro rojo para pero el hitbox de la puerta
    drawDoor(ctx) {
        const drawBlock = (block) => {
            let obj = block.position;


            
            
            ctx.beginPath();
            ctx.rect(obj.x + obj.width*(3/8), obj.y, obj.width/4, obj.height);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }
        
        drawBlock(this.blocks); // si es una plataforma
        
    }
    //!cuadro rojo para pero el hitbox de la puerta

    applyCollision() {
        let blocks = this.blocks;

        const applyCollision = (block) => {
            let character = this.character.hitbox.position;
            let dx = this.character.velocidad.dx;
            let dy = this.character.velocidad.dy;
            let obj = block.position;

            let pie  = character.y + character.height 
            let cabeza = character.y 
            let manoizq = character.x 
            let manoder = character.x + character.width 
            let arriba   = obj.y  
            let abajo = obj.y + obj.height
            let izq = obj.x
            let der = obj.x + obj.width
        

            //comprueba si hay colision
            let collision = () => {
                return (pie + dy > arriba && cabeza +dy < abajo && manoder + dx > izq && manoizq + dx < der)
            }

            //comprueba el sitio de la colision y toma medidas segun el sitio
            let checkSiteOfCollision = () => {
                if(manoder  > izq && manoizq < der){
                    if( cabeza < arriba){ //personaje arriba del bloque

                        this.character.velocidad.dy = 0;
                        this.character.position.y = arriba - character.height-5 ;
                        console.log("arriba")
                        

                    }
                    if( pie > abajo){//personaje abajo del bloque
                        this.character.velocidad.dy = 0;
                        this.character.position.y = abajo;
                        console.log("abajo")
                    }
                }
                if(pie > arriba && cabeza < abajo){
                    if(manoizq < der){ //personaje a la izquierda del bloque

                        this.character.velocidad.dx = 0;
                        this.character.position.x = izq - character.width-10;
                    }
                    if(manoder > izq){//personaje a la derecha del bloque
                        this.character.velocidad.dx = 0;
                        this.character.position.x = this.character.hitbox.position.x - 15;
                        console.log("derecha")
                    }

                }

            } 
            
            // si hay colision, comprueba el sitio de la colision, y toma medidas
            if(collision()){
                checkSiteOfCollision();
            }
        }

        Array.isArray(blocks) ? 
        blocks.forEach(block => { applyCollision(block); }) //si son las colisiones del mapa
        : applyCollision(blocks); // si es una plataforma

    
    }

    applyDoor() {
        let blocks = this.blocks;

        const applyCollision = (block) => {
            let character = this.character.hitbox.position;
            let dx = this.character.velocidad.dx;
            let dy = this.character.velocidad.dy;
            
            let pie  = character.y + character.height 
            let cabeza = character.y 
            let manoizq = character.x 
            let manoder = character.x + character.width 
            
            let obj = block.position;
            obj.x += obj.width*(3/8);
            obj.width = obj.width/4;
            let arriba   = obj.y
            let abajo = obj.y + obj.height 
            let izq = obj.x
            let der = obj.x + obj.width
        

            //comprueba si hay colision
            let collision = () => {
                return (pie + dy > arriba && cabeza +dy < abajo && manoder + dx > izq && manoizq + dx < der)
            }
            
            // si hay colision, comprueba el sitio de la colision, y toma medidas
            return collision();
            
        }

        return applyCollision(blocks); // si es una plataforma

        
    }

    checkcollision(){
        let block = this.blocks;

        let character = this.character.hitbox.position;
        let dx = this.character.velocidad.dx;
        let dy = this.character.velocidad.dy;
        let obj = block.position;

        let pie  = character.y + character.height 
        let cabeza = character.y 
        let manoizq = character.x 
        let manoder = character.x + character.width 
        let arriba   = obj.y  
        let abajo = obj.y + obj.height
        let izq = obj.x
        let der = obj.x + obj.width

        return (pie + dy > arriba && cabeza +dy < abajo && manoder + dx > izq && manoizq + dx < der)
    }

}



export {CollisionManager};
class CollisionManager {
    constructor(character, mapOfCollision) {
        this.character = character;
        this.blocks = mapOfCollision;
    }

    
    //!cuadro rojo para pero el hitbox del personaje
    draw(ctx) {
        this.blocks.forEach(block => {
            ctx.beginPath();
            ctx.rect(block.position.x, block.position.y, block.position.width, block.position.height);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        });
    }
    //!cuadro rojo para pero el hitbox del personaje
    

    applyCollision() {
        this.blocks.forEach(block => {
            let character = this.character.position;
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
                        this.character.position.y = arriba - character.height;
                        

                    }
                    if( pie > abajo){//personaje abajo del bloque
                        this.character.velocidad.dy = 0;
                        this.character.position.y = abajo;
                    }
                }
                if(pie > arriba && cabeza < abajo){
                    if(manoizq < der){ //personaje a la izquierda del bloque
                        this.character.velocidad.dx = 0;
                        this.character.position.x = izq - character.width;
                    }
                    if(manoder > izq){//personaje a la derecha del bloque
                        this.character.velocidad.dx = 0;
                        this.character.position.x = der;
                    }

                }

            } 
            
            // si hay colision, comprueba el sitio de la colision, y toma medidas
            if(collision()){
                checkSiteOfCollision();
            }

        
        }); 
    
    }
}



export {CollisionManager};
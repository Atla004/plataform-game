class Platform {
    constructor(ctx, canvas, character) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.movimiento = 2;

        // Posicion y de la plataforma
        this.position = {
            x: 500,
            y: 350,
            width: 80,
            height: 50
        }

        this.color = "red";
        this.character = character;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.position.x, this.position.y, this.position.width, this.position.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();

        
    }



    movePlatform(){
        this.position.x += this.movimiento;
        if (this.position.x + this.position.width> this.canvas.width || this.position.x < 0) {
            this.movimiento = -this.movimiento;
        } 
    }


    collisionVertical(){
            const pos = this.character.position;
            const posvel = this.character.velocidad;
            const obj = this.position;
            const vel = this.velocidad;
            console.log(pos)
            console.log(posvel)
            //console.log("posicion personaje", pos);
            //console.log("posicion plataforma", obj);
            const inRange = (value, min , max) => {
                return value >= min && value <= max;
            }
            //if(pos.y  <obj.y + obj.height ){console.log("personaje arriba ") }     
            //if(pos.y + pos.height  >obj.y){console.log("personaje abajo")}
            //if(pos.x  < obj.x + obj.width){console.log("personaje izq")}
            //if(pos.x + pos.width > obj.x ){console.log("personaje der")}
            //la zona roja es la que aplican todos los if
            /*
                            (pos.y  <obj.y + obj.height ) &&
                (pos.y + pos.height  > obj.y) &&
                (pos.x  < obj.x + obj.width) &&
                (pos.x + pos.width > obj.x )
            */
            if(

                (pos.y  <obj.y + obj.height ) &&
                (pos.y + pos.height  > obj.y) &&
                (pos.x  < obj.x + obj.width) &&
                (pos.x + pos.width > obj.x )
            ){

                pos.x-=posvel.dx
                pos.y-=posvel.dy
                console.log (posvel.dx, "")
                console.log("colision");
            }
            
        
    }
     
    collisionHorizontal(){
        const inRange = (value, min , max) => {
            return value >= min && value <= max;
        }

        const pos = this.character.position;
        const obj = this.position;
            if(
                inRange(pos.x , obj.x + obj.width , obj.x + obj.width -1) && // personaje izquierda
                inRange(pos.y + pos.height, obj.y , obj.y+1) && // personaje arriba
                inRange(pos.y, obj.y + obj.height , obj.y + obj.height - 1) ||//personaje abajo 
                
                inRange(pos.x + pos.width, obj.x , obj.x+1) && //personaje derecha
                inRange(pos.y + pos.height, obj.y , obj.y+1) && // personaje arriba
                inRange(pos.y, obj.y + obj.height , obj.y + obj.height - 1) //personaje abajo 
            ){
                console.log("colision");
                this.velocidad.dx= 0;
            }
    }
}
export { Platform};
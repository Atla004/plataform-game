import { i } from "vite/dist/node/types.d-jgA8ss1A";

class Colision {
    constructor(chara, collision) {
        this.character = chara;
        this.platform = collision;

    }

    checkCollision() {
        this.collisionV();
        this.collisionH();
    }

    collisionV(){
        const mcpos = this.character.position;
        const mcvel = this.character.velocidad;
        const obj = this.platform.position;

        const pie  = mcpos.y + mcpos.height
        const cabeza = mcpos.y
        const manoizq = mcpos.x
        const manoder = mcpos.x + mcpos.width
        const arriba   = obj.y 
        const  abajo = obj.y + obj.height
        const izq = obj.x
        const der = obj.x + obj.width

        if( // desde arriba
            (mcpos.y + mcpos.height  > obj.y) &&//abajo
            (mcpos.x  < obj.x + obj.width) &&//izq
            (mcpos.x + mcpos.width > obj.x )//der
        ){

            mcpos.y=mcpos.y+1
            mcvel.dy = 0;
            console.log("colisionVA");
        }
        
        
        if( // desde abajo
            (mcpos.y  <obj.y + obj.height ) && //arriba 
            (mcpos.x  < obj.x + obj.width) &&//izq
            (mcpos.x + mcpos.width > obj.x )//der
        ){
            mcpos.y=mcpos.y-1
            mcvel.dy = 0;
            console.log("colisionVB");
        }
    }
/*

    collisionH(){
        const mcpos = this.character.position;
        const mcvel = this.character.velocidad;
        const obj = this.platform.position;

        const pie  = mcpos.y + mcpos.height
        const cabeza = mcpos.y
        const manoizq = mcpos.x
        const manoder = mcpos.x + mcpos.width
        const arriba   = obj.y 
        const  abajo = obj.y + obj.height
        const izq = obj.x
        const der = obj.x + obj.width

        if( 
        !((pie < arriba ) && //arriba 
        (cabeza  > abajo) &&//abajo
        (manoder < izq ) &&//izq
        (manoizq > der)//der
        )


        ){

            mcpos.x=mcpos.x+1
            mcvel.dx = 0;

            console.log("colisionHD");
        }
        
        
        if( // desde izquierda de la plataforma
            (mcpos.y  <obj.y + obj.height ) && //arriba 
            (mcpos.y + mcpos.height  > obj.y) &&//abajo

            (mcpos.x  < obj.x + obj.width) //izq

        ){

            mcpos.x=mcpos.x-1
            mcvel.dx = 0;
            console.log("colisionHI");
        }
    }

    collision(){
        const mcpos = this.character.position;
        const mcvel = this.character.velocidad;
        const obj = this.platform.position;

        const pie  = mcpos.y + mcpos.height
        const cabeza = mcpos.y
        const manoizq = mcpos.x
        const manoder = mcpos.x + mcpos.width
        const arriba   = obj.y 
        const  abajo = obj.y + obj.height
        const izq = obj.x
        const der = obj.x + obj.width

        console.log(mcpos)
        console.log(mcvel)
        //VALIDOS   
        if(

            !((pie < arriba ) && //arriba 
            (cabeza  > abajo) &&//abajo
            (manoder < izq ) &&//izq
            (manoizq > der)//der
            )
        ){
            
        }
        pie> arriba
        manoder > izq
        manoizq < der
        cabeza < abajo

        cabeza

        pos.y-=1


        cabeza> arriba
        manoder > izq
        manoizq < der

        pos.y-=1
        
    
    }
*/
        
    
}




export {Colision};
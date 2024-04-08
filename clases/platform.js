class Platform {
    constructor(ctx, canvas, x , y, width, height,color) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.movimiento = 2;

        
        // Posicion y de la plataforma
        this.position = {
            x: x,
            y: y,
            width: width,
            height: height
        }

        this.color = color
        ;

    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.position.x, this.position.y, this.position.width, this.position.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();

        
    }

    drawDoor(){
        let rad = this.position.width / 2
        let anchorec = rad * 2
        let altorec =  this.position.height
        let y= this.position.y 
        let x= this.position.x + rad
        let xrect = x-rad

        this.ctx.beginPath();
        this.ctx.fillStyle = '#363431';
        this.ctx.arc(x, y, rad, Math.PI, 2 * Math.PI);
        this.ctx.fillRect(xrect, y, anchorec, altorec);
        this.ctx.closePath();
        this.ctx.fill();
    }



    movePlatform(x,y){
        this.position.y += y ;
        this.position.x += x ;
    }

    drawImage(img) {
        this.ctx.drawImage(img, this.position.x, this.position.y, this.position.width, this.position.height);
    }


 
}
export { Platform};
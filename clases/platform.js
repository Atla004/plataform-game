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


 
}
export { Platform};
class Platform {
    constructor(ctx, canvas, character) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.movimiento = 2;

        // Posicion y de la plataforma
        this.height = 5;
        this.width = 100;
        this.x = (canvas.width ) / 2;
        this.y = canvas.height-50;

        this.color = "#0095DD";
        this.character = character;
    }

    draw() {
      
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
        
    }

    checkCollision(character) {
        return  character.y + character.dy+character.h > this.y && // comprueba por arriba
                character.y + character.dy < this.y + this.height && // comprueba por abajo
                character.x +character.w > this.x  && // comprueba por la izquierda
                character.x  < this.x + this.width; // comprueba por la derecha
    }
}
export { Platform};
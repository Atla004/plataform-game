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

        this.color = "red";
        this.character = character;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
        
    }

    /*
    checkCollision(character){
        if(
            this.character.x + this.character.characterWidth > this.x &&
            this.character.x < this.x + this.width &&
            this.character.y + this.character.characterHeight > this.y &&
            this.character.y < this.y + this.height
        ) {
            if(character.dy > 0) { // si la bola esta arriba de la plataforma
                character.dy = 0;
                character.y -= character.dy; // Asegura que la bola se mantenga encima de la plataforma
            } else if(character.dy < 0) { // Si la bola está abajo de la plataforma
                character.dy = 0;
                character.y = this.y + this.height; // Asegura que la bola se mantenga debajo de la plataforma
            }
        }
    
    };
    */

    movePlatform(){
        this.x += this.movimiento;
        if (this.x + this.width> this.canvas.width || this.x < 0) {
            this.movimiento = -this.movimiento;
        } 
    }
}
export { Platform};
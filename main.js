// Configuración inicial
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
var gravity = 0.5; // Fuerza de gravedad
var jumpStrength = 10; // Fuerza del salto
let friction = 0.9;
let rightPressed = false;
let leftPressed = false;
let image = new Image();
image.src = 'public/0eebed4b76e32305d7d444fb039a11c5d18e9ed6r1-1024-576v2_hq.jpg';

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Función para dibujar la bola
let ball = {
    radius: 10,
    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: 0,
    dy: 0,
    color: "#0095DD",
    draw: function() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    }
};


let platform = {
    height: 10,
    width: 100,
    x: (canvas.width ) / 2,
    y: canvas.height/2,
    color: "#0095DD",
    draw: function() {
        ctx.beginPath();
        ctx.rect(platform.x, platform.y, platform.width, platform.height);
        ctx.fillStyle = platform.color;
        ctx.fill();
        ctx.closePath();
    },
    checkCollision: function(ball) {
        return  ball.y + ball.dy > this.y-ball.radius && 
                ball.y + ball.dy < this.y + this.height + ball.radius && 
                ball.x > this.x && ball.x < this.x + this.width;
    }
};

function keyDownHandler(e) {
    var maxSpeed = 10; 
    var acceleration = 2; 
    var initialSpeed = 5; 

    if(e.key === "ArrowRight") {
        rightPressed = true;
        if (ball.dx <= 0) { 
            ball.dx = initialSpeed; // velocidad inicial
        } else if (ball.dx < maxSpeed) { // 
            ball.dx += acceleration; // Aumenta la velocidad derecha
        }
    }
    else if(e.key === "ArrowLeft") {
        leftPressed = true;
        if (ball.dx >= 0) { 
            ball.dx = -initialSpeed; // velocidad inicial
        } else if (ball.dx > -maxSpeed) { // 
            ball.dx -= acceleration; // Aumenta la velocidad izquierda
        }
    }

    if(e.key === "ArrowUp") { 
        ball.dy = -jumpStrength; // Hace que la pelota salte
    }
}

function keyUpHandler(e) {
  if(e.key === "ArrowRight") {
      rightPressed = false;
  }
  else if(e.key === "ArrowLeft") {
      leftPressed = false;
  }

}
let movimiento = 5; 
// Función para actualizar el juego cada frame
function draw() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(144, 187, 133, 0.87)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(image,0, 0, canvas.width, canvas.height);

    // Dibujar la bola y la plataforma
    ball.draw();
    platform.draw();
   
    platform.x += movimiento;
    if (platform.x + platform.width> canvas.width || platform.x < 0) {
        movimiento = -movimiento;
    }

    // Revisar si la bola choca va fuera del canvas
    if(ball.x + ball.dx > canvas.width-ball.radius || ball.x + ball.dx < ball.radius ) {
        ball.dx = 0;
    }
    if(ball.y + ball.dy > canvas.height-ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = 0;
    }

    if(platform.checkCollision(ball)) {
        if(ball.dy > 0) { // si la bola esta arriba de la plataforma
            ball.dy = 0;
            ball.y = platform.y - ball.radius; // Asegura que la bola se mantenga encima de la plataforma
        } else if(ball.dy < 0) { // Si la bola está abajo de la plataforma
            ball.dy = 0;
            ball.y = platform.y + platform.height + ball.radius; // Asegura que la bola se mantenga debajo de la plataforma
        }
    }


    // Actualizar la posición de la bola
    ball.x += ball.dx;
    ball.y += ball.dy;  
    ball.dy += gravity;

    // reducir velocidad de la bola
    if(!rightPressed && !leftPressed) {
      ball.dx *= friction;
  }

    requestAnimationFrame(draw);
}


draw();

const collisionsLevel1=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 0, 0,
    0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
    0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
    0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
    0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
    0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0,
    0, 0, 46, 46, 46, 0, 0, 46, 46, 46, 46, 46, 46, 46, 46, 0, 0,
    0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

Array.prototype.parse2D = function () {
    const rows = []
    for (let i = 0; i < this.length; i += 17){
        rows.push(this.slice(i ,i +17))
    }
    return rows
}



Array.prototype.createObjectsFrom2D = function () {
    const objects = []
    this.forEach((row, y)=>{
        row.forEach((Symbol, x)=>{
            if(Symbol===46){
                objects.push(
                    new LevelMaps({position: {x: x * 50, y: y * 32}})
                )
            }
        })
    })
    return objects
}

    


class LevelMaps {
    constructor({ position }) {
        this.position = position
        this.position.width = 50
        this.position.height = 32
    }
    draw(ctx) {
      ctx.fillStyle = "red"
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }  
    
}

class LevelMap{
    constructor(map) {
        this.map = map


    }

    createblocks(){
        Array.prototype.convertMatriz = function () {
            const rows = []
            for (let i = 0; i < this.length; i += 17){
                rows.push(this.slice(i ,i +17))
            }
            return rows
        }

        Array.prototype.createObjectsFrom2D = function () {
            const objects = []
            this.forEach((row, y)=>{
                row.forEach((Symbol, x)=>{
                    if(Symbol===46){
                        objects.push(
                            { position: {x: x * 50, y: y * 32} }
                        )
                    }
                })
            })
            return objects
        }
        
        let parsedCollisions = this.map.parse2D()
        let collisionBlock = parsedCollisions.createObjectsFrom2D()

        return collisionBlock;


    }



}
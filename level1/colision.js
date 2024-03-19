 

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
    0, 0, 0, 0, 46, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
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
                        new CollisionBlock({position: {x: x * 50, y: y * 32}})
                    )
                }
            })
        })
        return objects
    }

    
    class CollisionBlock {
        constructor({ position }) {
      this.position = position
      this.width = 50
      this.height = 32
    }
}

const parsedCollisions = collisionsblockLevel1.parse2D()
parsedCollisions.forEach((row, y)=>{
    row.forEach((Symbol, x)=>{
        if(Symbol===46){
            collisions.push(
                new CollisionBlock({position: {x: x * 50, y: y * 32}})
            )
        }
    })
})

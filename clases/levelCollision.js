

class levelCollision {
    constructor(collisionsLevel) {
        this.collisionsLevel = collisionsLevel;
    }

    collision() {
        const rows = [];
        for (let i = 0; i < this.collisionsLevel.length; i += 17){
            rows.push(this.collisionsLevel.slice(i ,i +17));
        }

        const objects = [];
        rows.forEach((row, y) => {
            row.forEach((Symbol, x) => {
                if(Symbol === 46){
                    objects.push({ position: {x: x * 50, y: y * 32, width:50 , height:32} });
                }
            });
        });

        return objects;
    }


}

export { levelCollision };
class Cell {
    constructor() {
        this.state = Cell.State.dead;
        this.state = Math.random() >= 0.5 ? Cell.State.alive : Cell.State.dead;
    }
    setPosition(position) {
        this.position = position;
        if (position.y === 400 / Cell.size) {
            this.state = Cell.State.alive;
        }
    }
    setNeighbours(neighbours) {
        this.neighbours = neighbours;
    }
    compute() {
        let neighbourLiveSum = 0;
        this.neighbours.forEach((neighbour) => {
            neighbourLiveSum += (neighbour ? neighbour.state : 0);
        });
        // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
        if (this.state === Cell.State.alive && neighbourLiveSum < 2) {
            this.newState = Cell.State.dead;
        }
        else if (this.state === Cell.State.alive && neighbourLiveSum === 2 || this.state === Cell.State.alive && neighbourLiveSum === 3) {
            this.newState = Cell.State.alive;
        }
        else if (this.state === Cell.State.alive && neighbourLiveSum > 3) {
            this.newState = Cell.State.dead;
        }
        else if (this.state === Cell.State.dead && neighbourLiveSum === 3) {
            this.newState = Cell.State.alive;
        }
        else {
            this.newState = Cell.State.dead;
        }
    }
    update() {
        this.state = this.newState;
    }
    render(context) {
        context.beginPath();
        context.fillStyle = this.state === Cell.State.alive ? "black" : "white";
        context.rect(this.position.x * Cell.size, this.position.y * Cell.size, Cell.size, Cell.size);
        context.fill();
    }
}
Cell.size = 10;
(function (Cell) {
    let State;
    (function (State) {
        State[State["dead"] = 0] = "dead";
        State[State["alive"] = 1] = "alive";
    })(State = Cell.State || (Cell.State = {}));
})(Cell || (Cell = {}));
export { Cell };

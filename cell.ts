
class Cell {
  public static size: number = 10;
  
  state: Cell.State = Cell.State.dead;
  private newState: Cell.State;
  neighbours: Cell[];
  position: Cell.Position;

  constructor() {
    this.state = Math.random() >= 0.5 ? Cell.State.alive : Cell.State.dead;
  }

  setPosition(position: Cell.Position) {
    this.position = position;
    if (position.y === 400/Cell.size) {
      this.state = Cell.State.alive;
    }
  }

  setNeighbours(neighbours: Cell[]) {
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
    // Any live cell with two or three live neighbours lives on to the next generation.
    else if (this.state === Cell.State.alive && neighbourLiveSum === 2 || this.state === Cell.State.alive && neighbourLiveSum === 3) {
      this.newState = Cell.State.alive;
    }
    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    else if (this.state === Cell.State.alive && neighbourLiveSum > 3) {
      this.newState = Cell.State.dead;
    }
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    else if (this.state === Cell.State.dead && neighbourLiveSum === 3) {
      this.newState = Cell.State.alive;
    } else {
      this.newState = Cell.State.dead;
    }
  }

  update() {
    this.state = this.newState;
  }

  render(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.fillStyle = this.state === Cell.State.alive ? "black" : "white";
    context.rect(this.position.x*Cell.size, this.position.y*Cell.size, Cell.size, Cell.size);
    context.fill();
  }
}

namespace Cell {
  export interface Position {
    x: number;
    y: number;
  }
  export enum State {
    dead = 0,
    alive = 1
  }
}

export {Cell}
import { Cell } from "./cell.js";

class Game {
  cells: Cell[];
  size: Game.Size;
  canvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;

  constructor() {
    this.size = new Game.Size(Math.ceil(this.canvas.width/Cell.size), Math.ceil(this.canvas.height/Cell.size))
    this.createCells();
  }

  private createCells() {
    let cells = new Array(this.size.width * this.size.height).fill(null) as Cell[];
    this.cells = cells.map((cell) => {
      return new Cell();
    });
    for (var i = 0; i < this.cells.length; i++) {
      let x = i % this.size.width;
      let y = Math.floor(i / this.size.width);
      let cell: Cell = this.cells[i];
      cell.setPosition({x: x, y: y});
      cell.setNeighbours(this.neighboursForCell(cell.position));
    }
  }

  private neighboursForCell(position: Cell.Position): Cell[] {
    return [
      this.cells[(position.x + 1 + this.size.width * (position.y))], // Right
      this.cells[(position.x + 1 + this.size.width * (position.y + 1))], // Bottom Right
      this.cells[(position.x + this.size.width * (position.y + 1))], // Bottom
      this.cells[(position.x - 1 + this.size.width * (position.y + 1))], // Bottom Left
      this.cells[(position.x - 1 + this.size.width * (position.y))], // Left
      this.cells[(position.x - 1 + this.size.width * (position.y - 1))], // Top Left
      this.cells[(position.x + this.size.width * (position.y - 1))], // Top
      this.cells[(position.x + 1 + this.size.width * (position.y - 1))] // Top Right
    ];
  }

  run() {
    let context: CanvasRenderingContext2D = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        
    this.cells.forEach(cell => {
      cell.compute();
    });

    this.cells.forEach(cell => {
      cell.update();
      cell.render(context);
    });

    requestAnimationFrame(this.run.bind(this));
  }
}

namespace Game {
  export class Size {
    width: number;
    height: number;

    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }
  }
}

const game = new Game();
requestAnimationFrame(game.run.bind(game));

export {Game}
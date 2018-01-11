import { Cell } from "./cell.js";
class Game {
    constructor() {
        this.canvas = document.getElementById("game-canvas");
        this.size = new Game.Size(Math.ceil(this.canvas.width / Cell.size), Math.ceil(this.canvas.height / Cell.size));
        this.createCells();
    }
    createCells() {
        let cells = new Array(this.size.width * this.size.height).fill(null);
        this.cells = cells.map((cell) => {
            return new Cell();
        });
        for (var i = 0; i < this.cells.length; i++) {
            let x = i % this.size.width;
            let y = Math.floor(i / this.size.width);
            let cell = this.cells[i];
            cell.setPosition({ x: x, y: y });
            cell.setNeighbours(this.neighboursForCell(cell.position));
        }
    }
    neighboursForCell(position) {
        return [
            this.cells[(position.x + 1 + this.size.width * (position.y))],
            this.cells[(position.x + 1 + this.size.width * (position.y + 1))],
            this.cells[(position.x + this.size.width * (position.y + 1))],
            this.cells[(position.x - 1 + this.size.width * (position.y + 1))],
            this.cells[(position.x - 1 + this.size.width * (position.y))],
            this.cells[(position.x - 1 + this.size.width * (position.y - 1))],
            this.cells[(position.x + this.size.width * (position.y - 1))],
            this.cells[(position.x + 1 + this.size.width * (position.y - 1))] // Top Right
        ];
    }
    run() {
        let context = this.canvas.getContext("2d");
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
(function (Game) {
    class Size {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }
    }
    Game.Size = Size;
})(Game || (Game = {}));
const game = new Game();
requestAnimationFrame(game.run.bind(game));
export { Game };

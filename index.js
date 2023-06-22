let grid;
let rows, cols;
let spacing;
let path = [];
let currSpace;
let nextSpace = [
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 }
]

// initializes the canvas and starting values such as grid size and
// random values for the starting position, and pushes the first space
// onto the stack
function setup() {
    createCanvas(400, 400);
    frameRate();

    rows = 4;
    cols = 4;
    spacing = floor(width / rows);
    grid = makeGrid(rows, cols);
    grid = populateGrid(grid);
    
    let startingRow = floor(Math.random() * rows);
    let startingCol = floor(Math.random() * cols);

    currSpace = grid[startingRow][startingCol];
    path.push(currSpace);
    currSpace.visited = true;

    stroke(255);
    //drawSpaceOutlines();
}

function draw() {
    //console.log(currSpace.getNextSpace());
    background(0);

    noFill();
    strokeWeight(spacing / 3);
    beginShape();
    for (let space of path) {
        vertex(space.x, space.y);
    }
    endShape();

    if (path.length == rows * cols) {
        console.log("Solved");
        noLoop();
    }

    currSpace = currSpace.getNextSpace();
    //console.log(currSpace);
    if (currSpace) {
        path.push(currSpace);
        currSpace.visited = true;
    }
    else {
        let space = path.pop();
        space.backtrack();
        currSpace = path[path.length - 1];
    }

    

}

function isValid(i, j) {
    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j].visited) {
        return false;
    }

    return true;

}

function getRelativeSpace(di, dj) {
    let nextI = currSpace.i + di;
    let nextJ = currSpace.j + dj;
    if (nextI < 0 || nextI >= cols || nextJ < 0 || nextJ >= rows) {
        return false;
    }

    return grid[nextI][nextJ];
}

// creates a 2d array of size rows x cols with unititialized values
function makeGrid(rows, cols) {
    let newGrid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        newGrid[i] = new Array(cols);
    }

    return newGrid;
}

// populates each space in the grid with a new Space object
function populateGrid(grid) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Space(i, j);
        }
    }

    return grid;
}

function drawSpaceOutlines() {
    for (let i = spacing; i < width; i += spacing) {
        // vertical lines
        line(i, 0, i, height);

        // horizontal lines
        line(0, i, width, i);
    }
}
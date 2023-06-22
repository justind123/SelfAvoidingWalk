class Space {
    nextSpace = [
        { di: -1, dj: 0, tried: false },
        { di: 0, dj: 1, tried: false },
        { di: 1, dj: 0, tried: false },
        { di: 0, dj: -1, tried: false }
    ]
    
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.x = j * spacing + (spacing / 2);
        this.y = i * spacing + (spacing / 2);
        this.visited = false;
        this.nextSpaceIndex = 0;
    }

    getNextSpace() {
        let validSpaces = [];
        for (let space of this.nextSpace) {
            if (isValid(this.i + space.di, this.j + space.dj) && !space.tried) {
                validSpaces.push(space);
            }
        }

        if (validSpaces.length == 0) {
            return undefined;
        }
        
        let nextSpace = random(validSpaces);
        nextSpace.tried = true;
        return grid[this.i + nextSpace.di][this.j + nextSpace.dj];
    }

    backtrack() {
        this.visited = false;
        for (let space of this.nextSpace) {
            space.tried = false;
        }
    }
}
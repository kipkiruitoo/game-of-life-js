function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
// declare our grid, cols , rows and resolution we want
var grid;
var cols;
var rows;
var resolution = 5;


function setup() {
    // create a canvas of 800 by 800 pixels
  createCanvas(800, 800);

//   divide width and height by resolution to get  the number of columns and rows

  cols = width / resolution;
  rows = height / resolution;

//   make a 2 dimensional array with the columns and rows
  grid = make2DArray(cols, rows);

//   fill in each item in the 2D array with either a 1 or a zero
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = Math.round(Math.random());
    }
  }

//   set the framerate at which draw will be called
  frameRate(30);
}



function draw() {
    // make the background of our canvas black
  background(0);

//   iterate through each item in the 2D array and draw a white square on that position in the canvas
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var x = i * resolution;
      var y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution, resolution);
      }
    }
  }
//   create the next 2dArray()
  var next = make2DArray(cols, rows);
//   iterate through each of the item
  for (var i$0 = 0; i$0 < cols; i$0++) {
    for (var j$1 = 0; j$1 < rows; j$1++) {

        // apply rules of the game of life
      var state = grid[i$0][j$1];
     
        var neighbours = countNeightbours(grid, i$0, j$1);
        if (state == 0 && neighbours == 3) {
          next[i$0][j$1] = 1;
        } else {
          if (state == 1 && (neighbours < 2 || neighbours > 3)) {
            next[i$0][j$1] = 0;
          } else {
            next[i$0][j$1] = state;
          }
        }
      
    }
  }
  grid = next;
}
function countNeightbours(grid, x, y) {
    // counts the sum of alive neigbours in a cell i.e those with 1s
  var sum = 0;
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
    
        // workaround for the edge cells

        let col = (x+i+ cols ) % cols;
        let row = (y+j+rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];

// 


  return sum;
}

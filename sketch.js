var grid;
var size;
var chance;
var delay;
var defaultDelay;
var type;

function create2DArray(cols,rows,def){
  arr = new Array(cols);
  for(var i=0;i<cols;i++){
    arr[i] = new Array(rows);
    for(var j=0;j<rows;j++){
      arr[i][j] = def;
    }
  }
  return arr;
}

function setup() {
  createCanvas(800,600);
  frameRate(60);
  size = 10;
  type = 1;
  chance = 0;
  defaultDelay = 0;
  delay = defaultDelay;
  grid = create2DArray(floor(width/size),floor(height/size),0);
  for(var x=0;x<grid.length;x++){
    for(var y=0;y<grid[0].length;y++){
      if(random(0,1)*100<chance){
        grid[x][y]=1;
      }
    }
  }
}

function mouseDragged(){
  if(delay<=0){
    grid[round(map(mouseX,0,width,0,grid.length,true))][round(map(mouseY,0,height,0,grid[0].length,true))] = type;
    console.log("Debug info: " + delay,round(map(mouseX,0,width,0,grid.length-1,true)),round(map(mouseY,0,height,0,grid[0].length-1,true)), grid[round(map(mouseX,0,width,0,grid.length,true))][round(map(mouseY,0,height,0,grid[0].length,true))]);
    delay=defaultDelay;
  } else {
    delay--;
  }
}

function draw() {
  update();
  for(var x=0;x<grid.length;x++){
    for(var y=0;y<grid[0].length;y++){
      noStroke();
      if(grid[x][y]==0){
        fill(0);
        rect(x*size,y*size,size,size);
      }
      if(grid[x][y]==1){
        fill(240,230,140);
        rect(x*size,y*size,size,size);
      }
      if(grid[x][y]==2){
        fill(0,0,230);
        rect(x*size,y*size,size,size);
      }
      if(grid[x][y]==3){
        fill(211);
        rect(x*size,y*size,size,size);
      }
      if(grid[x][y]==4){
        fill(220,220,245);
        rect(x*size,y*size,size,size);
      }
      if(grid[x][y]==5){
        fill(255+random(-20,20),127+random(-20,20),80+random(-20,20));
        rect(x*size,y*size,size,size);
      }
    }
  }
}

function update(){
  if(keyIsDown(48)||keyIsDown(96)){
    type=0;
  } else if(keyIsDown(49)||keyIsDown(97)){
    type=1;
  } else if(keyIsDown(50)||keyIsDown(98)){
    type=2;
  } else if(keyIsDown(51)||keyIsDown(99)){
    type=3;
  } else if(keyIsDown(52)||keyIsDown(100)){
    type=4;
  } else if(keyIsDown(53)||keyIsDown(101)){
    type=5;
  }
  for(var x=0;x<grid.length;x++){
    for(var y=0;y<grid[0].length;y++){
      updateParticle(x,y);
    }
  }
}

function updateParticle(x,y){
  if(grid[x][y]==1){
    if(grid[x][y+1]==0||grid[x][y+1]==2||grid[x][y+1]==5){
      if(grid[x][y+1]==0){
        grid[x][y]=0;
      } else if(grid[x][y+1]==2){
        grid[x][y]=2;
      } else if(grid[x][y+1]==5){
        grid[x][y]=5;
      }
      grid[x][y+1]=1;
    } else {
      if(random(0,1)<0.5){
        if(x+1<grid.length){
          if(grid[x+1][y]==0){
            grid[x][y]=0;
            grid[x+1][y]=1;
          }
        }
      } else {
        if(x-1>-1){
          if(grid[x-1][y]==0){
            grid[x][y]=0;
            grid[x-1][y]=1;
          }
        }
      }
    }
  }
  if(grid[x][y]==2){
    if(grid[x][y+1]==0||grid[x][y+1]==5){
      if(grid[x][y+1]==0){
        grid[x][y]=0;
      } else if(grid[x][y+1]==5){
        grid[x][y]=4;
      }
      if(grid[x][y]!=4){
        grid[x][y+1]=2;
      } else if(grid[x][y]==4){
        grid[x][y+1]=1;
      }
    } else {
      if(random(0,1)<0.5){
        if(x+1<grid.length){
          if(grid[x+1][y]==0){
            grid[x][y]=0;
            grid[x+1][y]=2;
          }
        }
      } else {
        if(x-1>-1){
          if(grid[x-1][y]==0){
            grid[x][y]=0;
            grid[x-1][y]=2;
          }
        }
      }
    }
  }
  if(grid[x][y]==3){
    if(grid[x][y+1]==0||grid[x][y+1]==1||grid[x][y+1]==2||grid[x][y+1]==5){
      if(grid[x][y+1]==0){
        grid[x][y]=0;
      } else if(grid[x][y+1]==2){
        grid[x][y]=2;
      } else if(grid[x][y+1]==1){
        grid[x][y]=1;
      } else if(grid[x][y+1]==5){
        grid[x][y]=5;
      }
      if(grid[x][y]!=5){
        grid[x][y+1]=3;
      } else if(grid[x][y]==5){
        grid[x][y+1]=5;
      }
    } else {
      if(random(0,1)<0.5){
        if(x+1<grid.length){
          if(grid[x+1][y]==0){
            grid[x][y]=0;
            grid[x+1][y]=3;
          }
        }
      } else {
        if(x-1>-1){
          if(grid[x-1][y]==0){
            grid[x][y]=0;
            grid[x-1][y]=3;
          }
        }
      }
    }
  }
  if(grid[x][y]==4){
    if(grid[x][y-1]==0){
      if(grid[x][y-1]==0){
        grid[x][y]=0;
      }
      grid[x][y-1]=4;
    } else {
      if(random(0,1)<0.5){
        if(x+1<grid.length){
          if(grid[x+1][y]==0){
            grid[x][y]=0;
            grid[x+1][y]=4;
          }
        }
      } else {
        if(x-1>-1){
          if(grid[x-1][y]==0){
            grid[x][y]=0;
            grid[x-1][y]=4;
          }
        }
      }
    }
  }
  if(grid[x][y]==5){
    if(grid[x][y+1]==0||grid[x][y+1]==3||grid[x][y+1]==2){
      if(grid[x][y+1]==0){
        grid[x][y]=0;
      } else if(grid[x][y+1]==3){
        grid[x][y]==5;
      } else if(grid[x][y+1]==2){
        grid[x][y]==4;
      }
      if(grid[x][y]!=4){
        grid[x][y+1]=5;
      } else if(grid[x][y]==4){
        grid[x][y+1]=1;
      }
    } else {
      if(random(0,1)<0.5){
        if(x+1<grid.length){
          if(grid[x+1][y]==0){
            grid[x][y]=0;
            grid[x+1][y]=5;
          }
        }
      } else {
        if(x-1>-1){
          if(grid[x-1][y]==0){
            grid[x][y]=0;
            grid[x-1][y]=5;
          }
        }
      }
    }
  }
}

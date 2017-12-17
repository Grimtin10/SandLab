var grid;
var gridTimes;
var size;
var chance;
var delay;
var defaultDelay;
var type;
var defaultKeyDelay;
var keyDelay;
var now;

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
  defaultKeyDelay = 3;
  keyDelay = defaultKeyDelay;
  grid = create2DArray(floor(width/size),floor(height/size),0);
  gridTimes = create2DArray(grid.length,grid[0].length,0);
  now = millis();
  for(var x=0;x<grid.length;x++){
    for(var y=0;y<grid[0].length;y++){
      if(random(0,1)*100<chance){
        grid[x][y]=7;
      }
    }
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
      if(grid[x][y]==5||grid[x][y]==6){
        fill(255+random(-20,20),127+random(-20,20),80+random(-20,20));
        rect(x*size,y*size,size,size);
      }
      if(grid[x][y]==7){
        fill(152,251,152);
        rect(x*size,y*size,size,size);
      }
      if(grid[x][y]==8){
        fill(108,108,152);
        rect(x*size,y*size,size,size);
      }
      if(grid[x][y]==9){
        fill(124,252,0);
        rect(x*size,y*size,size,size);
      }
      if(grid[x][y]==10){
        fill(139,69,19);
        rect(x*size,y*size,size,size);
      }
    }
  }
  textSize(32);
  fill(255);
  text("Type: " + type, 5, height-40);
  textSize(10);
  fill(255);
  text("FPS: " + getFPS(), 5, 40);
}

function getFPS(){
  var fr = (millis()-now);
  now = millis();
  return fr;
}

function update(){
  if(mouseIsPressed){
    var mX = round(map(mouseX,0,width,0,grid.length,true));
    var mY = round(map(mouseY,0,height,0,grid[0].length,true));
    if(delay<=0){
      if(type==4){
        gridTimes[mX][mY] = 75;
      } else if(type==6){
        gridTimes[mX][mY] = 10;
      } else if(type==10){
        gridTimes[mX][mY] = 120;
      }
      grid[mX][mY] = type;
      console.log("Debug info: " + delay,round(map(mouseX,0,width,0,grid.length-1,true)),round(map(mouseY,0,height,0,grid[0].length-1,true)), grid[round(map(mouseX,0,width,0,grid.length,true))][round(map(mouseY,0,height,0,grid[0].length,true))]);
      delay=defaultDelay;
    } else {
      delay--;
    }
  }
  //Old code:
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
  } else if(keyIsDown(54)||keyIsDown(102)){
    type=6;
  } else if(keyIsDown(55)||keyIsDown(103)){
    type=7;
  }
  if(keyIsDown(37)&&type>0&&keyDelay<=0){
    type--;
    keyDelay=defaultKeyDelay;
  } else if(keyIsDown(39)&&keyDelay<=0){
    type++;
    keyDelay=defaultKeyDelay;
  } else {
    keyDelay--;
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
            grid[x+1][y]=4;
            gridTimes[x+1][y]=gridTimes[x][y];
            grid[x][y]=0;
            gridTimes[x][y]=0;
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
  if(grid[x][y]==6){
    var temp = gridTimes[x][y];
    var gone = false;
    if(temp<1){
      gone = true;
      grid[x][y]=0;
    }
    if(grid[x][y-1]==0||grid[x][y-1]==2){
      if(grid[x][y-1]==0){
        grid[x][y]=0;
        gridTimes[x][y-1]=temp-1;
      } else if(grid[x][y-1]==2){
        grid[x][y]==4;
        gridTimes[x][y-1]=temp-1;
      }
      if(grid[x][y]!=4&&!gone){
        grid[x][y-1]=6;
      }
    } else if(!gone){
      if(random(0,1)<0.5){
        if(x+1<grid.length){
          if(grid[x+1][y]==0){
            grid[x+1][y]=6;
            gridTimes[x+1][y]=gridTimes[x][y];
            grid[x][y]=0;
            gridTimes[x][y]=0;
            gridTimes[x+1][y]--;
          }
        }
      } else {
        if(x-1>-1){
          if(grid[x-1][y]==0){
            grid[x-1][y]=6;
            gridTimes[x-1][y]=gridTimes[x][y];
            grid[x][y]=0;
            gridTimes[x][y]=0;
            gridTimes[x-1][y]--;
          }
        }
      }
    }
  }
  if(grid[x][y]==7){
    var xPlus = x+1;
    var xMinus = x-1;
    var gone = false;
    if(xPlus>grid.length-1){
      xPlus = grid.length-1;
    }
    if(xMinus<0){
      xMinus=0;
    }
    if(grid[xMinus][y]==6){
      grid[x][y]=6;
      gone=true;
    }
    if(grid[xPlus][y]==6){
      grid[x][y]=6;
      gone=true;
    }
    if(grid[x][y-1]==6){
      grid[x][y]=6;
      gone=true;
    }
    if(grid[x][y+1]==6){
      grid[x][y]=6;
      gone=true;
    }
    if(grid[x][y-1]==0&&!gone){
      grid[x][y]=0;
      grid[x][y-1]=7;
    } else if(!gone){
      if(random(0,1)<0.5){
        if(x+1<grid.length){
          if(grid[x+1][y]==0){
            grid[x+1][y]=7;
            grid[x][y]=0;
          }
        }
      } else if(!gone){
        if(x-1>-1){
          if(grid[x-1][y]==0){
            grid[x-1][y]=7;
            grid[x][y]=0;
          }
        }
      }
    }
  }
  if(grid[x][y]==9){
    var xPlus = x+1;
    var xMinus = x-1;
    if(xPlus>grid.length-1){
      xPlus = grid.length-1;
    }
    if(xMinus<0){
      xMinus=0;
    }
    if(grid[x][y+1]!=8&&grid[x][y+1]!=9){
      grid[x][y+1]=0;
    }
    if(grid[x][y+1]!=8&&grid[x][y+1]!=9){
      grid[x][y]=0;
      grid[x][y+1]=9;
    } else {
      if(random(0,1)<0.5){
        if(x+1<grid.length){
          if(grid[x+1][y]==0){
            grid[x+1][y]=9;
            grid[x][y]=0;
          }
        }
      } else {
        if(x-1>-1){
          if(grid[x-1][y]==0){
            grid[x-1][y]=9;
            grid[x][y]=0;
          }
        }
      }
    }
  }
  if(grid[x][y]==10){
    var xPlus = x+1;
    var xMinus = x-1;
    var gone = false;
    var temp = gridTimes[x][y];
    if(xPlus>grid.length-1){
      xPlus = grid.length-1;
    }
    if(xMinus<0){
      xMinus=0;
    }
    if(grid[xMinus][y]==6||grid[xPlus][y]==6||grid[x][y-1]==6||grid[x][y+1]==6){
      if(grid[xPlus][y]==0||grid[xPlus][y]==6){
        grid[xPlus][y]=6;
      }
      if(grid[xMinus][y]==0||grid[xMinus][y]==6){
        grid[xMinus][y]=6;
      }
      if(grid[x][y-1]==0||grid[x][y-1]==6){
        grid[x][y-1]=6;
      }
      if(grid[x][y+1]==0||grid[x][y+1]==6){
        grid[x][y+1]=6;
      }
      gridTimes[x][y]=temp-1;
    }
    if(gridTimes[x][y]<=0){
      gone=true;
    }
    if(gone){
      grid[x][y]=0;
    }
  }
}

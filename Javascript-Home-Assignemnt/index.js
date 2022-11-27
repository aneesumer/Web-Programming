const form = document.getElementById("data");
const game = document.querySelector(".gameSection");
const playerName = document.querySelector("#name");
const timerSpan = document.querySelector('#timeSpan');
const homePage = document.querySelector("#homePageButton");
const resultName = document.querySelector("#resultPlayer");
const resultMap = document.querySelector("#resultMap");
const resulttime = document.querySelector("#resultTime");
const radioButtons = document.getElementsByName("radio");
const nameField = document.querySelector("#nameSpan");
const table = document.querySelector("#table");
const checkGame = document.querySelector("#checkButton");
const restart = document.querySelector("#restartButton");

let gameType = null;
let gameT = null;
let gameDimensions = null;
let passed = false;
let start = null;

const easy = [
  ["", "", "", "1,B", "", "", ""],
  ["", "0,B", "", "", "", "2,B", ""],
  ["", "", "", "", "", "", ""],
  ["-1,B", "", "", "-1,B", "", "", "-1,B"],
  ["", "", "", "", "", "", ""],
  ["", "-1,B", "", "", "", "2,B", ""],
  ["", "", "", "3,B", "", "", ""],
];

const advanced = [
  ["", "", "0,B", "", "-1,B", "", ""],
  ["", "", "", "", "", "", ""],
  ["-1,B", "", "-1,B", "", "3,B", "", "-1,B"],
  ["", "", "", "1,B", "", "", ""],
  ["2,B", "", "-1,B", "", "-1,B", "", "-1,B"],
  ["", "", "", "", "", "", ""],
  ["", "", "-1,B", "", "2,B", "", ""],
];

const extreme = [
  ["", "-1,B", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "3,B", "", "2,B", "", "-1,B"],
  ["", "0,B", "-1,B", "", "", "", "", "-1,B", "", ""],
  ["", "", "", "", "-1,B", "", "", "", "", ""],
  ["", "1,B", "", "", "-1,B", "1,B", "-1,B", "", "", ""],
  ["", "", "", "-1,B", "-1,B", "-1,B", "", "", "3,B", ""],
  ["", "", "", "", "", "-1,B", "", "", "", ""],
  ["", "", "1,B", "", "", "", "", "0,B", "-1,B", ""],
  ["3,B", "", "-1,B", "", "0,B", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "0,B", ""],
];

const copyEasy = JSON.parse(JSON.stringify(easy));
const copyAdvanced = JSON.parse(JSON.stringify(advanced));
const copyExtreme = JSON.parse(JSON.stringify(extreme));


form.addEventListener("submit", (event) => {
  form.style.display = "none";
  game.style.display = "block";
  nameField.innerText = playerName.value;

  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) gameT = radioButtons[i].value;
  }

  if (gameT === "Easy") (gameType = easy), (gameDimensions = 7);
  else if (gameT === "Advanced") (gameType = advanced), (gameDimensions = 7);
  else (gameType = extreme), (gameDimensions = 10);
  
  tableGenerator(gameType, gameDimensions);
  start = Date.now();
  event.preventDefault();
});

checkGame.addEventListener('click', checkGameFunction);
restart.addEventListener('click', restartFunction);
homePage.addEventListener('click', homePageFunction);

delegate(table, "click", "td", clickHandler);

function clickHandler() {
  const rowIndex = this.parentElement.rowIndex;
  const columnIndex = this.cellIndex;

  // Bulb Insertion
  if (gameType[rowIndex][columnIndex].split(",")[1] !== "LB" && gameType[rowIndex][columnIndex].split(",")[1] !== "B") {
    
    if (gameType[rowIndex][columnIndex] === "" ) {
        gameType[rowIndex][columnIndex] = "1,LB";
    }
    else {
      gameType[rowIndex][columnIndex] = (parseInt(gameType[rowIndex][columnIndex].split(",")[0]) + 1).toString() 
      + "," + "LB";
    }
    this.style.backgroundColor = "yellow";
    this.innerHTML = ' <img id="bulb" src="/images/bulb.png">';
    lightSpreader(rowIndex, columnIndex, this);
    redColorCheck();
    numberedBlackBoxCheck();
    checkGameFunction();
    
  // Bulb Removal  
  } else if (gameType[rowIndex][columnIndex].split(",")[1] === "LB") {
    if ( gameType[rowIndex][columnIndex].split(",")[0] === "1") {
    gameType[rowIndex][columnIndex] = "";
    this.style.backgroundColor = "transparent";
    this.innerHTML = "";
    }
    else {
      gameType[rowIndex][columnIndex] = (parseInt(gameType[rowIndex][columnIndex].split(",")[0])-1)
      .toString() + "," + "L";
      this.innerHTML = "";
    }
    lightRemover(rowIndex, columnIndex, this);
    yellowColorCheck();
    numberedBlackBoxRevert();
    checkGameFunction();
  }
}

function tableGenerator(arr, dimensions) {
  for (let i = 0; i < dimensions; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < dimensions; j++) {
      if (arr[i][j] === "") {
        let td = document.createElement("td");
        tr.appendChild(td);
      } else if (arr[i][j].split(",")[1] === "B") {
        let td = document.createElement("td");
        td.style.backgroundColor = "black";
        if (arr[i][j].split(",")[0] !== "-1") {
          td.innerText = arr[i][j].split(",")[0];
        }
        td.style.color = "white";
        tr.appendChild(td);
      }
    }
    table.appendChild(tr);
  }
}

function lightSpreader(i, j, td) {
  const row = table.rows[i];
  let k;

  //Left
  k = j + 1;
  while (k < gameDimensions && gameType[i][k].split(",")[1] !== "B") {
    if (gameType[i][k] === "") gameType[i][k] = "1,L";
    else {
      gameType[i][k] =
        (parseInt(gameType[i][k].split(",")[0]) + 1).toString() +
        "," +
        gameType[i][k].split(",")[1];
    }
    row.cells[k].style.backgroundColor = "yellow";
    k++;
  }

  //Right
  k = j - 1;

  while (k > -1 && gameType[i][k].split(",")[1] !== "B") {
    if (gameType[i][k] === "") gameType[i][k] = "1,L";
    else {
      gameType[i][k] =
        (parseInt(gameType[i][k].split(",")[0]) + 1).toString() +
        "," +
        gameType[i][k].split(",")[1];
    }

    row.cells[k].style.backgroundColor = "yellow";
    k--;
  }

  //Top
  let r = i - 1;

  while (r > -1 && gameType[r][j].split(",")[1] !== "B") {
    if (gameType[r][j] === "") gameType[r][j] = "1,L";
    else {
      gameType[r][j] =
        (parseInt(gameType[r][j].split(",")[0]) + 1).toString() +
        "," +
        gameType[r][j].split(",")[1];
    }

    k = table.rows[r];
    k.cells[j].style.backgroundColor = "yellow";
    r--;
  }

  //Bottom
  r = i + 1;

  while (
    r < gameDimensions &&
    (gameType[r][j] === "" || gameType[r][j].split(",")[1] !== "B")
  ) {
    if (gameType[r][j] === "") gameType[r][j] = "1,L";
    else {
      gameType[r][j] =
        (parseInt(gameType[r][j].split(",")[0]) + 1).toString() +
        "," +
        gameType[r][j].split(",")[1];
    }

    k = table.rows[r];
    k.cells[j].style.backgroundColor = "yellow";
    r++;
  }
  
}

function lightRemover(i, j, td) {
  const row = table.rows[i];
  let k;

  //Left
  k = j + 1;
  while (k < gameDimensions && gameType[i][k].split(",")[1] !== "B") {
    let val = parseInt(gameType[i][k].split(",")[0]);
    val--;

    if (val === 0) {
      gameType[i][k] = "";
      row.cells[k].style.backgroundColor = "transparent";
    } else {
      gameType[i][k] = val.toString() + "," + gameType[i][k].split(",")[1];
    }

    k++;
  }

  //Right
  k = j - 1;

  while (k > -1 && gameType[i][k].split(",")[1] !== "B") {
    let val = parseInt(gameType[i][k].split(",")[0]);
    val--;

    if (val === 0) {
      gameType[i][k] = "";
      row.cells[k].style.backgroundColor = "transparent";
    } else {
      gameType[i][k] = val.toString() + "," + gameType[i][k].split(",")[1];
    }
    k--;
  }

  //Top
  let r = i - 1;

  while (r > -1 && gameType[r][j].split(",")[1] !== "B") {
    let val = parseInt(gameType[r][j].split(",")[0]);
    val--;
    k = table.rows[r];

    if (val === 0) {
      gameType[r][j] = "";
      k.cells[j].style.backgroundColor = "transparent";
    } else {
      gameType[r][j] = val.toString() + "," + gameType[r][j].split(",")[1];
    }

    r--;
  }

  //Bottom
  r = i + 1;

  while (r < gameDimensions && gameType[r][j].split(",")[1] !== "B") {
    let val = parseInt(gameType[r][j].split(",")[0]);
    val--;
    k = table.rows[r];

    if (val === 0) {
      gameType[r][j] = "";
      k.cells[j].style.backgroundColor = "transparent";
    } else {
      gameType[r][j] = val.toString() + "," + gameType[r][j].split(",")[1];
    }
    r++;
  }
  
}

function redColorCheck () {
  for (let i = 0; i < gameDimensions; i++) {
    for (let j = 0; j < gameDimensions; j++) {
      if(gameType[i][j].split(",")[1] === "LB" && parseInt(gameType[i][j].split(",")[0]) > 1) {
        r = table.rows[i];
        r.cells[j].style.backgroundColor = "red";

      }
    }
  }
}

function yellowColorCheck () {
  for (let i = 0; i < gameDimensions; i++) {
    for (let j = 0; j < gameDimensions; j++) {
      if(gameType[i][j] === "1,LB" || gameType[i][j].split(",")[1] === "L")  {
        r = table.rows[i];
        r.cells[j].style.backgroundColor = "yellow";
       
    
      }
    }
  }
}

function numberedBlackBoxCheck() {
  for (let i = 0; i < gameDimensions; i++) {
    for (let j = 0; j < gameDimensions; j++) {
      
      let counter = 0;

      if (parseInt(gameType[i][j].split(",")[0]) !== -1 && gameType[i][j].split(",")[1] === "B") {
        if (j + 1 < gameDimensions )
        {
             if (gameType[i][j+1].split(",")[1] === "LB")  {
            counter++;
            }
        }
        if (j - 1 >= 0 )
        {
          if (gameType[i][j-1].split(",")[1] === "LB" )  {
            counter++;
          }
        }
        if (i + 1 < gameDimensions  ) {

         if (gameType[i+1][j].split(",")[1] === "LB" )  {
         counter++;
        }
        }
        if (i - 1 >= 0 )
        {
        if (gameType[i-1][j].split(",")[1] === "LB")  {
            counter++;
           }
        }
      
        if (counter === parseInt(gameType[i][j].split(",")[0])) {
          let row = table.rows[i];
          row.cells[j].style.backgroundColor = 'green'; 

        }
        else if (counter > parseInt(gameType[i][j].split(",")[0])) {
          let row = table.rows[i];
          row.cells[j].style.backgroundColor = 'black'; 
        }
      }

     
  
    }
  }
}

function numberedBlackBoxRevert() {
    for (let i = 0; i < gameDimensions; i++) {
      for (let j = 0; j < gameDimensions; j++) {
        
        let counter = 0;
  
        if (parseInt(gameType[i][j].split(",")[0]) !== -1 && gameType[i][j].split(",")[1] === "B") {
          if (j + 1 < gameDimensions )
          {
               if (gameType[i][j+1].split(",")[1] === "LB")  {
              counter++;
              }
          }
          if (j - 1 >= 0 )
          {
            if (gameType[i][j-1].split(",")[1] === "LB" )  {
              counter++;
            }
          }
          if (i + 1 < gameDimensions  ) {
  
           if (gameType[i+1][j].split(",")[1] === "LB" )  {
           counter++;
          }
          }
          if (i - 1 >= 0 )
          {
          if (gameType[i-1][j].split(",")[1] === "LB")  {
              counter++;
             }
          }

          if (counter < parseInt(gameType[i][j].split(",")[0])) {
            let row = table.rows[i];
            row.cells[j].style.backgroundColor = 'black'; 
          }
          else if (counter === parseInt(gameType[i][j].split(",")[0])) {
            let row = table.rows[i];
            row.cells[j].style.backgroundColor = 'green'; 
          }
        }
  
      }
    }
  }

function checkGameFunction () {
  let redFailedState = true;
  for (let i = 0; i < gameDimensions; i++) {
    let row = table.rows[i];
    for (let j = 0; j < gameDimensions; j++) {
      let col = row.cells[j];
      if (typeof (parseInt(gameType[i][j].split(",")[0])) === 'number' &&
          parseInt(gameType[i][j].split(",")[0]) !== -1 && gameType[i][j].split(",")[1] === "B") {
        if (col.style.backgroundColor === 'green') {
          redFailedState = redFailedState && true;
        }
        else {
          redFailedState = redFailedState && false;
        }
      }
      
      if (col.style.backgroundColor === 'red') {
        redFailedState = redFailedState && false;
      }
      
      if (col.style.backgroundColor === "" || col.style.backgroundColor === "transparent") {
        redFailedState = redFailedState && false;
      }

    }
  }

  if (redFailedState) resultSpan.innerText = "You Won !!" , end = Date.now() , passed = true;
  else resultSpan.innerText = "Your game has some issues", passed = false ;
}

function restartFunction() {
  if (gameT === "Easy") {
    for (let i = 0; i < gameDimensions; i++) {
      for (let j = 0; j < gameDimensions; j++) {
        gameType[i][j] = copyEasy[i][j];
      }
    }
  
  table.innerHTML = "";
  tableGenerator(easy, gameDimensions);

  }
  if (gameT === "Advanced") {
    for (let i = 0; i < gameDimensions; i++) {
      for (let j = 0; j < gameDimensions; j++) {
        gameType[i][j] = copyAdvanced[i][j];
      }
    }

    table.innerHTML = "";
    tableGenerator(advanced, gameDimensions);
  }

  if (gameT === "Extreme") {
    for (let i = 0; i < gameDimensions; i++) {
      for (let j = 0; j < gameDimensions; j++) {
        gameType[i][j] = copyExtreme[i][j];
      }
    }

    table.innerHTML = "";
    tableGenerator(extreme, gameDimensions);
  }

  start = Date.now();
  passed = false;
  console.log(gameType);
}

function homePageFunction () {
  alert("The Game will be Erased");
  if (passed) {
    resultName.innerText = playerName.value;
    resultMap.innerText = gameT;
    resulttime.innerText = timerSpan.innerText;
  } 
  restartFunction();
  table.innerHTML = "";
  game.style.display = "none";
  form.style.display = "block";
 
}

setInterval(function(){
  if (!passed) {
    console.log("Time");
      let dt = Math.floor((Date.now() - start) / 1000)
      let sec = String(dt % 60).padStart(2, '0')
      let min = ('0' + Math.floor(dt / 60)).slice(-2)
      timerSpan.innerText = `${min}:${sec}`
  }
}, 500)

function delegate(parent, type, selector, handler) {
  parent.addEventListener(type, function (event) {
    const targetElement = event.target.closest(selector);
    if (this.contains(targetElement)) handler.call(targetElement, event);
  });
}

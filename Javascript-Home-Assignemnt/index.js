const form = document.getElementById("data");
const game = document.querySelector(".gameSection");
const playerName = document.querySelector("#name");
const radioButtons = document.getElementsByName("radio");
const nameField = document.querySelector("#nameSpan");
const table = document.querySelector("#table");
let gameType = null;
let gameDimensions = null;
let redFailedState = 0;


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

form.addEventListener("submit", (event) => {
  form.style.display = "none";
  game.style.display = "block";
  nameField.innerText = playerName.value;

  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) gameType = radioButtons[i].value;
  }

  if (gameType === "Easy") (gameType = easy), (gameDimensions = 7);
  else if (gameType === "Advanced") (gameType = advanced), (gameDimensions = 7);
  else (gameType = extreme), (gameDimensions = 10);

  tableGenerator(gameType, gameDimensions);
  event.preventDefault();
});

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
    this.innerHTML = ' <img id="bulb" src="bulb.png">';
    lightSpreader(rowIndex, columnIndex, this);
    redColorCheck();
    numberedBlackBoxCheck();
    
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

  //console.log(gameType);
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

  console.log(gameType);
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


function delegate(parent, type, selector, handler) {
  parent.addEventListener(type, function (event) {
    const targetElement = event.target.closest(selector);
    if (this.contains(targetElement)) handler.call(targetElement, event);
  });
}

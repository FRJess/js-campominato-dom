// **Consegna**
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
// ****L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.


// VARIABLES DECLARATION AND INIZIALIZATION
const main = document.querySelector(".game-wrapper");
const inputBtn = document.querySelector("#play");
const levelSelect = document.querySelector("#level");

const gridLevels = [100, 81, 49];
const BOMBS_NUMBER = 16;
let bombs = [];
let score = 0;

// Play button action
inputBtn.addEventListener("click", play);

// FUNCTIONS

//Start and reset the game
function play(){
  //cells numbers as per level selected
  const cellNumbers = gridLevels[levelSelect.value];

  reset();

  //Grid generator
  generatePlayground(cellNumbers);
  bombs = bombsGenerator(cellNumbers);
};


//Grid generator
function generatePlayground(cellNumbers){
  const grid = document.createElement("div");
  grid.className = "grid";

  for(let i = 1; i <= cellNumbers; i++){
    const cell = cellGenerator(i, cellNumbers)
    grid.append(cell);
  }
  main.append(grid);
};

//Cell generator
function cellGenerator(cellId, cellNumbers){
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.classList.add("square"+cellNumbers);
  //custom propriety for cells
  cell.cellId = cellId;
  cell.innerHTML = `<span>${cellId}</span>`;
  cell.addEventListener("click", handleClickCell, {once: true});
  return cell;
};

//Click on cell action
function handleClickCell(){
  console.log(this.cellId)
  //check if it is a bomb
  if(!bombs.includes(this.cellId)){
    this.classList.add("clicked");
    score++;
    const cells = document.getElementsByClassName("cell");
    //if score is all cells - bombs = win
    if(score === cells.length - BOMBS_NUMBER){
      endGame(true)
    }
  }else{
    endGame(false)
  }
};

//How to end the game
function endGame(isWin){
  let message;
  const cells = document.getElementsByClassName("cell");
  if(isWin){
    message = `Hai vinto!`;
  }else{
    message = `Hai perso! Il tuo risultato è ${score} su ${cells.length - BOMBS_NUMBER}. <br> Riprova!`;
  }
  document.querySelector(".endMessage").innerHTML = message;
  showBombs();
  const endLevel = document.createElement("div");
  endLevel.className = "end-game-level";
  document.querySelector(".game-wrapper").append(endLevel);
};

//Show all bombs at the end of the game
function showBombs(){
  const cells = document.getElementsByClassName("cell");

  for(let i = 0; i < cells.length; i++){
    
    const cell = cells[i];
    if(bombs.includes(cell.cellId)){
      cell.classList.add("bomb");
    }
  }
};

//Bombs generator
function bombsGenerator(cellNumbers){
  
  const bombsGenerated = [];
  
  while(bombsGenerated.length < BOMBS_NUMBER){
    
    const bomb = generateRandomNumber(1, cellNumbers);
    
    if(!bombsGenerated.includes(bomb)){
      bombsGenerated.push(bomb);
    }
  }
  return bombsGenerated;
};

//Random number
function generateRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Reset
function reset(){
  main.innerHTML = "";
  score = 0;
  document.querySelector(".endMessage").innerHTML = "";
};
const plato = document.getElementById("plato");
const buttons = document.querySelectorAll(".color-select");
const victoire = document.querySelector(".victory");
const perdu = document.querySelector(".loose");
const debut = document.querySelector(".debut");
const go = document.querySelector(".go");
let z = "";
let w = 0;
let h = 0;
let blanc = 0;
let rouge = 0;
let iRep = 0;
let creaB = 0;
let tour = 0;
const playerCode = [];

buttons.forEach((button) => {
  button.disabled = true;
});

// Fenêtre règles du jeu
go.addEventListener("click", function () {
  debut.style.display = "none";
  buttons.forEach((button) => {
    button.disabled = false;
  });
});

// Création du plateau de jeu
for (let i = 0; i < 12; i++) {
  z += `<div class="container-fluid column-gap-3 row justify-content-center py-2 px-0 m-0">
          <div class="trou ms-2"></div>
          <div class="trou"></div>
          <div class="trou"></div>
          <div class="trou me-2"></div>
          <div class="case p-0 ms-2" id="reponse"></div>
        </div>`;
}
plato.innerHTML = z;
const reponse = document.querySelectorAll("#reponse");
const trous = document.querySelectorAll(".trou");

// Création de notre code secret
function newCode() {
  const code = ["w", "b", "r", "j", "v", "n"];
  const shuffledArray = code.sort((a, b) => 0.5 - Math.random());
  code.sort((a, b) => 0.5 - Math.random());
  code.sort((a, b) => 0.5 - Math.random());
  return shuffledArray.slice(2);
}
const code = newCode();
console.log(code);

// Trous bien ronds
trous.forEach((trou, index) => {
  w = trou.offsetWidth;
  trou.style.height = `${w}px`;
});

// Redimensionnement avec la fenètre
window.addEventListener("resize", function () {
  trous.forEach((trou) => {
    w = trou.offsetWidth;
    trou.style.height = `${w}px`;
  });
});

// Fonction principale
buttons.forEach((button) => {
  button.addEventListener("click", function jouer() {
    if (iRep == tour) {
      makeReset();
      tour++;
    }
    let v = button.innerHTML;
    playerCode.push(v);
    coloringHole(playerCode.length, v);
    if (playerCode.length % 4 == 0) {
      testCode = playerCode.slice(-4);
      for (let i = 0; i < testCode.length; i++) {
        for (let j = 0; j < testCode.length; j++) {
          if (i === j && testCode[i] === code[j]) {
            rouge++;
          } else if (i !== j && testCode[i] === code[j]) {
            blanc++;
          }
        }
      }
      if (rouge === 4) {
        cestgagne();
      } else {
        point(rouge, blanc);
        iRep++;
        if (iRep === 12) {
          cestperdu();
        }
        rouge = 0;
        blanc = 0;
      }
    }
  });
});

// Victoire du joueur
function cestgagne() {
  reponse[iRep].innerHTML = window.matchMedia("(min-width: 1000px)").matches
    ? `<p>Victory</p>`
    : `<p>GG</p>`;
  victoire.style.display = "block";
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

// Défaite du joueur
function cestperdu() {
  perdu.style.display = "block";
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

// Colore les trous
function coloringHole(index, color) {
  let trou = trous[index - 1];
  trou.style.boxShadow = "1px 1px 5px #252525";
  switch (color) {
    case "j":
      trou.style.backgroundColor = "#d8d20e";
      break;
    case "r":
      trou.style.backgroundColor = "#b41616";
      break;
    case "b":
      trou.style.backgroundColor = "#1f36cf";
      break;
    case "v":
      trou.style.backgroundColor = "#17830a";
      break;
    case "n":
      trou.style.backgroundColor = "#000";
      break;
    case "w":
      trou.style.backgroundColor = "#fff";
      break;
  }
}

// Bouton reset
function makeReset() {
  const reset = document.createElement("button");
  reset.innerHTML = `Reset`;
  reponse[iRep].appendChild(reset);
  reset.addEventListener("click", function () {
    let modulo = playerCode.length % 4;
    for (let a = 1; a <= modulo; a++) {
      trous[playerCode.length - a].style.backgroundColor = "#555a5f";
    }
    playerCode.length -= modulo;
  });
}

// Créer points rouges/blancs
function point(x, y) {
  reponse[iRep].innerHTML = "";
  for (let b = 0; b < x; b++) {
    const red = document.createElement("span");
    reponse[iRep].appendChild(red);
    red.style.backgroundColor = "brown";
    h = red.offsetHeight;
    red.style.width = `${h}px`;
    console.log(red);
    console.log(reponse[iRep]);
  }
  for (let c = 0; c < y; c++) {
    const white = document.createElement("span");
    reponse[iRep].appendChild(white);
    white.style.backgroundColor = "#fff";
    h = white.offsetHeight;
    white.style.width = `${h}px`;
  }
}

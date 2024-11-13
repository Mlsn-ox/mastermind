const plato = document.getElementById("plato");
const buttons = document.querySelectorAll(".color-select");
let z = "";
let w = 0;
let blanc = 0;
let rouge = 0;
const playerCode = [];

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
const reponse = document.getElementById("reponse");
const trous = document.querySelectorAll(".trou");

// Création de notre code
function newCode() {
  const code = ["w", "b", "r", "j", "v", "n"];
  // On mélange notre tableau
  const shuffledArray = code.sort((a, b) => 0.5 - Math.random());
  code.sort((a, b) => 0.5 - Math.random());
  code.sort((a, b) => 0.5 - Math.random());
  // On retire les 2 premières valeurs
  return shuffledArray.slice(2);
}
const code = newCode();
console.log(code);

trous.forEach((trou) => {
  w = trou.offsetWidth;
  trou.style.height = `${w}px`;
});

window.addEventListener("resize", function () {
  trous.forEach((trou) => {
    w = trou.offsetWidth;
    trou.style.height = `${w}px`;
  });
});

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    let v = button.innerHTML;

    if (playerCode.length < 4) {
      playerCode.push(v);
      coloringHole(playerCode.length, v);

      if (playerCode.length == 4) {
        console.log(playerCode);

        for (let i = 0; i < playerCode.length; i++) {
          for (let j = 0; j < code.length; j++) {
            if (i === j && playerCode[i] === code[j]) {
              // Bonne couleur au bon endroit, rajoute un pion rouge
              rouge++;
            } else if (i !== j && playerCode[i] === code[j]) {
              // Bonne couleur pas au bon endroit, rajoute un pion blanc
              blanc++;
            }
          }
        }
        console.log(`Rouge : ${rouge} et Blanc : ${blanc}`);
      }
    }
  });
});

function coloringHole(index, color) {
  let trou = trous[index - 1];
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
      trou.style.backgroundColor = "black";
      break;
    case "w":
      trou.style.backgroundColor = "white";
      break;
  }
}

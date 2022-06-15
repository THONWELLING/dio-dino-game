const dino = document.querySelector(".dino");
console.log(".dino");
const background = document.querySelector(".background");

let dinoIsJumping = false;
let gameOver = false;
let position = 0;

const handleKeyUp = (event) => {
  if (event.keyCode === 32) {
    if (!dinoIsJumping) {
      jump();
    }
  }
};

//Criando função de pular do dinossauro
const jump = () => {
  dinoIsJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      // Descendo
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          dinoIsJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      //Subindo
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
};

//criando os cactus aleatórios
const createCactus = () => {
  const cactus = document.createElement("div");
  let cactusPosition = 1000;
  let randomCactus = Math.random() * 6000;

  if (gameOver) return;

  cactus.classList.add("cactus");
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + "px";

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      //Game Over
      clearInterval(leftInterval);
      gameOver = true;
      document.body.innerHTML =
        '<h1 class="game-over">Game Over</br>Try Again</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);
  setTimeout(createCactus, randomCactus);
};
createCactus();
document.addEventListener("keyup", handleKeyUp);

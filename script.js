/* (Comentado para redirecionar para battle.html)
const playMachine = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

const playRound = (human, machine) => {
    if (human === machine) {
        return "Empate!";
    } else if (
        (human === 'rock' && machine === 'scissors') ||
        (human === 'paper' && machine === 'rock') ||
        (human === 'scissors' && machine === 'paper')
    ) {
        return "Você ganhou! 🎉";
    } else {
        return "Você perdeu! ❌";
    }
}

const buttonRock = document.querySelector(".button-rock");
const buttonPaper = document.querySelector(".button-paper");
const buttonScissors = document.querySelector(".button-scissors");

const resultDiv = document.createElement("div");
resultDiv.classList.add("result");
document.body.appendChild(resultDiv);

const handleClick = (humanChoice) => {
    const machineChoice = playMachine();
    const result = playRound(humanChoice, machineChoice);
    resultDiv.textContent = `Você escolheu: ${humanChoice}. Máquina escolheu: ${machineChoice}. ${result}`;
} 


buttonRock.addEventListener("click", () => handleClick("rock"));
buttonPaper.addEventListener("click", () => handleClick("paper"));
buttonScissors.addEventListener("click", () => handleClick("scissors"));

*/ 


const buttonRock = document.querySelector(".button-rock");
const buttonPaper = document.querySelector(".button-paper");
const buttonScissors = document.querySelector(".button-scissors");

// Redireciona para battle.html enviando a escolha correta via URL
buttonRock.addEventListener("click", () => {
  window.location.href = "battle.html?choice=rock";
});

buttonPaper.addEventListener("click", () => {
  window.location.href = "battle.html?choice=paper";
});

buttonScissors.addEventListener("click", () => {
  window.location.href = "battle.html?choice=scissors";
});
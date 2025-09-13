// battle.js

// Pega a escolha do jogador via URL
const params = new URLSearchParams(window.location.search);
const human = params.get("choice");

// Choices disponíveis
const choices = ['rock', 'paper', 'scissors'];

// Labels em português
const labels = {
    rock: 'Pedra',
    paper: 'Papel',
    scissors: 'Tesoura'
};

// Caminhos das imagens
const imagePaths = choice => `./img/${choice}.png`;

// Elementos do DOM
const playerImg = document.getElementById("player-img");
const playerLabel = document.getElementById("player-label");
const machineImg = document.getElementById("machine-img");
const secondEl = document.getElementById("seconds");
const resultEl = document.getElementById("result");
const countdownWrap = document.getElementById("countdown");
const btnPlayAgain = document.getElementById("play-again");
const btnBackHome = document.getElementById("back-home");
const buttonsWrap = document.querySelector(".buttons");

// Inicialmente escondemos os botões
buttonsWrap.style.display = "none";

// Placar acumulado usando localStorage
let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;
let machineScore = parseInt(localStorage.getItem("machineScore")) || 0;

// Função para atualizar placar
function updateScore() {
    playerLabel.innerHTML = `${playerScore} : <span class="label" id="machine-label">${machineScore}</span>`;
}

// Mostra placar inicial
updateScore();

// Função para determinar o resultado
function playRound(human, machine) {
    if (human === machine) return "Empate!";
    if (
        (human === 'rock' && machine === 'scissors') ||
        (human === 'paper' && machine === 'rock') ||
        (human === 'scissors' && machine === 'paper')
    ) {
        return "Você Ganhou!";
    }
    return "Você Perdeu!";
}

// Define estilo do resultado
function setResultStyle(text) {
    resultEl.classList.remove("win", "lose", "tie");
    if (text.includes("Ganhou")) resultEl.classList.add("win");
    else if (text.includes("Perdeu")) resultEl.classList.add("lose");
    else resultEl.classList.add("tie");
}

// Verifica escolha válida
if (!choices.includes(human)) {
    countdownWrap.classList.add("hidden");
    resultEl.classList.remove("result-hidden");
    resultEl.textContent = "Escolha inválida! Volte e escolha novamente.";
    btnPlayAgain.textContent = "Voltar";
    buttonsWrap.style.display = "flex"; // Mostra botão de voltar
    btnPlayAgain.addEventListener("click", () => window.location.href = "index.html");
} else {
    // Contagem regressiva de 3 segundos
    let seconds = 3;
    secondEl.textContent = seconds;

    // Shuffle das imagens do jogador e da máquina
    const shuffleInterval = setInterval(() => {
        const randomPlayer = choices[Math.floor(Math.random() * choices.length)];
        const randomMachine = choices[Math.floor(Math.random() * choices.length)];
        playerImg.src = imagePaths(randomPlayer);
        machineImg.src = imagePaths(randomMachine);
    }, 100);

    // Contador
    const countdownInterval = setInterval(() => {
        seconds -= 1;
        secondEl.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            clearInterval(shuffleInterval); // Para o shuffle

            // Mostra escolhas finais
            playerImg.src = imagePaths(human);
            const machineChoice = choices[Math.floor(Math.random() * choices.length)];
            machineImg.src = imagePaths(machineChoice);

            // Resultado final
            const resultText = playRound(human, machineChoice);
            resultEl.textContent = resultText;
            setResultStyle(resultText);
            resultEl.classList.remove("result-hidden");
            countdownWrap.classList.add("hidden");

            // Atualiza placar
            if (resultText.includes("Ganhou")) playerScore++;
            else if (resultText.includes("Perdeu")) machineScore++;

            updateScore(); // Atualiza a tela

            // Salva no localStorage
            localStorage.setItem("playerScore", playerScore);
            localStorage.setItem("machineScore", machineScore);

            // Mostra os botões apenas agora
            buttonsWrap.style.display = "flex";
        }
    }, 1000);
}

// Botões
btnPlayAgain.addEventListener("click", () => {
    // Volta ao menu para nova escolha, mantém o placar
    window.location.href = "index.html";
});

btnBackHome.addEventListener("click", () => {
    // Zera o placar ao sair
    localStorage.setItem("playerScore", 0);
    localStorage.setItem("machineScore", 0);
    window.location.href = "index.html";
});

let correctAnswers = 0;
let wrongAnswers = 0;
let rounds = 0;
const totalRounds = 10;

const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const submitAnswerBtn = document.getElementById('submitAnswer');
const resultPopup = document.getElementById('resultPopup');
const resultText = document.getElementById('resultText');
const closePopupBtn = document.getElementById('closePopup');
const finalPopup = document.getElementById('finalPopup');
const finalResult = document.getElementById('finalResult');
const restartGameBtn = document.getElementById('restartGame');
const leftStars = document.getElementById('leftStars');
const rightCircles = document.getElementById('rightCircles');

let currentSum;

function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

function generateSum() {
    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    currentSum = num1 + num2;
    questionEl.textContent = `${num1} + ${num2} = ?`;
    displayStarsAndCircles(num1, num2);
    answerEl.value = ''; // Limpiar el campo de respuesta
    toggleSubmitButton(); // Actualizar estado del botón
}

function displayStarsAndCircles(num1, num2) {
    leftStars.innerHTML = '';
    rightCircles.innerHTML = '';
    for (let i = 0; i < num1; i++) {
        leftStars.innerHTML += '🦋';
    }
    for (let i = 0; i < num2; i++) {
        rightCircles.innerHTML += '🦄'; // Círculos negros
    }
}

function toggleSubmitButton() {
    submitAnswerBtn.disabled = answerEl.value.trim() === '';
}

submitAnswerBtn.addEventListener('click', () => {
    const userAnswer = parseInt(answerEl.value);
    if (!isNaN(userAnswer)) {
        rounds++;
        if (userAnswer === currentSum) {
            correctAnswers++;
            resultText.textContent = '¡Correcto!';
            resultPopup.style.backgroundColor = 'green';
        } else {
            wrongAnswers++;
            resultText.textContent = `Incorrecto, la respuesta correcta es ${currentSum}`;
            resultPopup.style.backgroundColor = 'red';
        }
        resultPopup.classList.remove('hidden');
        answerEl.value = '';
    }

    if (rounds === totalRounds) {
        setTimeout(showFinalResult, 500);
    } else {
        setTimeout(generateSum, 500);
    }
});

closePopupBtn.addEventListener('click', () => {
    resultPopup.classList.add('hidden');
});

function showFinalResult() {
    finalResult.textContent = `Juego terminado. Respuestas correctas: ${correctAnswers}, Respuestas incorrectas: ${wrongAnswers}.`;
    finalPopup.classList.remove('hidden');
}

restartGameBtn.addEventListener('click', () => {
    // Restablecemos los contadores
    correctAnswers = 0;
    wrongAnswers = 0;
    rounds = 0;

    // Ocultamos el popup final y generamos una nueva suma
    finalPopup.classList.add('hidden');
    generateSum();
});

// Verificar el estado del botón al cambiar el input
answerEl.addEventListener('input', toggleSubmitButton);

// Iniciar el juego
generateSum();

const display = document.getElementById('display');
const startButton = document.getElementById('start-button');
const switchButton = document.getElementById('switch-button');
const resetButton = document.getElementById('reset-button');
const darkModeToggleButton = document.getElementById('mode-toggle');
const timerEndSound = document.getElementById('timer-end-sound');

let timerId;
let isFiveMinutes = false;
let remainingTime = 25 * 60; // min to sec
let originalTime = remainingTime;
let isDarkMode = false;

function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    clearInterval(timerId);
    timerId = setInterval(() => {
        remainingTime--;
        updateDisplay();

        if (remainingTime === 0) {
            clearInterval(timerId);
            timerEndSound.play();
            alert("Time's Up!");
            remainingTime = originalTime;
            updateDisplay();
        }
    }, 1000);
}

startButton.addEventListener('click', startTimer);

switchButton.addEventListener('click', () => {
    isFiveMinutes = !isFiveMinutes;
    remainingTime = isFiveMinutes ? 5 * 60 : 25 * 60;
    updateDisplay();
    clearInterval(timerId);
    switchButton.textContent = isFiveMinutes ? 'Switch to 25 Min.' : 'Switch to 5 Min.';
});

resetButton.addEventListener('click', () => {
    clearInterval(timerId);
    remainingTime = isFiveMinutes ? 5 * 60 : originalTime;
    updateDisplay();
});

darkModeToggleButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    darkModeToggleButton.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
});

updateDisplay();
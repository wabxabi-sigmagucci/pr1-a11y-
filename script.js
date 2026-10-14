
const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const playerStatus = document.getElementById("playerStatus");

const playPath = "M8 5v14l11-7z";
const pausePath = "M6 5h4v14H6z M14 5h4v14h-4z";

const totalDuration = 18 * 60 + 40;

let currentSeconds = 0;
let isPlaying = false;
let timer = null;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );
}

function updateProgress() {
    const percentage = (currentSeconds / totalDuration) * 100;

    progress.value = percentage;
    progress.style.setProperty("--progress", `${percentage}%`);

    currentTime.textContent = formatTime(currentSeconds);
    currentTime.setAttribute("datetime", `PT${currentSeconds}S`);

    duration.textContent = formatTime(totalDuration);
}

function updateButton() {
    playIcon.innerHTML = `<path d="${isPlaying ? pausePath : playPath}"></path>`;

    playButton.setAttribute(
        "aria-label",
        isPlaying ? "Призупинити" : "Відтворити"
    );

    playButton.setAttribute("aria-pressed", String(isPlaying));

    playerStatus.textContent = isPlaying
        ? "Демонстрація відтворення"
        : "Відтворення призупинено";
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function startTimer() {
    stopTimer();

    timer = setInterval(() => {
        if (currentSeconds >= totalDuration) {
            currentSeconds = 0;
            isPlaying = false;

            stopTimer();
            updateButton();
            updateProgress();

            return;
        }

        currentSeconds++;
        updateProgress();
    }, 1000);
}

playButton.addEventListener("click", () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
        startTimer();
    } else {
        stopTimer();
    }

    updateButton();
});

progress.addEventListener("input", () => {
    currentSeconds = Math.round(
        (Number(progress.value) / 100) * totalDuration
    );

    updateProgress();
});

updateProgress();
updateButton();

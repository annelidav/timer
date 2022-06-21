const display = document.querySelector('[data-name="display"]');
const stop = document.querySelector('[data-name="stop"]');
const start = document.querySelector('[data-name="start"]');
const reset = document.querySelector('[data-name="reset"]');

toggleDisplay(reset, false);
toggleDisplay(stop, true);

function toggleDisplay(element, show) {
  element.style.display = show ? "inline" : "none";
}

let milliseconds = 0;
let intervalId = null;

start.addEventListener("click", () => {
  if (intervalId === null) {
    intervalId = setInterval(() => {
      updateTimer((milliseconds += 10));
    }, 10);
  }
  toggleDisplay(reset, false);
  toggleDisplay(stop, true);
});

stop.addEventListener("click", () => {
  pauseTimer();
  toggleDisplay(reset, true);
  toggleDisplay(stop, false);
});

reset.addEventListener("click", () => {
  pauseTimer();
  updateTimer();
  milliseconds = 0;
  toggleDisplay(reset, false);
  toggleDisplay(stop, true);
});

function pauseTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function updateTimer(timeInMilliseconds = 0) {
  const secondsToMinute = 60;
  const milliseconds = timeInMilliseconds % 1000;
  const timeInSeconds = Math.floor(timeInMilliseconds / 1000);
  const seconds = timeInSeconds % secondsToMinute;
  const minutes = (timeInSeconds - seconds) / secondsToMinute;
  const formattedTime =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0") +
    ":" +
    milliseconds.toString().padStart(3, "0").slice(0, -1);

  display.textContent = formattedTime;
}

updateTimer();

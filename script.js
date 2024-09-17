let timerInterval;
let elapsedTime = 0;
let isRunning = false;

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    document.getElementById("start-btn").disabled = true;
    document.getElementById("pause-btn").disabled = false;
    document.getElementById("reset-btn").disabled = false;
    document.getElementById("lap-btn").disabled = false;
    
    const startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(function () {
      elapsedTime = Date.now() - startTime;
      document.getElementById("time-display").innerText = formatTime(elapsedTime);
    }, 1000);
  }
}

function pauseStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
  document.getElementById("start-btn").disabled = false;
  document.getElementById("pause-btn").disabled = true;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  document.getElementById("time-display").innerText = "00:00:00";
  document.getElementById("laps-list").innerHTML = '';
  document.getElementById("start-btn").disabled = false;
  document.getElementById("pause-btn").disabled = true;
  document.getElementById("reset-btn").disabled = true;
  document.getElementById("lap-btn").disabled = true;
}

function lapTime() {
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement("li");
  lapItem.innerText = `Lap: ${lapTime}`;
  document.getElementById("laps-list").appendChild(lapItem);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num < 10 ? "0" + num : num;
}

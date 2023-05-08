const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
startFunct = () => {
  //   body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.setAttribute('disabled', '');
};
stopFunct = () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
};

startBtn.addEventListener('click', startFunct);
stopBtn.addEventListener('click', stopFunct);

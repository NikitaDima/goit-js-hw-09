function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timerId = null;
let isActiv = false;
buttonStart.addEventListener('click', () => {
  if (isActiv) {
    return;
  }
  timerId = setInterval(() => {
    isActiv = true;
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  isActiv = false;
});

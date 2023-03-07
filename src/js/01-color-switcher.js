function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timerId = null;
buttonStart.addEventListener('click', () => {
  if (timerId === 1) {
    return;
  }
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
});

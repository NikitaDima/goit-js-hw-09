// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('button[data-start]');
const dataInput = document.querySelector('#datetime-picker');
const dayEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
buttonStart.setAttribute('disabled', true);
let timerId = null;
let userTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userTime = selectedDates[0].getTime();
    // console.log(userTime);
  },
};

flatpickr(dataInput, options);
// console.log(userTime);

const timer = {
  start() {
    // const inputDate = new Date(dataInput.value).getTime();
    timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - userTime;
      const timerComponents = convertMs(deltaTime);
      console.log(timerComponents);
    }, 1000);
  },
};

timer.start();

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

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

buttonStart.addEventListener('click', startTime);

flatpickr(dataInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userTime = selectedDates[0];
    const currentTime = new Date();
    if (userTime - currentTime >= 0) {
      buttonStart.disabled = false;
    } else {
      window.alert('Please choose a date in the future');
    }
  },
});

function startTime() {
  buttonStart.disabled = true;
  timerId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = userTime.getTime() - currentTime.getTime();
    convertMs(deltaTime);
    if (deltaTime < 0) {
      clearInterval(timerId);
      // не ідеальний варіант...
      secondsEl.textContent = `0${0}`;
      minutesEl.textContent = `0${0}`;
      hoursEl.textContent = `0${0}`;
      dayEl.textContent = `0${0}`;
    }
  }, 1000);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  dayEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;

  return { days, hours, minutes, seconds };
}

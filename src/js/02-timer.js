// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
const calendar = document.getElementById('datetime-picker');
const Days = document.querySelector('span[data-days]');
const Hours = document.querySelector('span[data-hours]');
const Minutes = document.querySelector('span[data-minutes]');
const Seconds = document.querySelector('span[data-seconds]');
const start = document.querySelector('button[data-start]');
start.setAttribute('disabled', true);
let timer = null;
let time = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            alert('Please choose a date in the future');
            return;
        }

    time = selectedDates[0] - Date.now();
    const { days, hours, minutes, seconds } = convertMs(time);
    Days.textContent = addLeadingZero(days); 
    Hours.textContent = addLeadingZero(hours);
    Minutes.textContent = addLeadingZero(minutes);
    Seconds.textContent = addLeadingZero(seconds);
      start.removeAttribute('disabled');
  },
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
flatpickr(calendar, options);
const onClickStart = () => {
    timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer);
      start.removeAttribute('disabled');
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(time);
    Days.textContent = addLeadingZero(days);
    Hours.textContent = addLeadingZero(hours);
    Minutes.textContent = addLeadingZero(minutes);
    Seconds.textContent = addLeadingZero(seconds);
    time -= 1000;
    }, 1000);
  start.setAttribute('disabled', true);
};
start.addEventListener('click', onClickStart);

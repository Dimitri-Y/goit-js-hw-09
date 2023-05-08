import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const inputPicker = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');

let dateObject;
let dateDifference;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    localStorage.setItem('selectedDates', selectedDates[0]);
    setDate();
  },
};

const setDate = () => {
  const dateDefault = options.defaultDate;
  const date = new Date(localStorage.getItem('selectedDates'));
  dateDifference = date.getTime() - dateDefault.getTime();
  if (dateDifference <= 0) {
    window.alert('Please choose a date in the future');
    startBtn.setAttribute('disabled', '');
  } else {
    startBtn.removeAttribute('disabled');
    dateObject = convertMs(dateDifference);
  }
};

const HandleStartBtn = event => {
  console.log(dateObject);
  timerId = setInterval(() => {
    spanDays.textContent = padWithLeadingZeros(dateObject.days, 2);
    spanHours.textContent = padWithLeadingZeros(dateObject.hours, 2);
    spanMinutes.textContent = padWithLeadingZeros(dateObject.minutes, 2);
    spanSeconds.textContent = padWithLeadingZeros(dateObject.seconds, 2);
    dateDifference -= 1000;
    dateObject = convertMs(dateDifference);
  }, 1000);
};

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
function padWithLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, '0');
}

clearInterval(timerId);
flatpickr(inputPicker, options);
startBtn.addEventListener('click', HandleStartBtn);

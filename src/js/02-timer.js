import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timeDays = document.querySelector('span[data-days]');
const timeHours = document.querySelector('span[data-hours]');
const timeMinutes = document.querySelector('span[data-minutes]');
const timeSeconds = document.querySelector('span[data-seconds]');

const timer = document.querySelector('.timer');

const input = document.querySelector('#datetime-picker');
const srartBtn = document.querySelector('button[data-start]');
console.log(input);

const currentDate = new Date();

// console.log(date);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',

  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      srartBtn.disabled = true;
      return;
    }
    srartBtn.disabled = false;
  },
};

const calendar = flatpickr(input, options);
let intervalId = null;

srartBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  startTimer.start();
}

const startTimer = {
  start() {
    intervalId = setInterval(() => {
      const selectedDate = calendar.selectedDates[0];
      const currentDate = Date.now()
      const dateCount = selectedDate - currentDate;

      if (dateCount <= 0) {
        clearInterval(intervalId);
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(dateCount);
      console.log(`${days} : ${hours} : ${minutes} : ${seconds}`);

      timeDays.texttextContent = days;
      timeHours.textContent = hours;
      timeMinutes.textContent = minutes;
      timeSeconds.textContent = seconds;
    }, 1000);
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

timer.style.display = 'flex'
timer.style.gap = '30px'
timer.style.fontSize = '40px'
timer.style.backgroundColor = 'rgba(150, 233, 236, 0.583)'
srartBtn.style.backgroundColor = 'rgba(40, 243, 9, 0.74)'
srartBtn.style.fontSize = '20px'
srartBtn.style.borderRadius = '10px'
input.style.fontSize = '30px';
input.style.backgroundColor = '#f5f4fa';
input.style.borderRadius = '4px';

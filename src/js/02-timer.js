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
//   altInput: true,
//   altFormat: 'F j, Y',
//   dateFormat: 'Y-m-d',

  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
    //   srartBtn.disabled = true;
      return;
    }
    // srartBtn.disabled = false;
  },
};

input.addEventListener('change', ()=>{
    const selectedDate = calendar.selectedDates[0]
    if(selectedDate<=currentDate){
        Notiflix.Notify.warning('Please choose a date in the future')
        srartBtn.disabled = true;
        return
    }
    srartBtn.disabled = false;
    
}
)

const calendar = flatpickr(input, options);
let intervalId = null;

srartBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
    Notiflix.Notify.success('START TIMER!')
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

      timeDays.textContent = days;
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
// timer.style.backgroundColor = 'rgba(150, 233, 236, 0.583)'
srartBtn.style.backgroundColor = '#f5f4fa'
timer.style.textShadow= '6px 3px 6px rgba(87,85,75,0.67)'
srartBtn.style.fontSize = '30px';
srartBtn.style.borderRadius = '8px'
srartBtn.style.padding = '0 50px'
input.style.fontSize = '30px';
input.style.backgroundColor = '#f5f4fa';
input.style.borderRadius = '8px';
const body = document.querySelector('body');
body.style.background= 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'

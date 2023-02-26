import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { Notify } from 'notiflix'

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

// console.log(form.elements);

function onFormSubmit(evt) {
  evt.preventDefault();

  const { delay, step, amount } = evt.currentTarget;

  console.log(amount, delay, step);

  promisesCounter(Number(delay), Number(step), Number(amount));
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

function promisesCounter(delay, step, amount) {
  for (let i = 0; i < amount; i += 1) {
    const promisePosition = i + 1;
    const delayAmount = delay + step * i;

    createPromise(promisePosition, delayAmount).then(onResolve).catch(onReject);
  }
}

function onResolve({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
  
}

function onReject({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

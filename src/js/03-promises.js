import Notiflix from 'notiflix';

const form = document.querySelector('form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');

const formSubmit = event => {
  event.preventDefault();
  let amount = parseInt(inputAmount.value);
  let delay = parseInt(inputDelay.value);
  let step = parseInt(inputStep.value);
  if (amount <= 0 || delay <= 0 || step || 0) {
    Notiflix.Notify.failure(`❌ Всі данні повинні бути більше нуля`);
  } else {
    for (let position = 1; position <= amount; position += 1) {
      createPromise(position, delay + (position - 1) * step)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ i, j }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
    form.reset();
  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', formSubmit);

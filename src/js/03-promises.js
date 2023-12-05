import Notiflix from 'notiflix';
const form = document.querySelector('.form');
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
const options = {
  timeout: 2000,
};
function onclick(evt) {
  evt.preventDefault();
  const delay = Number(evt.target.delay.value);
  const step = Number(evt.target.step.value);
  const amount = Number(evt.target.amount.value);
  for (let i = 0; i < amount; i += 1) {
    let position = i + 1;
    let alldelay = i * step + delay;
    console.log(alldelay);
    createPromise(position, alldelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay} ms`,
          options);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay} ms`,options);
      });
  }
  evt.target.reset();
}
form.addEventListener('submit', onclick);
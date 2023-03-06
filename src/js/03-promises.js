const delayEl = document.querySelector('[name = delay]');
const stepEl = document.querySelector('[name=step]');
const amountEl = document.querySelector('[name = amount]');
const createPromisEl = document.querySelector('.form');

createPromisEl.addEventListener('submit', createPromise);

function createPromise(e) {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    const {
      elements: { delay, step, amount },
    } = e.currentTarget;
    let DELAY = Number(delay.value);
    for (let i = 0; i >= 5; i++) {
      DELAY += Number(step.value);
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve(`✅ Fulfilled promise ${i} in ${DELAY}ms`);
        } else {
          reject(`❌ Rejected promise ${i} in ${DELAY}ms`);
        }
      }, DELAY);
    }
  });
}

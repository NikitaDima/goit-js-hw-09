const createPromisEl = document.querySelector('.form');
let DELEY = 0;
createPromisEl.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;
  for (let i = 1; i <= Number(amount.value); i++) {
    DELEY = Number(delay.value) + Number(step.value) * i;
    createPromise(i, DELEY)
      .then(({ position, delay }) =>
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        console.log(`❌ Rejected promise ${position} in ${delay}ms`)
      );
  }
}

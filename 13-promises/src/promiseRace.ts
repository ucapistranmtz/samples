const racingPromises: Promise<string>[] = [];

for (let index = 0; index < 5; index++) {
  const promiseIndex = index;
  racingPromises.push(
    new Promise<string>((resolve) => {
      const timeOut = Math.random() * 1000;
      setTimeout(() => {
        console.log(`function #${promiseIndex} after  ${timeOut}Ms`);
        resolve(`Promise #${promiseIndex} with thimeoit ${timeOut}`);
      }, timeOut);
    })
  );
}

(async () => {
  Promise.race(racingPromises).then((result) => {
    console.log("result", result);
  });
})();

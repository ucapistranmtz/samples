const allPromises: Promise<string>[] = [];

for (let index = 0; index < 5; index++) {
  const timeOut = Math.random() * 1000;
  const promiseId = index;

  allPromises.push(
    new Promise<string>((resolve, reject) => {
      if (promiseId === 2) {
        reject(
          new Error(`Promise #${promiseId}, it was not possible to finish this`)
        );
      } else
        setTimeout(() => {
          resolve(`promise #${promiseId} finishing after ${timeOut}Ms`);
        }, timeOut);
    })
  );
}

(() => {
  Promise.all(allPromises)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
})();

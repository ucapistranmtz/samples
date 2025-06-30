const promises: Promise<void>[] = [];

for (let index = 0; index < 5; index++) {
  promises.push(
    new Promise<void>((resolve) => {
      const timeOut = (Math.random() + 1 + index) * 10000;
      setTimeout(() => {
        console.log(`function #${index} after  ${timeOut}Ms`);
        resolve();
      });
    })
  );
}

(async () => {
  const response = await Promise.allSettled(promises);
  response.forEach((promise, index) => {
    console.log(`Promise #${index}`, promise.status);
  });
})();

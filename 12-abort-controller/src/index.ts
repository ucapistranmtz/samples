const controller = new AbortController();

type RetryOptions = {
  fetchOptons: RequestInit;
  delayMs: number;
  timeOutMs: number;
  retries: number;
};

const fetchWithRetry = async (url: string, retryOptions: RetryOptions) => {
  const abortController = new AbortController();
  const { timeOutMs, delayMs, retries } = retryOptions;
  const id = setTimeout(() => {
    abortController.abort();
  }, timeOutMs);
  try {
    const response: Response = await fetch(url, {
      ...retryOptions.fetchOptons,
      signal: abortController.signal,
    });
    clearTimeout(id);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return response;
  } catch (error) {
    clearTimeout(id);
    if (retries) {
      console.warn(`Retrying ..(${3 - retries + 1})`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return fetchWithRetry(url, {
        ...retryOptions,
        delayMs: delayMs * 2,
        retries: retries - 1,
      });
    } else {
      throw new Error(`Failed after retries: ${error}`);
    }
  }
};

(async () => {
  try {
    await fetchWithRetry("http://test.test", {
      retries: 3,
      fetchOptons: {},
      delayMs: 0,
      timeOutMs: 0,
    });
  } catch (error) {
    console.error("Expected Failure:..", error);
  }
})();

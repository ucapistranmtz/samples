const controller = new AbortController();

type RetryOptions = {
  fetchOptons: RequestInit;
  delayMs: number;
  timeOutMs: number;
  retries: number;
};

const fetchWithRetry = async (url: string, retryOptions: RetryOptions) => {
  const abortController = new AbortController();
  const id = setTimeout(() => {
    abortController.abort();
  }, retryOptions.timeOutMs);
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
    if (retryOptions.retries) {
      console.warn(`Retrying ..(${3 - retryOptions.retries + 1})`);
      await new Promise((resolve) => setTimeout(resolve, retryOptions.delayMs));
      return fetchWithRetry(url, {
        ...retryOptions,
        delayMs: retryOptions.delayMs * 2,
        retries: retryOptions.retries - 1,
      });
    } else {
      throw new Error(`Failed after retries: ${error}`);
    }
  }
};

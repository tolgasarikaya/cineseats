const catchAsync = <T>(fn: () => Promise<Response>): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fn();
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error instanceof Error ? error.message : "An error occurred");
    }
  });
};

export default catchAsync;

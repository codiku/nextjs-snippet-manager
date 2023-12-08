export const fetcher = async <T>(
  ...args: [RequestInfo, RequestInit]
): Promise<T> => {
  const res = await fetch(...args);
  return res.json();
};

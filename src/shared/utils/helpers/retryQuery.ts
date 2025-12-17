export const retryQuery = (failureCount: number, error: any) => {
  if (error.status === 503 || error.status === 404) {
    return false;
  }
  return failureCount < 1;
};

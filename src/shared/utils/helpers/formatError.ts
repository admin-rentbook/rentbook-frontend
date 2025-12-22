// utils/errorHandler.ts
import axios, { AxiosError } from 'axios';

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string | string[]>;
  error?: string;
  statusCode?: number;
}

export const formatError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    console.log('error', error);
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const status = axiosError.response?.status;
    const data = axiosError.response?.data;

    if (status === 429) {
      const retryAfter = axiosError.response?.headers['retry-after'];
      const waitTime = retryAfter ? `${retryAfter} seconds` : 'a moment';

      return new Error(
        `Too many requests. Please wait ${waitTime} before trying again.`
      );
    }
    if (status === 401) {
      // Optional: Clear auth and redirect
      // window.location.href = '/login';

      return new Error(data?.message || 'Unauthorized. Please login again.');
    }

    if (status === 403) {
      return new Error(
        data?.message || 'You do not have permission to access this resource.'
      );
    }

    if (status === 404) {
      console.log('404', data);
      return new Error(data?.message || 'Resource not found.');
    }

    if (status === 422 && data?.errors) {
      const errorMessages: string[] = [];

      for (const field in data.errors) {
        const fieldErrors = data.errors[field];
        if (Array.isArray(fieldErrors)) {
          errorMessages.push(...fieldErrors);
        } else if (typeof fieldErrors === 'string') {
          errorMessages.push(fieldErrors);
        }
      }

      return new Error(errorMessages.join('\n') || 'Validation failed.');
    }

    if (status && status >= 500) {
      return new Error(
        data?.message || 'Server error. Please try again later.'
      );
    }

    if (data) {
      const message = data.message || data.error || axiosError.message;
      return new Error(message || 'An error occurred');
    }

    if (axiosError.code === 'ECONNABORTED') {
      return new Error('Request timeout. Please check your connection.');
    }

    if (axiosError.code === 'ERR_NETWORK') {
      const errorMessage = axiosError.message.toLowerCase();
      if (errorMessage.includes('404')) {
        return new Error('Resource not found. Please check the URL.');
      }

      if (errorMessage.includes('cors')) {
        return new Error('CORS error. Please contact support.');
      }

      return new Error(
        'Network error. Please check your internet connection or try again later.'
      );
    }

    return new Error(axiosError.message || 'An error occurred');
  }

  if (error instanceof Error) {
    return error;
  }
  return new Error('An unexpected error occurred');
};

import CryptoJS from 'crypto-js';

import { env } from '@/config';

export const createEncryptedUrlParams = (params: Record<string, any>) => {
  const urlSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    const stringifiedValue = Array.isArray(value)
      ? JSON.stringify(value)
      : value.toString();
    const encryptedValue = CryptoJS.AES.encrypt(
      stringifiedValue,
      env.SECRET_KEY
    ).toString();
    urlSearchParams.append(key, encryptedValue);
  }

  return `?${urlSearchParams.toString()}`;
};

export const decryptUrlParams = (search: string): Record<string, any> => {
  const params = new URLSearchParams(search);
  const result: Record<string, any> = {};

  for (const [key, value] of params.entries()) {
    try {
      const bytes = CryptoJS.AES.decrypt(value, env.SECRET_KEY);
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);

      try {
        result[key] = JSON.parse(decryptedValue);
      } catch {
        result[key] = decryptedValue;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      result[key] = null;
    }
  }

  return result;
};

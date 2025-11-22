import CryptoJS from 'crypto-js';

import { env } from '@/config';

import { type KeyType, storage } from './../storage';

export const saveDataToSessStorage = <T>(keyType: KeyType, data: T) => {
  const stringData = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(stringData, env.SECRET_KEY).toString();
  storage.session.setValue(keyType, encryptedData);
};

export const saveDataToLocalStorage = <T>(keyType: KeyType, data: T) => {
  const stringData = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(stringData, env.SECRET_KEY).toString();
  storage.setValue(keyType, encryptedData);
};

export const getDataFromLocalStorage = <T>(keyType: KeyType): T | null => {
  const encryptedData = storage.getValue(keyType);
  if (!encryptedData) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, env.SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData) as T;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};
export const getDataFromSessStorage = <T>(keyType: KeyType): T | null => {
  const encryptedData = storage.session.getValue(keyType);
  if (!encryptedData) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, env.SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData) as T;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

export const clearDataFromSessStorage = (KeyType: KeyType) => {
  storage.session.clearValue(KeyType);
};

export const clearDataFromLocalStorage = (KeyType: KeyType) => {
  storage.session.clearValue(KeyType);
};

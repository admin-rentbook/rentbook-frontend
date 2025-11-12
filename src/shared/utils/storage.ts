// TODO: Implement using OOP (classes)

const storagePrefix = 'rentbook_web_app__';

export type KeyType = 'token' | 'userType' | 'CREATE_PROPERTY' | 'verify-timer';

const DEFAULT_EXPIRY_DURATION = 12 * 30 * 24 * 60 * 60 * 1000; //1 year

export const storage = {
  getValue: (key: KeyType) => {
    const itemStr = window.localStorage.getItem(`${storagePrefix}${key}`);

    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);

    const now = Date.now();
    const timeInSeconds = now;

    if (timeInSeconds > item.expiresIn) {
      storage.clearValue(key);
      return null;
    }

    return item.value;
  },

  setValue: (key: KeyType, value: unknown, duration?: number) => {
    const now = Date.now();
    const timeInSeconds = now;
    const item = {
      value: value,
      expiresIn: timeInSeconds + (duration || DEFAULT_EXPIRY_DURATION),
    };
    window.localStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(item));
  },

  clearValue: (key: KeyType) => {
    window.localStorage.removeItem(`${storagePrefix}${key}`);
  },

  reset: () => {
    window.localStorage.clear();
  },

  session: {
    getValue: (key: KeyType) => {
      return JSON.parse(
        sessionStorage.getItem(`${storagePrefix}${key}`) as string
      );
    },
    setValue: (key: KeyType, value: unknown) => {
      sessionStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(value));
    },
    clearValue: (key: KeyType) => {
      sessionStorage.removeItem(`${storagePrefix}${key}`);
    },
    reset: () => {
      window.sessionStorage.clear();
    },
  },
};

export const convertUnderscoreToSpace = (word = '') =>
  typeof word !== 'string'
    ? ''
    : word
        .replace(/[_-]/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());

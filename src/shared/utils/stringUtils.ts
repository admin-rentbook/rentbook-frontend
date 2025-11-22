export const convertUnderscoreToSpace = (word = '') =>
  typeof word !== 'string'
    ? ''
    : word
        .replace(/[_-]/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());

export const getInitials = (word: string) => {
  const splitWord = word.split(' ');
  const firstInitial = splitWord[0].substring(0, 1);
  const secondInitial = splitWord[1].substring(0, 1);
  return `${firstInitial} ${secondInitial}`;
};

export const randomOrderNumber = () => {
  const prefix: string = 'T',
    randomNumber = Math.floor(Math.random() * 1000);
  return prefix + randomNumber;
};

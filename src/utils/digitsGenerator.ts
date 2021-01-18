import generateRandomNumber from './generateRandomNumber';

export default (numberOfDigits: number) => {
  const arrayOfDigits = [...new Array(numberOfDigits)].map(() => generateRandomNumber(0, 9));

  return arrayOfDigits.join();
};

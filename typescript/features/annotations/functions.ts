// No type inference for arguments
// Functions can infere return value. But they should always be annotaded anyway to avoid code errors.
const add = (a: number, b: number): number => {
  return a + b;
};

function divide(a: number, b: number): number {
  return a / b;
}

const multiply = function (a: number, b: number): number {
  return a * b;
};

const logger = (message: string): void => {
  console.log(message);
};

// 'never' means we will never reach the end of this function
const throwError = (message: string): never => {
  throw new Error(message);
};

const forecast = {
  date: new Date(),
  weather: 'sunny',
};

// De-structurized object annotation
const logWeather = ({
  date,
  weather,
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};

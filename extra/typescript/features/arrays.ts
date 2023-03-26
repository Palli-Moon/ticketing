const carMakers = ['ford', 'toyota', 'chevy'];
const dates = [new Date(), new Date()];

// 2d arrays
const carsByMake: string[][] = [];

// Help with inference when extracting values
const carMaker = carMakers[0];
const otherCarMaker = carMakers.pop();

// Flexible types
const importantDates = [new Date(), '2030-10-10'];
importantDates.push('2030-10-10');

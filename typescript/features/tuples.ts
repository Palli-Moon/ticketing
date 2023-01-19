const drink = {
  color: 'brown',
  carbonated: true,
  suage: 40,
};

type Drink = [string, boolean, number];

const pepsi: [string, boolean, number] = ['brown', true, 40];
const sprite: Drink = ['clear', true, 40];

const carSpecs: [number, number] = [400, 3354]; // Not clear what the numbers mean

const carStats = {
  // Clear what the numbers mean
  horsepower: 400,
  weight: 3354,
};

// Tuples are stupid and we won't use it much. Objects are more useful and clearer.

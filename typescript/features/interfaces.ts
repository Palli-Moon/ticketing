interface Vehicle {
  name: string;
  year: Date;
  broken: boolean;
  summary(): string; // function with no arguements that returns string
}

interface Reportable {
  summary(): string;
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  },
};

const drank = {
  color: 'brown',
  summary(): string {
    return `Color: ${this.color}`;
  },
};

const printItem = (item: Reportable): void => {
  console.log(`Name: ${item.summary()}`);
};

printItem(oldCivic);
printItem(drank);

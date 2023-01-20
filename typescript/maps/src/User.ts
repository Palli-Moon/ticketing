import { faker } from '@faker-js/faker';
import { Mappable } from './CustomMap';

// Typescript convention is to not use default exports to avoid confusion when to use curly braces and when not to
export class User implements Mappable {
  name: string;
  // Note that the object is not initialized here. location.lat would return "cannot read property of undefined" if accessed.
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return `<h1>User Name: ${this.name}</h1>`;
  }
}

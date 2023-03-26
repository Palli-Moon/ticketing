// all classes should have capital first letter
class Vehicle {
  // constructor takes precedence over default value
  // public color: string is equivelant of setting it as a prop
  constructor(public color: string) {}
  protected honk(): void {
    console.log('beep');
  }
}

class Car extends Vehicle {
  constructor(private driveWord: string) {
    super('orange'); // derived constructor must call super
  }

  // overwrite drive() from vehicle
  private drive(): void {
    console.log(this.driveWord);
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}

const car = new Car('vroom');
console.log(car.color);
car.startDrivingProcess();

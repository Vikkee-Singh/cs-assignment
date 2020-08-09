export default class Product {
  private name: string;
  private description: string;
  private price: Number;
  private createdBy: Number;
  private make: Number;
  constructor(
    name: string,
    description: string,
    price: Number,
    createdBy: Number,
    make: Number
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.createdBy = createdBy;
    this.make = make;
  }
  setName(name: string) {
    this.name = name;
  }
  setDescription(description: string) {
    this.description = description;
  }
  setPrice(price: Number) {
    this.price = price;
  }
  setCreatedBy(createdBy: Number) {
    this.createdBy = createdBy;
  }
  setMake(make: Number) {
    this.make = make;
  }
  getName() {
    return this.name;
  }
  getDescription() {
    return this.description;
  }
  getCreatedBy() {
    return this.createdBy;
  }
  getPrice() {
    return this.price;
  }
  getMake() {
    return this.make;
  }
}

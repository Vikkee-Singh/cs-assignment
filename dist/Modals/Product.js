"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(name, description, price, createdBy, make) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.createdBy = createdBy;
        this.make = make;
    }
    setName(name) {
        this.name = name;
    }
    setDescription(description) {
        this.description = description;
    }
    setPrice(price) {
        this.price = price;
    }
    setCreatedBy(createdBy) {
        this.createdBy = createdBy;
    }
    setMake(make) {
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
exports.default = Product;
//# sourceMappingURL=Product.js.map
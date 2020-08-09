"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = exports.addProduct = exports.getProducts = void 0;
const database_1 = __importDefault(require("../../../database"));
exports.getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    let db = yield database_1.default.Get();
    const products = yield db.query(`SELECT * from products`);
    return products;
});
exports.addProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield database_1.default.Get();
        const result = yield db.query(`INSERT INTO products (name, description, price, createdBy, make) VALUES ("${product["name"]}", "${product["description"]}",${product["price"]}, ${product["createdBy"]}, ${product["make"]})`);
        return result;
    }
    catch (error) {
        return null;
    }
});
exports.getCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield database_1.default.Get();
        const carts = yield db.query(`SELECT * FROM products WHERE createdBy = ${userId}`);
        return carts;
    }
    catch (error) {
        return null;
    }
});
//# sourceMappingURL=ProductDataProvider.js.map
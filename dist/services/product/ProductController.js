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
exports.getCartCotroller = exports.addProductCotroller = exports.getProductsController = void 0;
const ProductDataProvider_1 = require("./providers/ProductDataProvider");
const Product_1 = __importDefault(require("../../Modals/Product"));
exports.getProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductDataProvider_1.getProducts();
        res.status(200).send(products);
    }
    catch (error) {
        res
            .status(400)
            .send({ done: false, statusCode: 400, error: JSON.parse(error) });
    }
});
exports.addProductCotroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, make, user } = req.body;
        const product = new Product_1.default(name, description, price, user.id, make);
        const result = yield ProductDataProvider_1.addProduct(product);
        if (!result) {
            throw "Duplicate Product name not allowed.";
        }
        res.status(200).send({
            done: true,
            statusCode: 200,
            message: "Product added successfully",
        });
    }
    catch (error) {
        res.status(400).send({ done: false, statusCode: 400, error });
    }
});
exports.getCartCotroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    try {
        const cart = yield ProductDataProvider_1.getCart(user.id);
        res.status(200).send({
            done: true,
            statusCode: 200,
            cart,
        });
    }
    catch (error) {
        res.status(400).send({ done: false, statusCode: 400, error });
    }
});
//# sourceMappingURL=ProductController.js.map
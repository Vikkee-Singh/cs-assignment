"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductController_1 = require("./ProductController");
const common_1 = require("../../middleware/common");
exports.default = [
    {
        path: "/api/v1/products/list",
        method: "get",
        handler: [ProductController_1.getProductsController],
    },
    {
        path: "/api/v1/products/add",
        method: "post",
        handler: [common_1.verifyToken, ProductController_1.addProductCotroller],
    },
    {
        path: "/api/v1/products/cart",
        method: "get",
        handler: [common_1.verifyToken, ProductController_1.getCartCotroller],
    },
];
//# sourceMappingURL=routes.js.map
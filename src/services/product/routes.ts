import {
  getProductsController,
  addProductCotroller,
  getCartCotroller,
} from "./ProductController";
import { verifyToken } from "../../middleware/common";

export default [
  {
    path: "/api/v1/products/list",
    method: "get",
    handler: [getProductsController],
  },
  {
    path: "/api/v1/products/add",
    method: "post",
    handler: [verifyToken, addProductCotroller],
  },
  {
    path: "/api/v1/products/cart",
    method: "get",
    handler: [verifyToken, getCartCotroller],
  },
];

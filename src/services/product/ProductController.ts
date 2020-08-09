import {
  getProducts,
  addProduct,
  getCart,
} from "./providers/ProductDataProvider";
import Product from "../../Modals/Product";
import { Request, Response } from "express";

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.status(200).send(products);
  } catch (error) {
    res
      .status(400)
      .send({ done: false, statusCode: 400, error: JSON.parse(error) });
  }
};

export const addProductCotroller = async (req: Request, res: Response) => {
  try {
    const { name, description, price, make, user } = req.body;

    const product: Product = new Product(
      name,
      description,
      price,
      user.id,
      make
    );

    const result = await addProduct(product);
    if (!result) {
      throw "Duplicate Product name not allowed.";
    }

    res.status(200).send({
      done: true,
      statusCode: 200,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(400).send({ done: false, statusCode: 400, error });
  }
};

export const getCartCotroller = async (req: Request, res: Response) => {
  const { user } = req.body;
  try {
    const cart = await getCart(user.id);
    res.status(200).send({
      done: true,
      statusCode: 200,
      cart,
    });
  } catch (error) {
    res.status(400).send({ done: false, statusCode: 400, error });
  }
};

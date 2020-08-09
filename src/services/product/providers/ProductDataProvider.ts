import DbConnection from "../../../database";
import Product from "../../../Modals/Product";
export const getProducts = async () => {
  let db = await DbConnection.Get();

  const products = await db.query(`SELECT * from products`);

  return products;
};

export const addProduct = async (product: Product) => {
  try {
    let db = await DbConnection.Get();
    const result = await db.query(
      `INSERT INTO products (name, description, price, createdBy, make) VALUES ("${product["name"]}", "${product["description"]}",${product["price"]}, ${product["createdBy"]}, ${product["make"]})`
    );
    return result;
  } catch (error) {
    return null;
  }
};

export const getCart = async (userId: number) => {
  try {
    let db = await DbConnection.Get();
    const carts = await db.query(
      `SELECT * FROM products WHERE createdBy = ${userId}`
    );
    return carts;
  } catch (error) {
    return null;
  }
};

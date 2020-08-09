import mariadb from "mariadb";
import config from "../config";

let DbConnection = function () {
  let db: any = null;
  async function DbConnect() {
    try {
      let _dbConection = mariadb.createPool({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "vikkee@9090",
        database: process.env.DB_DATABASE || "Crownstack",
        connectionLimit: 5,
      });

      return _dbConection.getConnection();
    } catch (error) {
      return error;
    }
  }

  async function Get() {
    try {
      if (db != null) {
        return db;
      } else {
        db = await DbConnect();
        return db;
      }
    } catch (e) {
      return e;
    }
  }

  return { Get };
};

export default DbConnection();

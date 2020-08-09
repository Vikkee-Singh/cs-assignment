import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import DbConnection from "../../database";
import User from "../../Modals/User";
import config from "../../config";
import { comparePassword } from "../../middleware/checks";

export const login = async (req: Request, res: Response) => {
  debugger;
  try {
    let db = await DbConnection.Get();
    let user = await db.query(
      `SELECT * from users WHERE email="${req.body.email}"`
    );

    if (user.length === 0) throw "User does not Exist";

    if (!comparePassword(req.body.password, user[0].password)) {
      throw "Provide currect Creadentials";
    }
    const token = bcrypt.hashSync(Math.random().toString(36).slice(-8), 10);

    const isTokenExists = await db.query(
      `SELECT * from tokens WHERE email="${req.body.email}"`
    );
    if (isTokenExists.length === 0) {
      await db.query(
        `INSERT INTO tokens (userId, name, email, token) VALUES (${user[0].id},"${user[0].name}","${user[0].email}","${token}")`
      );
    } else {
      await db.query(
        `UPDATE tokens SET token="${token}" WHERE userId=${user[0].id}`
      );
    }

    res.status(200).send({ done: true, statusCode: 200, token });
  } catch (error) {
    res.status(400).send({ done: false, statusCode: 400, error });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const user: User = new User(
      req.body.name,
      req.body.email,
      req.body.password
    );
    const validationError = user.validateUser();
    if (validationError.length) {
      throw JSON.stringify(validationError);
    }
    let db = await DbConnection.Get();
    const isUserExist = await db.query(
      `SELECT * from users WHERE email="${req.body.email}"`
    );

    if (isUserExist.length !== 0) {
      throw JSON.stringify("User Allready Exist");
    }
    const encrptPassword = bcrypt.hashSync(req.body.password, 10);

    await db.query(
      `INSERT INTO users (name, email, password) VALUES ("${req.body.name}", "${req.body.email}","${encrptPassword}")`
    );

    res.status(200).send({
      done: true,
      statusCode: 200,
      message: "User registration done",
    });
  } catch (error) {
    res
      .status(400)
      .send({ done: false, statusCode: 400, error: JSON.parse(error) });
  }
};

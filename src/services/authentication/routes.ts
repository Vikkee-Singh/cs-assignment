import { Request, Response } from "express";
import { login, signup } from "./authController";

export default [
  {
    path: "/api/v1/login",
    method: "post",
    handler: [login],
  },
  {
    path: "/api/v1/signup",
    method: "post",
    handler: [signup],
  },
];

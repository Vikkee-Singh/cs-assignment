"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const database_1 = __importDefault(require("../../database"));
const User_1 = __importDefault(require("../../Modals/User"));
const checks_1 = require("../../middleware/checks");
exports.login = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    debugger;
    try {
      let db = yield database_1.default.Get();
      let user = yield db.query(
        `SELECT * from users WHERE email="${req.body.email}"`
      );
      if (user.length === 0) throw "User does not Exist";
      if (!checks_1.comparePassword(req.body.password, user[0].password)) {
        throw "Provide currect Creadentials";
      }
      const token = bcrypt.hashSync(Math.random().toString(36).slice(-8), 10);
      const isTokenExists = yield db.query(
        `SELECT * from tokens WHERE email="${req.body.email}"`
      );
      if (isTokenExists.length === 0) {
        yield db.query(
          `INSERT INTO tokens (userId, name, email, token) VALUES (${user[0].id},"${user[0].name}","${user[0].email}","${token}")`
        );
      } else {
        yield db.query(
          `UPDATE tokens SET token="${token}" WHERE userId=${user[0].id}`
        );
      }
      res.status(200).send({ done: true, statusCode: 200, token });
    } catch (error) {
      res.status(400).send({ done: false, statusCode: 400, error });
    }
  });
exports.signup = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const user = new User_1.default(
        req.body.name,
        req.body.email,
        req.body.password
      );
      const validationError = user.validateUser();
      if (validationError.length) {
        throw JSON.stringify(validationError);
      }
      let db = yield database_1.default.Get();
      const isUserExist = yield db.query(
        `SELECT * from users WHERE email="${req.body.email}"`
      );
      if (isUserExist.length !== 0) {
        throw JSON.stringify("User Allready Exist");
      }
      const encrptPassword = bcrypt.hashSync(req.body.password, 10);
      yield db.query(
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
  });
//# sourceMappingURL=authController.js.map

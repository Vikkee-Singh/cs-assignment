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
const mariadb_1 = __importDefault(require("mariadb"));
let DbConnection = function () {
    let db = null;
    function DbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _dbConection = mariadb_1.default.createPool({
                    host: process.env.DB_HOST || "localhost",
                    user: process.env.DB_USER || "root",
                    password: process.env.DB_PASS || "vikkee@9090",
                    database: process.env.DB_DATABASE || "Crownstack",
                    connectionLimit: 5,
                });
                return _dbConection.getConnection();
            }
            catch (error) {
                return error;
            }
        });
    }
    function Get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (db != null) {
                    return db;
                }
                else {
                    db = yield DbConnect();
                    return db;
                }
            }
            catch (e) {
                return e;
            }
        });
    }
    return { Get };
};
exports.default = DbConnection();
//# sourceMappingURL=index.js.map
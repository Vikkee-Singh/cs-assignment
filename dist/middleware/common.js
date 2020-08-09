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
exports.verifyToken = exports.handleCompression = exports.handleBodyRequestParsing = exports.handleCors = void 0;
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const database_1 = __importDefault(require("../database"));
exports.handleCors = (router) => router.use(cors_1.default({ credentials: true, origin: true }));
exports.handleBodyRequestParsing = (router) => {
    router.use(body_parser_1.default.urlencoded({ extended: true }));
    router.use(body_parser_1.default.json());
};
exports.handleCompression = (router) => {
    router.use(compression_1.default());
};
exports.verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = `${req.headers["x-access-token"]}`;
        if (!token)
            throw "Not a authenticated user";
        let db = yield database_1.default.Get();
        let isExistToken = yield db.query(`SELECT * from tokens WHERE token="${token}"`);
        if (isExistToken.length === 0)
            throw "Session expired, login again!";
        req.body.user = {
            id: isExistToken[0].userId,
            name: isExistToken[0].name,
            email: isExistToken[0].email,
        };
        next();
    }
    catch (error) {
        res.status(400).send({ done: false, statusCode: 400, error });
    }
});
//# sourceMappingURL=common.js.map
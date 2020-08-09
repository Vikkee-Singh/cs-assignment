"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = void 0;
const bcryptjs_1 = require("bcryptjs");
exports.comparePassword = (password, userPassword) => bcryptjs_1.compareSync(password, userPassword);
//# sourceMappingURL=checks.js.map
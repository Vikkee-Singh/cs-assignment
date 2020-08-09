"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("./authController");
exports.default = [
    {
        path: "/api/v1/login",
        method: "post",
        handler: [authController_1.login],
    },
    {
        path: "/api/v1/signup",
        method: "post",
        handler: [authController_1.signup],
    },
];
//# sourceMappingURL=routes.js.map
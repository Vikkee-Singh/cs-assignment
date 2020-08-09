"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
    }
    setName(name) {
        this.name = name;
    }
    setEmail(email) {
        this.email = email;
    }
    setPassword(password) {
        this.password = password;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    validateUser() {
        let error = [];
        if (!/^[a-zA-Z ]*$/.test(this.name.trim()) || this.name.length < 3) {
            error.push({
                name: "Name Should Be at least 3 characters of capital and lower letter",
            });
        }
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email.trim())) {
            error.push({ email: "Provide a valid email address" });
        }
        if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(this.password.trim())) {
            error.push({
                password: "Password should contain a capital letter a lower letter and a space character",
            });
        }
        return error;
    }
}
exports.default = User;
//# sourceMappingURL=User copy.js.map
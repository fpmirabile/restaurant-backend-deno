"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBuilder = void 0;
const Models_1 = require("../Models");
class UserBuilder {
    constructor() {
        this.build = () => {
            const user = new Models_1.User();
            user.userId = this.userId;
            user.email = this.email;
            user.password = this.password;
            user.name = this.name;
            user.status = this.status;
            user.identifier = this.identifier;
            user.photo = this.photo;
            user.role = this.role;
            return user;
        };
        this.withNewUser = (newUser) => {
            this.email = newUser.email;
            this.password = newUser.password;
            this.name = newUser.name;
            return this;
        };
        this.withRole = (role) => {
            this.role = role;
            return this;
        };
        this.withStatus = (status) => {
            this.status = status;
            return this;
        };
        this.withEmail = (email) => {
            this.email = email;
            return this;
        };
        this.withIdentifier = (identifier) => {
            this.identifier = identifier;
            return this;
        };
        this.withPassword = (password) => {
            this.password = password;
            return this;
        };
    }
}
exports.UserBuilder = UserBuilder;
//# sourceMappingURL=user.builder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(username, password, email, name) {
        this._id = 0;
        this._role = 0;
        this._username = username;
        this._password = password;
        this._email = email;
        this._name = name;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get role() {
        return this._role;
    }
    set role(value) {
        this._role = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
}
exports.User = User;

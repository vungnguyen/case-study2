"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagement = void 0;
const user_1 = require("../model/user");
const e_role_1 = require("../model/e-role");
class UserManagement {
    constructor() {
        let admin = new user_1.User('admin', '123456', 'admin@gmail.com', 'ADMIN');
        admin.id = UserManagement.id;
        admin.role = e_role_1.Role.ADMIN;
        UserManagement.users.push(admin);
    }
    creatNew(t) {
        UserManagement.id++;
        t.id = UserManagement.id;
        t.role = e_role_1.Role.USER;
        UserManagement.users.push(t);
    }
    getAll() {
        return UserManagement.users;
    }
    removeById(id) {
        let index = this.findById(id);
        UserManagement.users.splice(index, 1);
    }
    updateById(id, t) {
        let index = this.findById(id);
        if (index != -1) {
            UserManagement.users[index] = t;
        }
    }
    findByUsername(username) {
        for (let user of UserManagement.users) {
            if (username == user.username) {
                return user;
            }
        }
        return null;
    }
    findById(id) {
        let index = -1;
        for (let i = 0; i < UserManagement.users.length; i++) {
            if (UserManagement.users[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    }
    findByEmail(email) {
        for (let user of UserManagement.users) {
            if (email == user.email) {
                return user;
            }
        }
        return null;
    }
    login(username, password) {
        for (let user of UserManagement.users) {
            if (username == user.username && password == user.password) { }
            return user;
        }
        return null;
    }
}
exports.UserManagement = UserManagement;
UserManagement.users = [];
UserManagement.id = 2;

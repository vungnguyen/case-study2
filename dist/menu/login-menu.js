"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginMenu = void 0;
const user_management_1 = require("../management/user-management");
const user_1 = require("../model/user");
const rl = __importStar(require("readline-sync"));
var LoginChoice;
(function (LoginChoice) {
    LoginChoice[LoginChoice["ADMIN"] = 1] = "ADMIN";
    LoginChoice[LoginChoice["REGISTER"] = 2] = "REGISTER";
})(LoginChoice || (LoginChoice = {}));
class LoginMenu {
    constructor() {
        this.userManagement = new user_management_1.UserManagement();
    }
    inputUser() {
        let username = this.inputUsername();
        let regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g;
        let password = this.inputPassword(regexForPassword);
        this.inputConfirmPassword(password);
        let email = this.inputEmail();
        let name = rl.question('nhập họ tên: ');
        return new user_1.User(username, password, email, name);
    }
    inputUsername() {
        let username = '';
        let isValidUsername = true;
        do {
            username = rl.question('nhập username: ');
            let currentUser = this.userManagement.findByUsername(username);
            if (currentUser) {
                isValidUsername = false;
                console.log('Tên tài khoản đã tồn tại');
            }
            else {
                isValidUsername = true;
            }
        } while (!isValidUsername);
        return username;
    }
    inputPassword(regexForPassword) {
        let password = '';
        let isValidPassword = true;
        do {
            password = rl.question('Nhập mật khẩu (Có 1 ký tự viết hoa, 1 viết thường, 1 ký tự đặc biệt và 1 số):');
            if (!regexForPassword.test(password)) {
                isValidPassword = false;
                console.log('Password nhập vào phải có ít nhất 1 ký tự thường 1 hoa 1 đặc biệt 1 số!');
            }
            else {
                isValidPassword = true;
            }
        } while (!isValidPassword);
        return password;
    }
    inputConfirmPassword(password) {
        let confirmPassword = '';
        do {
            confirmPassword = rl.question('nhập lại mât khẩu: ');
            if (confirmPassword != password) {
                console.log('mật khẩu nhập vào không khớp');
            }
        } while (confirmPassword != password);
    }
    inputEmail() {
        let email = '';
        let isValidEmail = true;
        do {
            email = rl.question('nhập email (abc@gmail.com): ');
            let regexForEmail = /^[\w.+\-]+@gmail\.com$/g;
            if (!regexForEmail.test(email)) {
                isValidEmail = false;
                console.log('định dạng email không hợp lệ');
            }
            else {
                isValidEmail = true;
                let currenEmail = this.userManagement.findByEmail(email);
                if (currenEmail) {
                    isValidEmail = false;
                    console.log('email đã tồn tại');
                }
                else {
                    isValidEmail = true;
                }
            }
        } while (!isValidEmail);
        return email;
    }
    run() {
        let choice = -1;
        do {
            console.log('---Hệ thống quản lý sản phẩm---');
            console.log('1. Đăng nhập');
            console.log('2. Đăng ký');
            console.log('0. Thoát ');
            choice = +rl.question('nhập lựa chọn của bạn : ');
            switch (choice) {
                case LoginChoice.ADMIN: {
                    console.log(' ---Đăng nhập---');
                    let username = rl.question('nhập tài khoản: ');
                    let password = rl.question('nhập mật khẩu: ');
                    let currentUser = this.userManagement.login(username, password);
                    if (currentUser) {
                        // check role là admin thì mở admin,user thì mở user
                    }
                    else {
                        console.log('tài khoản hoặc mật khẩu không đúng ');
                    }
                    break;
                }
                case LoginChoice.REGISTER: {
                    console.log('---Đăng ký tài khoản---');
                    let user = this.inputUser();
                    this.userManagement.creatNew(user);
                    console.log(' Đăng ký thành công!');
                    break;
                }
            }
        } while (choice != 0);
    }
}
exports.LoginMenu = LoginMenu;

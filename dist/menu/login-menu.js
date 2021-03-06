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
const user_management_1 = require("../management/user/user-management");
const user_1 = require("../model/user");
const rl = __importStar(require("readline-sync"));
const e_role_1 = require("../model/e-role");
const admin_menu_1 = require("./admin-menu");
const user_menu_1 = require("./user-menu");
var LoginChoice;
(function (LoginChoice) {
    LoginChoice[LoginChoice["ADMIN"] = 1] = "ADMIN";
    LoginChoice[LoginChoice["REGISTER"] = 2] = "REGISTER";
})(LoginChoice || (LoginChoice = {}));
class LoginMenu {
    constructor() {
        this.userManagement = new user_management_1.UserManagement();
        this.adminMenu = new admin_menu_1.AdminMenu();
        this.userMenu = new user_menu_1.UserMenu();
    }
    inputUser() {
        let username = this.inputUsername();
        let regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g;
        let password = this.inputPassword(regexForPassword);
        this.inputConfirmPassword(password);
        let email = this.inputEmail();
        let name = rl.question('nh???p h??? t??n: ');
        return new user_1.User(username, password, email, name);
    }
    inputUsername() {
        let username = '';
        let isValidUsername = true;
        do {
            username = rl.question('nh???p username: ');
            let currentUser = this.userManagement.findByUsername(username);
            if (currentUser) {
                isValidUsername = false;
                console.log('T??n t??i kho???n ???? t???n t???i');
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
            password = rl.question('Nh???p m???t kh???u (C?? 1 k?? t??? vi???t hoa, 1 vi???t th?????ng, 1 k?? t??? ?????c bi???t v?? 1 s???):');
            if (!regexForPassword.test(password)) {
                isValidPassword = false;
                console.log('Password nh???p v??o ph???i c?? ??t nh???t 1 k?? t??? th?????ng 1 hoa 1 ?????c bi???t 1 s???!');
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
            confirmPassword = rl.question('nh???p l???i m??t kh???u: ');
            if (confirmPassword != password) {
                console.log('m???t kh???u nh???p v??o kh??ng kh???p');
            }
        } while (confirmPassword != password);
    }
    inputEmail() {
        let email = '';
        let isValidEmail = true;
        do {
            email = rl.question('nh???p email (abc@gmail.com): ');
            let regexForEmail = /^[\w.+\-]+@gmail\.com$/g;
            if (!regexForEmail.test(email)) {
                isValidEmail = false;
                console.log('?????nh d???ng email kh??ng h???p l???');
            }
            else {
                isValidEmail = true;
                let currenEmail = this.userManagement.findByEmail(email);
                if (currenEmail) {
                    isValidEmail = false;
                    console.log('email ???? t???n t???i');
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
            console.log('---H??? th???ng qu???n l?? s???n ph???m---');
            console.log('1. ????ng nh???p');
            console.log('2. ????ng k??');
            console.log('0. Tho??t ');
            choice = +rl.question('nh???p l???a ch???n c???a b???n : ');
            switch (choice) {
                case LoginChoice.ADMIN: {
                    console.log(' ---????ng nh???p---');
                    this.loginForm();
                    break;
                }
                case LoginChoice.REGISTER: {
                    console.log('---????ng k?? t??i kho???n---');
                    this.registerForm();
                    break;
                }
            }
        } while (choice != 0);
    }
    registerForm() {
        let user = this.inputUser();
        this.userManagement.creatNew(user);
        console.log(' ????ng k?? th??nh c??ng!');
    }
    loginForm() {
        let username = rl.question('nh???p t??i kho???n: ');
        let password = rl.question('nh???p m???t kh???u: ');
        let currentUser = this.userManagement.login(username, password);
        if (currentUser) {
            console.log('????ng nh???p th??nh c??ng!');
            // check role l?? admin th?? m??? admin,user th?? m??? user
            if (currentUser.role == e_role_1.Role.ADMIN) {
                // m??? menu admin
                this.adminMenu.run();
            }
            else {
                // m??? menu user
                this.userMenu.run();
            }
        }
        else {
            console.log('t??i kho???n ho???c m???t kh???u kh??ng ????ng ');
        }
    }
}
exports.LoginMenu = LoginMenu;

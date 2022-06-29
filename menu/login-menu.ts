import {UserManagement} from "../management/user/user-management";
import {User} from "../model/user";
import * as rl from "readline-sync";
import {Role} from "../model/e-role";
import {AdminMenu} from "./admin-menu";
import {UserMenu} from "./user-menu";
enum LoginChoice {
    ADMIN = 1,
    REGISTER = 2
}
export class LoginMenu {
     private userManagement = new UserManagement();
     private adminMenu = new AdminMenu();
     private userMenu = new UserMenu();
     inputUser(): User {
        let username = this.inputUsername()  ;
        let regexForPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g;
        let password = this.inputPassword(regexForPassword) ;
        this.inputConfirmPassword(password);
        let email = this.inputEmail();
        let name = rl.question('nhập họ tên: ');
        return new User(username, password, email, name);
    }
     inputUsername(): string {
        let username = '';
        let isValidUsername = true;
        do {
            username =  rl.question('nhập username: ');
            let currentUser = this.userManagement.findByUsername(username);
            if(currentUser){
                isValidUsername= false;
                console.log('Tên tài khoản đã tồn tại');
            }else {
                isValidUsername = true;
            }
        }while (!isValidUsername)
        return username;
    }
     inputPassword(regexForPassword: RegExp): string {
        let password: string = '';
        let isValidPassword = true;
        do {
            password = rl.question('Nhập mật khẩu (Có 1 ký tự viết hoa, 1 viết thường, 1 ký tự đặc biệt và 1 số):');
            if (!regexForPassword.test(password)) {
                isValidPassword = false;
                console.log('Password nhập vào phải có ít nhất 1 ký tự thường 1 hoa 1 đặc biệt 1 số!')
            } else {
                isValidPassword = true;
            }
        } while (!isValidPassword);
        return password;
    }
     inputConfirmPassword(password: string): void {
        let confirmPassword = '';
        do {
            confirmPassword = rl.question('nhập lại mât khẩu: ');
            if (confirmPassword != password) {
                console.log('mật khẩu nhập vào không khớp')
            }
        } while (confirmPassword != password)
    } inputEmail() {
        let email = '';
        let isValidEmail = true;
        do {
            email = rl.question('nhập email (abc@gmail.com): ');
            let regexForEmail: RegExp = /^[\w.+\-]+@gmail\.com$/g;
            if (!regexForEmail.test(email)) {
                isValidEmail = false;
                console.log('định dạng email không hợp lệ')
            } else {
                isValidEmail = true;
                let currenEmail = this.userManagement.findByEmail(email);
                if (currenEmail) {
                    isValidEmail = false;
                    console.log('email đã tồn tại');
                } else {
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
                    this.loginForm();
                    break;
                }
                case LoginChoice.REGISTER: {
                    console.log('---Đăng ký tài khoản---');
                    this.registerForm();
                    break;
                }
            }
        }while (choice != 0);

    }
     registerForm() {
        let user = this.inputUser();
        this.userManagement.creatNew(user);
        console.log(' Đăng ký thành công!')
    }

    loginForm() {
        let username = rl.question('nhập tài khoản: ');
        let password = rl.question('nhập mật khẩu: ');
        let currentUser = this.userManagement.login(username, password);
        if (currentUser) {
            console.log('Đăng nhập thành công!');
            // check role là admin thì mở admin,user thì mở user
            if (currentUser.role == Role.ADMIN) {
                // mở menu admin
             this.adminMenu.run();
            } else {
                // mở menu user
                this.userMenu.run();
            }

        } else {
            console.log('tài khoản hoặc mật khẩu không đúng ')
        }
    }
}
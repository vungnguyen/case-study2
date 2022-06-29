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
exports.AdminMenu = void 0;
const rl = __importStar(require("readline-sync"));
const product_menu_1 = require("./product-menu");
const category_menu_1 = require("./category-menu");
var AdminChoice;
(function (AdminChoice) {
    AdminChoice[AdminChoice["PRODUCT_MANAGEMENT"] = 1] = "PRODUCT_MANAGEMENT";
    AdminChoice[AdminChoice["CATEGORY_MANAGEMENT"] = 2] = "CATEGORY_MANAGEMENT";
})(AdminChoice || (AdminChoice = {}));
class AdminMenu {
    constructor() {
        this.productMenu = new product_menu_1.ProductMenu();
        this.categoryMenu = new category_menu_1.CategoryMenu();
    }
    run() {
        let choice = -1;
        do {
            console.log('---Ứng dụng quản lý cửa hàng---');
            console.log('1. Quản lý sản phẩm');
            console.log('2. Quản lý danh mục sản phẩm');
            console.log('0. Đăng xuất');
            choice = +rl.question('nhập lựa chọn : ');
            switch (choice) {
                case AdminChoice.PRODUCT_MANAGEMENT: {
                    console.log('---Quản lý sản phẩm---');
                    this.productMenu.run();
                    break;
                }
                case AdminChoice.CATEGORY_MANAGEMENT: {
                    console.log('---Quản lý danh mục sản phẩm---');
                    this.categoryMenu.run();
                    break;
                }
            }
        } while (choice != 0);
    }
}
exports.AdminMenu = AdminMenu;

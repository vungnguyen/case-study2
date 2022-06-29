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
exports.UserMenu = void 0;
const rl = __importStar(require("readline-sync"));
const producr_management_1 = require("../management/product/producr-management");
var ChoiceUser;
(function (ChoiceUser) {
    ChoiceUser[ChoiceUser["SHOW_ALL_PRODUCT"] = 1] = "SHOW_ALL_PRODUCT";
    ChoiceUser[ChoiceUser["SEARCH_BY_NAME"] = 2] = "SEARCH_BY_NAME";
    ChoiceUser[ChoiceUser["SEARCH_BY_PRICE"] = 3] = "SEARCH_BY_PRICE";
    ChoiceUser[ChoiceUser["ORDER_PRODUCT"] = 4] = "ORDER_PRODUCT";
})(ChoiceUser || (ChoiceUser = {}));
class UserMenu {
    constructor() {
        this.productManagement = new producr_management_1.ProductManagement();
    }
    run() {
        let choice = -1;
        do {
            console.log('---Menu User--');
            console.log('1. Hiển thị tất cả sản phẩm');
            console.log('2. Tìm kiếm sản phẩm theo tên');
            console.log('3. Tím kiếm sản phẩm theo giá ');
            console.log('4. Đặt mua sản phẩm');
            console.log('0. Đăng xuất');
            choice = +rl.question('nhập lựa chọn : ');
            switch (choice) {
                case ChoiceUser.SHOW_ALL_PRODUCT: {
                    this.showAllProduct();
                    break;
                }
                case ChoiceUser.SEARCH_BY_NAME: {
                    this.searchByName();
                    break;
                }
                case ChoiceUser.SEARCH_BY_PRICE: {
                    let products = this.productManagement.getAll();
                    let arrSort = [];
                    if (products.length !== 0) {
                        for (let product of products) {
                            arrSort.push(product);
                        }
                    }
                    if (arrSort.length !== 0) {
                        let needNextPass = true;
                        for (let i = 1; i < arrSort.length && needNextPass; i++) {
                            needNextPass = false;
                            for (let j = arrSort.length - 1; j >= 0; j--) {
                                if (arrSort[j].price !== undefined && arrSort[j + 1] !== undefined)
                                    if (arrSort[j].price > arrSort[j + 1].price) {
                                        let temp = arrSort[j];
                                        arrSort[j] = arrSort[j + 1];
                                        arrSort[j + 1] = temp;
                                        needNextPass = true;
                                    }
                            }
                            if (!needNextPass) {
                                break;
                            }
                        }
                        console.log('Sắp xếp theo giá tăng dần');
                        for (let product of arrSort) {
                            console.log(`Id: ${product.id} | Tên: ${product.name} | Mô tả:${product.description} | Giá: ${product.price}`);
                        }
                    }
                }
            }
        } while (choice != 0);
    }
    searchByName() {
        let products = this.productManagement.getAll();
        let arrSearch = [];
        let flag = true;
        let nameProduct = rl.question('Nhập tên sản phẩm: ');
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.includes(nameProduct)) {
                arrSearch.push(products[i]);
                flag = true;
            }
        }
        if (arrSearch.length == 0) {
            flag = false;
        }
        if (flag) {
            for (let product of arrSearch) {
                console.log(`Tên: ${product.name} | Mô tả: ${product.description} | Gia: ${product.price}`);
            }
        }
        else {
            console.log('Sản phẩm không tồn tại');
        }
    }
    showAllProduct() {
        let products = this.productManagement.getAll();
        if (products.length !== 0) {
            for (let product of products) {
                console.log(`Id: ${product.id} | Tên: ${product.name} | Mô tả: ${product.description} | Giá: ${product.price}`);
            }
        }
        else {
            console.log('Chưa có sản phẩm nào!');
        }
    }
}
exports.UserMenu = UserMenu;

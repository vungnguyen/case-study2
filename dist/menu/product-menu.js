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
exports.ProductMenu = void 0;
const producr_management_1 = require("../management/product/producr-management");
const rl = __importStar(require("readline-sync"));
const product_1 = require("../model/product");
const category_management_1 = require("../category/category-management");
var ProductChoice;
(function (ProductChoice) {
    ProductChoice[ProductChoice["SHOW_ALL_PRODUCT"] = 1] = "SHOW_ALL_PRODUCT";
    ProductChoice[ProductChoice["ADD_PRODUCT"] = 2] = "ADD_PRODUCT";
    ProductChoice[ProductChoice["UPDATE_PRODUCT"] = 3] = "UPDATE_PRODUCT";
    ProductChoice[ProductChoice["REMOVE_PRODUCT"] = 4] = "REMOVE_PRODUCT";
    ProductChoice[ProductChoice["SEARCH_BY_NAME"] = 5] = "SEARCH_BY_NAME";
    ProductChoice[ProductChoice["SORT_PRODUCT"] = 6] = "SORT_PRODUCT";
    ProductChoice[ProductChoice["ADD_PRODUCT_TO_CATEGORY"] = 7] = "ADD_PRODUCT_TO_CATEGORY";
})(ProductChoice || (ProductChoice = {}));
class ProductMenu {
    constructor() {
        this.productManagement = new producr_management_1.ProductManagement();
        this.categoryManagement = new category_management_1.CategoryManagement();
    }
    run() {
        let choice = -1;
        do {
            console.log('---Qu???n l?? s???n ph???m---');
            console.log('1. Hi???n th??? danh s??ch s???n ph???m');
            console.log('2. Th??m s???n ph???m m???i');
            console.log('3. C???p nh???t s???n ph???m');
            console.log('4. X??a s???n ph???m');
            console.log('5. T??m ki???m s???n ph???m theo t??n');
            console.log('6. S???p x???p s???n ph???m theo gi?? gi???m d???n');
            console.log('7. Th??m s???n ph???m v??o danh m???c');
            console.log('0. Quay l???i');
            choice = +rl.question('nh???p l???a ch???n: ');
            switch (choice) {
                case ProductChoice.SHOW_ALL_PRODUCT: {
                    this.showAllProducts();
                    break;
                }
                case ProductChoice.ADD_PRODUCT: {
                    this.creatProduct();
                    break;
                }
                case ProductChoice.UPDATE_PRODUCT: {
                    this.updateProduct();
                    break;
                }
                case ProductChoice.REMOVE_PRODUCT: {
                    this.removeProduct();
                    break;
                }
                case ProductChoice.SEARCH_BY_NAME: {
                    this.searchByName();
                    break;
                }
                case ProductChoice.SORT_PRODUCT: {
                    this.sortDown();
                    break;
                }
                case ProductChoice.ADD_PRODUCT_TO_CATEGORY: {
                    console.log('--Th??m s???n ph???m v??o danh m???c--');
                    let categories = this.categoryManagement.getAll();
                    let products = this.productManagement.getAll();
                    if (categories.length == 0) {
                        console.log('Hi???n t???i ch??a c?? danh m???c s???n ph???m!');
                        break;
                    }
                    for (let i = 0; i < categories.length; i++) {
                        console.log(`${i + 1} | ${categories[i].name}`);
                    }
                    let id = +rl.question('Nh???p m?? s???n ph???m c???n th??m v??o danh m???c:   ');
                    let productIndex = this.productManagement.findById(id);
                    if (productIndex == -1) {
                        console.log('M?? s???n ph???m kh??ng t???n t???i !');
                        break;
                    }
                    else {
                        let categoryName = rl.question('Nh???p t??n danh m???c s???n ph???m c???n th??m:  ');
                        let category = this.categoryManagement.findByName(categoryName);
                        if (category) {
                            products[productIndex].category = category;
                            category.products.push(products[productIndex]);
                        }
                        else {
                            console.log('T??n danh m???c kh??ng t???n t???i');
                        }
                    }
                    break;
                }
            }
        } while (choice != 0);
    }
    sortDown() {
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
                        if (arrSort[j].price < arrSort[j + 1].price) {
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
            console.log('S???p x???p theo gi?? gi???m d???n');
            for (let product of arrSort) {
                console.log(`Id: ${product.id} | Ten: ${product.name} | Mo ta:${product.description} | Gia: ${product.price}`);
            }
        }
    }
    searchByName() {
        var _a;
        let products = this.productManagement.getAll();
        let arrLinearSearch = [];
        let nameProduct = rl.question('nh???p t??n s???n ph???m: ');
        let flag = true;
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.includes(nameProduct)) {
                arrLinearSearch.push(products[i]);
            }
            else {
                flag = false;
            }
        }
        if (arrLinearSearch.length != 0) {
            flag = true;
        }
        if (flag) {
            for (let product of arrLinearSearch) {
                console.log(`Id: ${product.id} | Ten: ${product.name} | Mo ta: ${product.description} | Gia: ${product.price} | ${(_a = product.category) === null || _a === void 0 ? void 0 : _a.name}`);
                flag = true;
            }
        }
        else {
            console.log('S???n ph???m kh??ng t???n t???i');
        }
    }
    removeProduct() {
        console.log('--X??a s???n ph???m--');
        let products = this.productManagement.getAll();
        for (let product of products) {
            console.log(`Id: ${product.id} | T??n: ${product.name}`);
        }
        let idRemove = +rl.question('Nh???p m?? s???n ph???m mu???n x??a: ');
        let lengthProduct = products.length;
        this.productManagement.removeById(idRemove);
        if (lengthProduct !== products.length) {
            console.log('X??a th??nh c??ng!');
        }
        else {
            console.log('X??a th???t b???i!');
        }
    }
    updateProduct() {
        console.log('--C???p nh???t s???n ph???m--');
        let products = this.productManagement.getAll();
        for (let i = 0; i < products.length; i++) {
            console.log(`Id: ${products[i].id} | T??n: ${products[i].name}`);
        }
        let idProduct = +rl.question("Nh???p id danh m???c mu???n s???a:");
        let indexUpdate = this.productManagement.findById(idProduct);
        if (indexUpdate !== -1) {
            let product = ProductMenu.inputProduct();
            product.id = idProduct;
            if (products[indexUpdate].category !== null)
                product.category = products[indexUpdate].category;
            this.productManagement.updateById(idProduct, product);
            console.log('S???a s???n ph???m th??nh c??ng!');
        }
        else {
            console.log('Nh???p sai m?? s???n ph???m!');
        }
    }
    creatProduct() {
        let product = ProductMenu.inputProduct();
        this.productManagement.creatNew(product);
        console.log('Th??m th??nh c??ng!');
    }
    static inputProduct() {
        console.log('--Th??m s???n ph???m m???i--');
        let name = rl.question('Nh???p t??n s???n ph???m: ');
        let price = +rl.question('Nh???p gi?? s???n ph???m: ');
        let description = rl.question('Nh???p m?? t???: ');
        return new product_1.Product(name, price, description);
    }
    showAllProducts() {
        console.log('--Hi???n th??? danh s??ch s???n ph???m--');
        let products = this.productManagement.getAll();
        for (let i = 0; i < products.length; i++) {
            console.log(`ID: ${i + 1} | T??n: ${products[i].name} | Gi??: ${products[i].price} | M?? t???: ${products[i].description}`);
        }
    }
}
exports.ProductMenu = ProductMenu;

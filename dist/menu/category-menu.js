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
exports.CategoryMenu = void 0;
const category_management_1 = require("../category/category-management");
const rl = __importStar(require("readline-sync"));
const category_1 = require("../model/category");
var CategoryChoice;
(function (CategoryChoice) {
    CategoryChoice[CategoryChoice["SHOW_CATEGORY"] = 1] = "SHOW_CATEGORY";
    CategoryChoice[CategoryChoice["CREAT_CATEGORY"] = 2] = "CREAT_CATEGORY";
    CategoryChoice[CategoryChoice["UPDATE_CATEGORY"] = 3] = "UPDATE_CATEGORY";
    CategoryChoice[CategoryChoice["REMOVE_CATEGORY"] = 4] = "REMOVE_CATEGORY";
    CategoryChoice[CategoryChoice["SHOW_PRODUCT_BY_CATEGORY"] = 5] = "SHOW_PRODUCT_BY_CATEGORY";
})(CategoryChoice || (CategoryChoice = {}));
class CategoryMenu {
    constructor() {
        this.categoryManagement = new category_management_1.CategoryManagement();
    }
    run() {
        let choice = -1;
        do {
            console.log('--Quản lý danh mục---');
            console.log('1. Hiển thị danh sách danh mục ');
            console.log('2.Tạo danh mục mới');
            console.log('3. Cập nhật thông tin danh mục');
            console.log('4.Xóa danh mục');
            console.log('5. Hiển thị danh sách sản phẩm theo danh mục');
            console.log('0. Quay lại');
            choice = +rl.question('Nhập lựa chọn ');
            switch (choice) {
                case CategoryChoice.SHOW_CATEGORY: {
                    console.log('--Hiển thị danh sách danh mục--');
                    this.showCategory();
                    break;
                }
                case CategoryChoice.CREAT_CATEGORY: {
                    this.creatCategory();
                    break;
                }
                case CategoryChoice.UPDATE_CATEGORY: {
                    this.updateCategory();
                    break;
                }
                case CategoryChoice.REMOVE_CATEGORY: {
                    this.removeCategory();
                    break;
                }
                case CategoryChoice.SHOW_PRODUCT_BY_CATEGORY: {
                    this.showProductByCategory();
                    break;
                }
            }
        } while (choice != 0);
    }
    showProductByCategory() {
        console.log('--Hiển thị danh sách sản phẩm theo danh mục--');
        let name = rl.question('Nhập tên danh mục sản phẩm cần tìm: ');
        let category = this.categoryManagement.findByName(name);
        if (category) {
            for (let i = 0; i < category.products.length; i++) {
                console.log(`${i + 1} | ${category.products[i].name} | ${category.products[i].price} | ${category.products[i].description}`);
            }
        }
        else {
            console.log('Sản phẩm cần tìm không tồn tại');
        }
    }
    removeCategory() {
        console.log('--Xóa danh muc--');
        let categories = this.categoryManagement.getAll();
        for (let category of categories) {
            console.log(`Id: ${category.id} | Tên: ${category.name}`);
        }
        let idCategory = +rl.question("Nhập id danh muc muốn xóa: ");
        let lengthCategory = categories.length;
        this.categoryManagement.removeById(idCategory);
        if (lengthCategory !== categories.length) {
            console.log('Xoá thành công!');
        }
        else {
            console.log('xóa thất bại ');
        }
    }
    updateCategory() {
        console.log('--Cập nhật thông tin danh mục--');
        let categories = this.categoryManagement.getAll();
        for (const category of categories) {
            console.log(`${category.id}, ${category.name}`);
        }
        let idCategory = +rl.question("Nhập id danh muc muốn sửa: ");
        let indexCategory = this.categoryManagement.findById(idCategory);
        let category = this.categoryManagement.findByIdCategory(idCategory);
        if (indexCategory !== -1) {
            if (category !== null) {
                category.id = idCategory;
                category.name = rl.question('Nhập tên danh mục: ');
                if (category.products.length !== 0) {
                    category.products = categories[indexCategory].products;
                }
                else {
                    category.products = [];
                }
                this.categoryManagement.updateById(idCategory, category);
                console.log('Sửa danh mục thành công');
            }
        }
        else {
            console.log('Nhập sai mã danh mục!');
        }
    }
    creatCategory() {
        console.log('--Tạo danh mục sản phẩm--');
        let name = rl.question('Nhập tên danh mục: ');
        let category = new category_1.Category(name);
        this.categoryManagement.creatNew(category);
    }
    showCategory() {
        let categories = this.categoryManagement.getAll();
        for (const category of categories) {
            console.log(`${category.id}, ${category.name}`);
        }
    }
}
exports.CategoryMenu = CategoryMenu;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    constructor(name) {
        this._id = 0;
        this._products = [];
        this._name = name;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get products() {
        return this._products;
    }
    set products(value) {
        this._products = value;
    }
}
exports.Category = Category;

import {Product} from "./product";

export class Category {
    private _id: number = 0;
    private _name: string;
    private _products: Product[] = [];


    constructor(name: string) {
        this._name = name;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get products(): Product[] {
        return this._products;
    }

    set products(value: Product[]) {
        this._products = value;
    }
}
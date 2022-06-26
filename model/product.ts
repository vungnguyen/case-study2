export class Product {
    private _id: number =0 ;
    private _name: string;
    private _price: number;
    private _description: string;

    constructor( name: string, price: number, description: string) {
        this._name = name;
        this._price = price;
        this._description = description;
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

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
}
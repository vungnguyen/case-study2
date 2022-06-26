import {IProductManagement} from "./i-product-management";
import {Product} from "../../model/product";

export class ProducrManagement implements IProductManagement {
    private static id: number = 1;
    private static products: Product[] = [];

    creatNew(t: Product): void {
        ProducrManagement.id ++ ;
        t.id = ProducrManagement.id;
        ProducrManagement.products.push(t);
    }

    findById(id: number): number {

        return 0;
    }

    getAll(): Product[] {
        return ProducrManagement.products;
    }

    removeById(id: number): void {
    }

    updateById(id: number, t: Product): void {
    }

}
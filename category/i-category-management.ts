import {IManagement} from "../management/i-management";
import {Category} from "../model/category";

export interface ICategoryManagement extends IManagement<Category> {
    findByName(name: string): Category | null;

    findByIdCategory(idCategory: number): Category | null;
}
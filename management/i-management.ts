export interface IManagement<T> {
    getAll(): T[];
    creatNew(t: T): void;
    updateById(id: number,t: T) :void;
    removeById(id: number): void;
    findById(id: number) : number;
}
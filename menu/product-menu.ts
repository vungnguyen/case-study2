import {ProductManagement} from "../management/product/producr-management";
import * as rl from 'readline-sync'
import {Product} from "../model/product";
import {CategoryManagement} from "../category/category-management";

enum ProductChoice {
    SHOW_ALL_PRODUCT = 1,
    ADD_PRODUCT = 2,
    UPDATE_PRODUCT = 3,
    REMOVE_PRODUCT = 4,
    SEARCH_BY_NAME = 5,
    SORT_PRODUCT = 6,
    ADD_PRODUCT_TO_CATEGORY = 7,
}
export class ProductMenu {
    private productManagement = new ProductManagement();
    private categoryManagement = new CategoryManagement();
    run() {
        let choice = -1;
        do {
            console.log('---Quản lý sản phẩm---');
            console.log('1. Hiển thị danh sách sản phẩm');
            console.log('2. Thêm sản phẩm mới');
            console.log('3. Cập nhật sản phẩm');
            console.log('4. Xóa sản phẩm');
            console.log('5. Tìm kiếm sản phẩm theo tên');
            console.log('6. Sắp xếp sản phẩm theo giá giảm dần');
            console.log('7. Thêm sản phẩm vào danh mục')
            console.log('0. Quay lại');
            choice = +rl.question('nhập lựa chọn: ');
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
                    console.log('--Thêm sản phẩm vào danh mục--');
                    let categories = this.categoryManagement.getAll();
                    let products = this.productManagement.getAll();
                    if (categories.length == 0){
                        console.log('Hiện tại chưa có danh mục sản phẩm!');
                        break;
                    }
                    for (let i = 0; i < categories.length; i++){
                        console.log(`${i + 1} | ${categories[i].name}`)
                    }
                    let id = +rl.question('Nhập mã sản phẩm cần thêm vào danh mục:   ')
                    let productIndex = this.productManagement.findById(id);
                    if (productIndex == -1) {
                        console.log('Mã sản phẩm không tồn tại !');
                        break;
                    }else {
                        let categoryName = rl.question('Nhập tên danh mục sản phẩm cần thêm:  ');
                        let category = this.categoryManagement.findByName(categoryName);
                        if (category){
                            products[productIndex].category = category;
                            category.products.push(products[productIndex]);
                        }else {
                            console.log('Tên danh mục không tồn tại');
                        }
                    }

                    break;
                }
            }

        }while (choice != 0);
    }

    private sortDown() {
        let products = this.productManagement.getAll();
        let arrSort: Product[] = [];
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
            console.log('Sắp xếp theo giá giảm dần');
            for (let product of arrSort) {
                console.log(`Id: ${product.id} | Ten: ${product.name} | Mo ta:${product.description} | Gia: ${product.price}`);
            }
        }
    }

    private searchByName() {
        let products = this.productManagement.getAll();
        let arrLinearSearch = [];
        let nameProduct = rl.question('nhập tên sản phẩm: ');
        let flag = true;
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.includes(nameProduct)) {
                arrLinearSearch.push(products[i]);
            } else {
                flag = false;
            }
        }
        if (arrLinearSearch.length != 0) {
            flag = true;
        }
        if (flag) {
            for (let product of arrLinearSearch) {
                console.log(`Id: ${product.id} | Ten: ${product.name} | Mo ta: ${product.description} | Gia: ${product.price} | ${product.category?.name}`)
                flag = true;
            }
        } else {
            console.log('Sản phẩm không tồn tại')
        }
    }

    private removeProduct() {
        console.log('--Xóa sản phẩm--');
        let products = this.productManagement.getAll();
        for (let product of products) {
            console.log(`Id: ${product.id} | Tên: ${product.name}`)
        }
        let idRemove = +rl.question('Nhập mã sản phẩm muốn xóa: ');
        let lengthProduct = products.length;
        this.productManagement.removeById(idRemove);
        if (lengthProduct !== products.length) {
            console.log('Xóa thành công!');
        } else {
            console.log('Xóa thật bại!');
        }
    }

    private updateProduct() {
        console.log('--Cập nhật sản phẩm--');
        let products = this.productManagement.getAll();
        for (let i = 0; i < products.length; i++) {
            console.log(`Id: ${products[i].id} | Tên: ${products[i].name}`)
        }
        let idProduct = +rl.question("Nhập id danh mục muốn sửa:")
        let indexUpdate = this.productManagement.findById(idProduct);
        if (indexUpdate !== -1) {
            let product = ProductMenu.inputProduct();
            product.id = idProduct;
            if (products[indexUpdate].category !== null)
                product.category = products[indexUpdate].category;
            this.productManagement.updateById(idProduct, product);
            console.log('Sửa sản phẩm thành công!');
        } else {
            console.log('Nhập sai mã sản phẩm!')
        }
    }

    private creatProduct() {
        let product = ProductMenu.inputProduct();
        this.productManagement.creatNew(product);
        console.log('Thêm thành công!')
    }

    private static inputProduct() {
        console.log('--Thêm sản phẩm mới--');
        let name = rl.question('Nhập tên sản phẩm: ');
        let price = +rl.question('Nhập giá sản phẩm: ');
        let description = rl.question('Nhập mô tả: ');
        return new Product(name, price, description);
    }

    private showAllProducts() {
        console.log('--Hiển thị danh sách sản phẩm--');
        let products = this.productManagement.getAll();
        for (let i = 0; i < products.length; i++) {
            console.log(`ID: ${i+1} | Tên: ${products[i].name} | Giá: ${products[i].price} | Mô tả: ${products[i].description}`)
        }
    }
}
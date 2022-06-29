import {CategoryManagement} from "../category/category-management";
import {ICategoryManagement} from "../category/i-category-management";
import * as rl from 'readline-sync'
import {Category} from "../model/category";
enum CategoryChoice{
    SHOW_CATEGORY = 1,
    CREAT_CATEGORY = 2,
    UPDATE_CATEGORY = 3,
    REMOVE_CATEGORY = 4,
    SHOW_PRODUCT_BY_CATEGORY= 5
}
export  class CategoryMenu {
    private categoryManagement: ICategoryManagement = new CategoryManagement();
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
            choice = +rl.question('Nhập lựa chọn ')
            switch (choice){
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
        }while (choice != 0)

    }

    private showProductByCategory() {
        console.log('--Hiển thị danh sách sản phẩm theo danh mục--');
        let name = rl.question('Nhập tên danh mục sản phẩm cần tìm: ');
        let category = this.categoryManagement.findByName(name);
        if (category) {
            for (let i = 0; i < category.products.length; i++) {
                console.log(`${i + 1} | ${category.products[i].name} | ${category.products[i].price} | ${category.products[i].description}`)
            }
        } else {
            console.log('Sản phẩm cần tìm không tồn tại')
        }
    }

    private removeCategory() {
        console.log('--Xóa danh muc--');
        let categories = this.categoryManagement.getAll();
        for (let category of categories) {
            console.log(`Id: ${category.id} | Tên: ${category.name}`);
        }
        let idCategory = +rl.question("Nhập id danh muc muốn xóa: ");
        let lengthCategory = categories.length;
        this.categoryManagement.removeById(idCategory);
        if (lengthCategory !== categories.length){
            console.log('Xoá thành công!')
        }else {
            console.log('xóa thất bại ')
        }

    }

    private updateCategory() {
        console.log('--Cập nhật thông tin danh mục--');
        let categories = this.categoryManagement.getAll();
        for (const category of categories) {
            console.log(`${category.id}, ${category.name}`)
        }
        let idCategory = +rl.question("Nhập id danh muc muốn sửa: ")
        let indexCategory = this.categoryManagement.findById(idCategory);
        let category = this.categoryManagement.findByIdCategory(idCategory);
        if (indexCategory !== -1) {
            if (category !== null) {
                category.id = idCategory;
                category.name = rl.question('Nhập tên danh mục: ');
                if (category.products.length !== 0) {
                    category.products = categories[indexCategory].products;
                } else {
                    category.products = [];
                }
                this.categoryManagement.updateById(idCategory, category);
                console.log('Sửa danh mục thành công');
            }
        } else {
            console.log('Nhập sai mã danh mục!');
        }
    }

    private creatCategory() {
        console.log('--Tạo danh mục sản phẩm--');
        let name = rl.question('Nhập tên danh mục: ');
        let category = new Category(name);
        this.categoryManagement.creatNew(category)
    }

    private showCategory() {
        let categories = this.categoryManagement.getAll();
        for (const category of categories) {
            console.log(`${category.id}, ${category.name}`)
        }
    }
}
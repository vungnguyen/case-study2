import * as rl from 'readline-sync';
enum AdminChoice {
    PRODUCT_MANAGEMENT = 1,
    CATEGORY_MANAGEMENT = 2,
}
export class AdminMenu {
    run() {
        let choice = -1;
        do {
            console.log('---Ứng dụng quản lý cửa hàng---');
            console.log('1. Quản lý sản phẩm');
            console.log('2. Quản lý danh mục sản phẩm');
            console.log('0. Đăng xuất');
            choice = +rl.question('nhập lựa chọn : ')
            switch (choice) {
                case AdminChoice.PRODUCT_MANAGEMENT: {
                    console.log('---Quản lý sản phẩm---');
                    break;
                }
                case AdminChoice.CATEGORY_MANAGEMENT: {
                    console.log('---Quản lý danh mục sản phẩm---');
                    break;
                }
            }
        }while (choice != 0);

    }

}
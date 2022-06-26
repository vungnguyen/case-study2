import * as rl from 'readline-sync'
export class UserMenu {
    run() {
        let choice = -1;
        do {
            console.log('---Bán hàng---');
            console.log('1. Thêm sản phẩm vảo giỏ hàng');
            console.log('2. Mua hàng');
            console.log('3. Thanh toán ');
            console.log('4. Đăng xuất');
            choice = +rl.question('nhập lựa chọn : ')
        }while (choice != 0);
    }
}
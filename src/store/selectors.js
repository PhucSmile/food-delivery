// import { createSelector } from '@reduxjs/toolkit';

// // lấy từ rootReducer ->từ cart chỉ vào initialState lấy cartItems  ->>cart.cartItems,
// const cartItemsSelector = (state) => state.cart.cartItems;

// // count number of product in cart( đếm số lượng spham trong giỏ hàng)

// // lấy ra cartItemsSelector và cartItems để lướt qua từng items trong giỏ hàng để cộng dồn số lượng
// export const totalPriceSelector = createSelector(cartItemsSelector, (cartItems) =>
//     // lấy kết quả count bước trước đó cộng vs item.quantity hiện tại
//     cartItems.reduce((count, item) => count + item.quantity, 0),
// );

// // calculate total of cart
// // trường hợp tính total
// export const totalAmountSelector = createSelector(cartItemsSelector, (cartItems) =>
//     // lấy tổng(total) + đơn giá(price) * số lượng(quantity)
//     cartItems.reduce((total, item) => total + item.products.price * item.quantity, 0),
// );

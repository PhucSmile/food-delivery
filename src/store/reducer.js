import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showCart: false,
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    totalQuantity: localStorage.getItem('totalQuantity') ? JSON.parse(localStorage.getItem('totalQuantity')) : 0,
    totalAmount: localStorage.getItem('totalAmount') ? JSON.parse(localStorage.getItem('totalAmount')) : 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // ++++SHOW CART++++
        toggleCart(state) {
            state.showCart = !state.showCart;
        },

        // ++++ADD CART++++
        addToCart(state, action) {
            //  newItems gồm [ id , products, quantity]
            const newItems = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItems.id);
            state.totalQuantity++;
            // ktra mặt hàng này có chưa
            if (!existingItem) {
                // add to cart
                state.cartItems.push({
                    id: newItems.id,
                    title: newItems.title,
                    image01: newItems.image01,
                    price: newItems.price,
                    quantity: 1,
                    totalPrice: newItems.price,
                });
            } else {
                // increase quantity
                // nếu có rồi thì quantity tăng 1
                existingItem.quantity++;

                // cập nhập lại giá
                // tổng giá + giá newItems mới
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItems.price);
            }

            // tính tổng tất cả spham
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0,
            );

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
            localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
        },

        // ++++REMOVE++++
        removeCart(state, action) {
            const { id } = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);
            state.totalQuantity--;

            // ktra quantity nếu sl trong giỏ hàng ===1 thì xóa else số lượng hiện tại - đi số lượng newItems.quantity mới
            if (existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                // tính lại giá :tổng giá trừ đi giá mới
                existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
            }

            // tính tổng tất cả spham
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0,
            );

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
            localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
        },

        // ++++DELETE++++
        deleteCart(state, action) {
            const { id } = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                //tìm những tk khác với id và lọc chúng và trả ra mảng mới
                state.cartItems = state.cartItems.filter((item) => item.id !== id);

                // khi xóa thì cập nhập lại totalQuantity
                state.totalQuantity = state.totalQuantity - existingItem.quantity;
            }

            // tính tổng tất cả spham
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0,
            );

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
            localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
        },
    },
});

// Action creators are generated for each case reducer function

export const cartActions = cartSlice.actions;

export default cartSlice;

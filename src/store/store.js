import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './reducer';

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    },
});

export default store;

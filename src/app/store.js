import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import createSagaMiddleware from "redux-saga";
import mySaga from "../features/cart/cartSaga";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    product: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);

import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  addAsync,
  addAsyncFulfilled,
  deleteAsync,
  deleteAsyncFulfilled,
  fetchAsync,
  fetchAsyncFulfilled,
  updateAsync,
  updateAsyncFulfilled,
} from "./cartSlice";
import { addItem, deleteItem, fetchItems, updateItem } from "./cartAPI";

function* fetchCartItems(action) {
  const response = yield call(fetchItems);
  yield put({ type: fetchAsyncFulfilled.toString(), payload: response.data });
}
function* addCartItem(action) {
  const { id, title, thumbnail, brand, price } = action.payload;
  const response = yield call(addItem, {
    id,
    title,
    thumbnail,
    brand,
    price,
    quantity: 1,
  });
  yield put({ type: addAsyncFulfilled.toString(), payload: response.data });
}

function* deleteCartItem(action) {
  const id = action.payload;
  const response = yield call(deleteItem, id);
  yield put({ type: deleteAsyncFulfilled.toString(), payload: response.data });
}

function* updateCartItem(action) {
  const { id, update } = action.payload;
  console.log(action.payload, "action.payload of updateCartItem");
  const response = yield call(updateItem, id, update);
  console.log("response", response)
  yield put({ type: updateAsyncFulfilled.toString(), payload: response.data });
}

function* watchFetchItems() {
  yield takeEvery(fetchAsync.toString(), fetchCartItems);
}

function* watchAddItem() {
  yield takeEvery(addAsync.toString(), addCartItem);
}

function* watchDeleteItem() {
  yield takeEvery(deleteAsync.toString(), deleteCartItem);
}

function* watchUpdateItem() {
  yield takeEvery(updateAsync.toString(), updateCartItem);
}

function* mySaga() {
  yield all([
    watchFetchItems(),
    watchAddItem(),
    watchDeleteItem(),
    watchUpdateItem(),
  ]);
}
export default mySaga;

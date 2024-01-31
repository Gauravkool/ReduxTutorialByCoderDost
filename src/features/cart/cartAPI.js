// A mock function to mimic making an async request for data
import axios from "axios";
export function fetchItems() {
  return axios.get("http://localhost:8080/cart");
}
export function addItem(item) {
  return axios.post("http://localhost:8080/cart", item);
}
export function updateItem(id, itemUpdate) {
  console.log({ id, itemUpdate });
  return axios.patch(`http://localhost:8080/cart/${id}`, itemUpdate);
}
export function deleteItem(id) {
  return axios.delete(`http://localhost:8080/cart/${id}`);
}


/*

export function updateItem(id, itemUpdate) {
  console.log({ id, itemUpdate });
  return axios.patch(`http://localhost:8080/cart/${id}`, itemUpdate);
}

function* watchUpdateItem() {
  yield takeEvery(updateAsync.toString(), updateCartItem);
}


export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync, (state) => {
        state.status = "loading";
      }).addCase(updateAsyncFulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      });


      export const updateAsync = createAction("cart/updateItem/pending");
export const updateAsyncFulfilled = createAction("cart/updateItem/fulfilled");

*/
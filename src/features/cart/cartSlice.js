import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
};

export const fetchAsync = createAction("cart/fetchItems/pending");
export const fetchAsyncFulfilled = createAction("cart/fetchItems/fulfilled");
export const addAsync = createAction("cart/addItem/pending");
export const addAsyncFulfilled = createAction("cart/addItem/fulfilled");
export const deleteAsync = createAction("cart/deleteItem/pending");
export const deleteAsyncFulfilled = createAction("cart/deleteItem/fulfilled");
export const updateAsync = createAction("cart/updateItem/pending");
export const updateAsyncFulfilled = createAction("cart/updateItem/fulfilled");

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsyncFulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(addAsyncFulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(deleteAsyncFulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(updateAsyncFulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      });
  },
});

export default cartSlice.reducer;

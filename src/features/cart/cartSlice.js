import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addItem, deleteItem, fetchItems, updateItem } from "./cartAPI";

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



// export const addAsync = createAsyncThunk("cart/addItem", async (item) => {
//   const { id, title, thumbnail, brand, price } = item;
//   const response = await addItem({
//     id,
//     title,
//     thumbnail,
//     brand,
//     price,
//     quantity: 1,
//   });
//   return response.data;
// });

// export const deleteAsync = createAsyncThunk("cart/deleteItem", async (id) => {
//   await deleteItem(id);
//   return id;
// });

// export const updateAsync = createAsyncThunk(
//   "cart/updateItem",
//   async ({ id, update }) => {
//     const response = await updateItem(id, update);
//     return response.data;
//   }
// );

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

// export const {  } = productsSlice.actions;

export default cartSlice.reducer;

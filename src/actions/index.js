// actions name constants
import axios from "axios";

export const inc = "account/increment";
export const dec = "account/decrement";
export const incByAmt = "account/incrementByAmount";
export const getAccUserFulfiled = "account/getUser/fulfiled";
export const getAccUserRejected = "account/getUser/rejected";
export const getAccUserPending = "account/getUser/pending";
export const incBonus = "bonus/increment";

export function getUserAccount(id) {
  return async (dispatch, getState) => {
    try {
      dispatch(getAccountUserPending());
      const { data } = await axios.get(`http://localhost:8080/accounts/${id}`);
      dispatch(getAccountUserFulfiled(data.amount));
    } catch (error) {
      dispatch(getAccountUserRejected(error.message));
    }
  };
}

export function getAccountUserFulfiled(value) {
  return { type: getAccUserFulfiled, payload: value };
}
export function getAccountUserRejected(error) {
  return { type: getAccUserRejected, error: error };
}
export function getAccountUserPending() {
  return { type: getAccUserPending };
}
export function increment() {
  return { type: inc };
}
export function decrement() {
  return { type: dec };
}
export function incrementByAmount(value) {
  return { type: incByAmt, payload: value };
}

export function incrementBonus() {
  return { type: incBonus };
}

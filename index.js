import axios from "axios";
import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";

// Constants
// const init = "account/init";
const inc = "account/increment";
const dec = "account/decrement";
const incByAmt = "account/incrementByAmount";
const getAccUserFulfiled = "account/getUser/fulfiled";
const getAccUserRejected = "account/getUser/rejected";
const getAccUserPending = "account/getUser/pending";
const incBonus = "bonus/increment";

// store
const store = createStore(
  combineReducers({ account: accountReducer, bonus: bonusReducer }),
  applyMiddleware(logger.default, thunk)
);

// reducer
function accountReducer(state = { amount: 1 }, action) {
  switch (action.type) {
    case getAccUserFulfiled:
      return { amount: action.payload, pending: false };
    case getAccUserRejected:
      return { ...state, error: action.error, pending: false };
    case getAccUserPending:
      return { ...state, pending: true };
    case inc:
      return { amount: state.amount + 1 };
    case dec:
      return { amount: state.amount - 1 };
    case incByAmt:
      return { amount: state.amount + action.payload };
    default:
      return state;
  }
}

function bonusReducer(state = { points: 1 }, action) {
  switch (action.type) {
    case incBonus:
      return { points: state.points + 1 };
    case incByAmt:
      if (action.payload > 100) return { points: state.points + 1 };
    default:
      return state;
  }
}

function getUserAccount(id) {
  return async (dispatch, getState) => {
    try {
      dispatch(getAccountUserPending());
      const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
      dispatch(getAccountUserFulfiled(data.amount));
    } catch (error) {
      dispatch(getAccountUserRejected(error.message));
    }
  };
}

// Actions creators
function getAccountUserFulfiled(value) {
  return { type: getAccUserFulfiled, payload: value };
}
function getAccountUserRejected(error) {
  return { type: getAccUserRejected, error: error };
}
function getAccountUserPending() {
  return { type: getAccUserPending };
}
function increment() {
  return { type: inc };
}
function decrement() {
  return { type: dec };
}
function incrementByAmount(value) {
  return { type: incByAmt, payload: value };
}

function incrementBonuc() {
  return { type: incBonus };
}

// let history = [];
// globle
// store.subscribe(() => {
//   history.push(store.getState());
//   console.log(history);
// });
setTimeout(() => {
  // store.dispatch(incrementByAmount(190));
  store.dispatch(getUserAccount(2));
  // store.dispatch(incrementBonuc());
}, 2000);

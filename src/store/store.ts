import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const state = {
  num: 0,
};

function reducer(prevState = state, action = { type: "add" }) {
  let newState = { ...prevState };
  switch (action.type) {
    case "add":
      newState.num += 1;
      return newState;
    default:
      return prevState;
  }
}

const redux = createStore(reducer, applyMiddleware(thunk));

export default redux;

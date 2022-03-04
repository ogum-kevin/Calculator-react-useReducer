import React from "react";
import { ACTIONS } from "./src/App";
export default function DigitOp({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>
      {digit}
    </button>
  );
}

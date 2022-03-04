import React from "react";
import { ACTIONS } from "./src/App";
export default function DigitOp({ dispatch, operation }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPP, payload: { operation } })
      }>
      {operation}
    </button>
  );
}

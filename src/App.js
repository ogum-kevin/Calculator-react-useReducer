import { React, useReducer } from "react";
import DigitOp from "../DigitOp";
import OperationButton from "../OperationButton";
import "./styles.css";
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPP: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate"
};
const initialState = {
  currentOperand: "",
  previousOperand: "",
  operation: ""
};
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand} ${payload.digit}`
      };
    case ACTIONS.CHOOSE_OPP:
      return {
        ...state,
        currentOperand: `${state.currentOperand} ${payload.operation}`
      };

    default:
      return state;
  }
}
function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand}
          {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <OperationButton operation={"/"} dispatch={dispatch} />

      <DigitOp digit={1} dispatch={dispatch} />
      <DigitOp digit={2} dispatch={dispatch} />
      <DigitOp digit={3} dispatch={dispatch} />
      <OperationButton operation={"*"} dispatch={dispatch} />
      <DigitOp digit={4} dispatch={dispatch} />
      <DigitOp digit={5} dispatch={dispatch} />
      <DigitOp digit={6} dispatch={dispatch} />
      <OperationButton operation={"+"} dispatch={dispatch} />
      <DigitOp digit={7} dispatch={dispatch} />
      <DigitOp digit={8} dispatch={dispatch} />
      <DigitOp digit={9} dispatch={dispatch} />
      <OperationButton operation={"-"} dispatch={dispatch} />
      <DigitOp digit={"."} dispatch={dispatch} />
      <DigitOp digit={0} dispatch={dispatch} />
      <button className="span-two">=</button>
    </div>
  );
}
export default App;

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

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        };
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || " "}${payload.digit}`
      };

    case ACTIONS.CHOOSE_OPP:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      } else if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        };
      } else
        return {
          ...state,
          previousOperand: evaluateFn(state),
          operation: payload.operation,
          currentOperand: null
        };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      )
        return state;
      return {
        ...state,
        currentOperand: evaluateFn(state),
        operation: null,
        overwrite: true,
        previousOperand: null
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        };
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1)
        return { ...state, currentOperand: null };
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      };

    default:
      console.log("You are fucked my friend");
  }
}
//const INT_FORMATTER = new Intl.NumberFormat("en-us", {
//maximumFractionDigits: 0
//});
//
function evaluateFn({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand.trim());
  const current = parseFloat(currentOperand.trim());

  if (isNaN(prev) && isNaN(current)) return " ";
  let computation = "";
  switch (operation) {
    case "/":
      computation = prev / current;
      console.log("/ has been triggered");
      break;
    case "+":
      computation = prev + current;
      console.log("+ has been triggered");
      break;
    case "*":
      computation = prev * current;
      console.log("* has been triggered");
      break;
    case "-":
      computation = prev - current;
      console.log("- has been triggered");
      break;
    default:
      console.log("Invalid operation");
  }
  return computation.toString();
}
function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
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
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton operation="/" dispatch={dispatch} />

      <DigitOp digit={1} dispatch={dispatch} />
      <DigitOp digit={2} dispatch={dispatch} />
      <DigitOp digit={3} dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitOp digit={4} dispatch={dispatch} />
      <DigitOp digit={5} dispatch={dispatch} />
      <DigitOp digit={6} dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitOp digit={7} dispatch={dispatch} />
      <DigitOp digit={8} dispatch={dispatch} />
      <DigitOp digit={9} dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitOp digit={"."} dispatch={dispatch} />
      <DigitOp digit={0} dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>
        =
      </button>
    </div>
  );
}
export default App;

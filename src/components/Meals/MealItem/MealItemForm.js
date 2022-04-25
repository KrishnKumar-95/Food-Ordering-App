import React, { useRef,useState } from "react";
import Input from "../../UI/Input/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid,setAmountIsValid] = useState(true)

  const submitHandler = (event) => {
    event.preventDefault();

    // As this value comes through ref It always a string
    const enteredAmount = amountInputRef.current.value;

    // This converts it into number
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || 1 > enteredAmountNumber > 5) {
        setAmountIsValid(false)
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        label="Amount"
        ref={amountInputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;

import React, { useRef, useState } from "react";
import styles from './MealItemForm.module.css';
import Input from "../../UI/Input";

const MealItemForm = (props) => {
    const amountInputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);

    };

    return <form className={styles.form} onSubmit={submitHandler}>
        <Input
            // here Input is our custom component so 'ref' will not work so to make it work in custom components, we need to pass(forward) this 'ref' to the built-in input in Input.js(where we are going to receive refs).
            ref={amountInputRef}
            label="Amount"
            input={{
                // default props that we can add to any input element
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}></Input>
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1-5). </p>}
    </form>
}

export default MealItemForm;

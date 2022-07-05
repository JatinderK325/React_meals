import React from "react";
import styles from './Input.module.css';

const Input = React.forwardRef((props,ref) => {
    return(
        // for this Input component, I expect a 'label' prop with a label text and 'input' prop(htmlFor) which then itself holds a object with configuration data for the input like eg- id which we therefore add as the 'id' prop on the input.
        <div className={styles.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        {/* {...props.input} assures that all the key-value pairs in the input object which we receive on 'props.input' in label are added as props to input for eg- if 'input' above obj has key-value pair = type: 'text', then it will be added as a props type='text' to the 'input' below with the help of {...props.input}.*/}
        {/* {...props.input} - adding other configuration data as props to this input below */}
        {/* <input id={props.input.id}(will be added automatically) {...props.input}></input> */}
        <input ref={ref} {...props.input}></input>
        </div>
    );
});

export default Input;
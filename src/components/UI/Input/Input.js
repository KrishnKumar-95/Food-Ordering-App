import classes from './Input.module.css';
import React from 'react';

const Input = React.forwardRef((props,amountInputRef) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} ref={amountInputRef} onChange={props.onChange}/>
      {/* <input type={props.type} min={props.min} max={props.max} id={props.id} /> */}
    </div>
  );
});

export default Input;

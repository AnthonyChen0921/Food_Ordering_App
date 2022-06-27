import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.length === 5;

const Checkout = (props) => {
    const [formIsValid, setFormIsValid] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });


  const nameInputReft = useRef();
  const streetInputReft = useRef();
  const postalInputReft = useRef();
  const cityInputReft = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputReft.current.value;
    const enteredStreet = streetInputReft.current.value;
    const enteredPostal = postalInputReft.current.value;
    const enteredCity = cityInputReft.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormIsValid({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

      
      if(!formIsValid) {
        console.log("Form is invalid");
      }
      // submit
      if (formIsValid) {
        props.onSubmit({
          name: enteredName,
          street: enteredStreet,
          postal: enteredPostal,
          city: enteredCity,
        });
        console.log("Form is valid");
      }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formIsValid.name ? '':classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputReft} />
        {!formIsValid.name && <p>Name is required</p>}
      </div>
      <div className={`${classes.control} ${formIsValid.street ? '':classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputReft} />
        {!formIsValid.street && <p>Street is required</p>}
      </div>
      <div className={`${classes.control} ${formIsValid.postalCode ? '':classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputReft} />
        {!formIsValid.postalCode && <p>Postal Code is required</p>}
      </div>
      <div className={`${classes.control} ${formIsValid.city ? '':classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputReft} />
        {!formIsValid.city && <p>City is required</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCloseCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

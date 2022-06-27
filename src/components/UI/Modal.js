import classes from "./Modal.module.css";
import Backdrop from "./Backdrop";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
        {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart}/>, document.getElementById("backdrop-hook"))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById("modal-hook"))}
    </Fragment>
  );
};

export default Modal;

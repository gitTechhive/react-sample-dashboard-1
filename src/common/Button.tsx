import React from "react";
import "./button.scss";
import PropTypes from "prop-types";
import { ButtonProps } from "../interfaces";

const Button = (props: ButtonProps) => {
  // console.log(props?.text, props.disabled);

  return (
    <div className=" ">
      <button
        onClick={props.onClick}
        className={`btn ${props?.className}`}
        disabled={props.disabled}
        type={props?.type}
      >
        {props.icon ? props.icon : ""}
        {props?.children}
        {props?.text}
      </button>
    </div>
  );
};

export default Button;

Button.prototype = {
  text: PropTypes.string,
  onClick: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  icon: PropTypes.any,
};

Button.defaultProps = {
  text: "",
  type: "button",
  className:"",
  icon: "",
  disabled: false,
};

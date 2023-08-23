import "./button.style.scss";
const Button_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};
const Button = ({ buttonType, children, ...otherProps }) => {
  return (
    <button
      className={`button-container ${Button_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;

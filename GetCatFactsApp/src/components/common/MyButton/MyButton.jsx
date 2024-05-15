import './MyButton.scss';

function MyButton({ text, buttonColor, textColor, handleOnClick, isDisabled }) {
  return (
    <button
      className={`action-button ${textColor} ${buttonColor} ${!isDisabled ? "hover-effect" : ""}`}
      onClick={handleOnClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}

export default MyButton;

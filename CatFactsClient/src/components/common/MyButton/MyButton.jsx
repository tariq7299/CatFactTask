import './MyButton.scss';

function MyButton({ text, buttonColor, textColor, handleOnClick, isDisabled }) {
  return (

    <div className="cat-button">
    <button
      className={`action-button ${textColor} ${buttonColor}`}
      onClick={handleOnClick}
      disabled={isDisabled}
    >
      {text}
    </button>
    </div>
  );
}

export default MyButton;

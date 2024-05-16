import './CatButton.scss';

function CatButton({ text, handleOnClick, isDisabled }) {
  return (
    <div className="cat-button">
      <button
        className={`action-button`}
        onClick={handleOnClick}
        disabled={isDisabled}
      >
        {text}
      </button>
    </div>
  );
}

export default CatButton;

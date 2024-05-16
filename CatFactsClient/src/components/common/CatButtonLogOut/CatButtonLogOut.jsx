import './CatButtonLogOut.scss';

function CatButtonLogOut({ text, handleOnClick }) {
  return (
    <div className="cat-button-logout">
      <button className={`action-button`} onClick={handleOnClick}>
        {text}
      </button>
    </div>
  );
}

export default CatButtonLogOut;

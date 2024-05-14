import './MyButton.scss'

function MyButton({ text, buttonColor, textColor, handleOnClick, isDisabled }) {

    return (
        <button className={`section-action-button ${textColor} ${buttonColor}`} onClick={handleOnClick} disabled={isDisabled}>{text}</button>
    )

}

export default MyButton
import './MyButton.scss'

function MyButton({ text, buttonColor, textColor }) {

    return (
        <button className={`section-action-button ${textColor} ${buttonColor}`}>{text}</button>
    )

}

export default MyButton
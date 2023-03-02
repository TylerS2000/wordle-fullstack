import "./WinPopup.css"
export default function WinPopup(props:{win:boolean, answer:string}){
    return <div className="WinPopup">
        <div className="WinPopup-inner">{props.win?"Good Job!":`the correct answer was ${props.answer.toLowerCase()}`}</div>
    </div>
}
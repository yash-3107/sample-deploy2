import Instruction from "../instructions/instructions"
import "./headers_.css"
function Header({min,sec}){
    return(
        <div className="header">
            <h2>Quiz Mania</h2>
            <p>Time Remaining:{min}:{sec}</p>
        </div>
    )
}
export default Header
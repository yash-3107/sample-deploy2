import "./instructions.css"
function Instruction({play}){
    return(
        <div className="Instruction">
            <p>Attempt all questions.</p>
            <p>Each question is awarded +1 for correct answer,there is no negative marking.</p>
            <p>Total time alloted is 10 min for 10 MCQ based questions.</p>
            
        </div>
    )
}
export default Instruction
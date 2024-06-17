import { useEffect, useState } from "react"
import "./quiz_.css"
import axios from "axios"
function Quiz(){
    const [ques,setQues] = useState([]);
    const [currentQuesNumber,setQuestionNumber] = useState(0);
    const [options,setOptions] = useState([]);
    const [results,setResults] = useState([])

    async function downloadQues(){
            let response = await axios.get("https://opentdb.com/api.php?amount=10");
            let array_of_ques = response.data.results.map((data) => data.question);
            setQues(array_of_ques); 
            setResults(response.data.results);
    }

    useEffect(()=>{
        downloadQues();
    },[])
     
    useEffect(()=>{
       
        if(results.length>0)
            {
                let array_of_options = results[currentQuesNumber].incorrect_answers;
                array_of_options = [...array_of_options,results[currentQuesNumber].correct_answer];
                setOptions(array_of_options);
           }
        
    },[currentQuesNumber])

    return(
        <div className="questions">
            <div className="head">
                    <p>{ques[currentQuesNumber]}</p>
                    <button>Submit</button>
            </div>
            

            {
                        options.map((item) => <label for = {item}>
                                            <input type="radio" id={item} name="options_" key={item}/>{item}
                                     </label>)
            }

            <div className="nav_buttons">

                <button onClick={()=>{
                                            if(currentQuesNumber!=0)
                                                setQuestionNumber(currentQuesNumber-1)
                                           
                                      }} style={{
                                        backgroundColor: (currentQuesNumber==0)? '#ccc' : '#007bff',
                                        cursor: (currentQuesNumber==0)? 'not-allowed' : 'pointer',
                                        opacity: (currentQuesNumber==0)? 0.6 : 1,
                                                      }}>Prev
                </button>

                <button onClick={()=>{
                                            if(currentQuesNumber!=9)
                                                setQuestionNumber(currentQuesNumber+1)
                                            
                                    }} style={{
                                        backgroundColor: (currentQuesNumber==9)? '#ccc' : '#007bff',
                                        cursor: (currentQuesNumber==9)? 'not-allowed' : 'pointer',
                                        opacity: (currentQuesNumber==9)? 0.6 : 1,
                                                  }}>Next
                 </button>
            </div>
            
        </div>

    )
}
export default Quiz

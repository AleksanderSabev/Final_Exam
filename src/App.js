



import { useState, useContext } from "react";
import {
  formatArrayToMatrix,splitStringToArray, creteMapFromData
} from "./utils/dataUtils"; 
import { longestCollabWork } from "./utils/calculateTimeWorkedUtils";
import styles from './App.css';

function App(){
    const [data, setData]= useState([]);
    const [longestCollab,setLongestCollab]=useState(null);
  function handleFileUpload(e) {
    e.preventDefault();
    const file=e.target.files[0];
    const errors=[];


    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const dataArr = splitStringToArray(reader.result);
      const dataMatrix = formatArrayToMatrix(dataArr);
      dataMatrix.forEach((row,index)=>{
        if(row.length!==4){
          errors.push(index+1);
        }
      });
      if(errors.length>0){
        errors.forEach((error)=>
        console.error(`Data on row ${error} is invalid`));
      }
      const map=creteMapFromData(dataMatrix);
      setLongestCollab(longestCollabWork(map));
    };

  }
  return (
    <>
      <div className={styles.container}>
        <h1>Employees Common Projects</h1>
        <button>
          <label>
            <input type="file" onChange={handleFileUpload} />
            Upload employees information
            
          </label>
          {longestCollab ? <p>The most time two employees worked together  is:{longestCollab.daysWorked} days,</p> : null}
        </button> 
      </div>
    </>
  );
}

export default App;

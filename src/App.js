
import { useState, useContext } from "react";
import './App.css';
import {
  sanitizeArr,formatArrayToMatrix,splitStringToArray, creteMapFromData
} from "./utils/dataUtils"; 

function App() {

  
  const [data, setData]= useState([]);
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
      console.log(map);
      setData(dataMatrix);
    };


  //   const reader = new FileReader();
  //   reader.readAsText(file);
  //   reader.onload = function (e){
  //   const map=creteMapFromData(e.target.result);
  //   console.log(map);
  //     setData(map);
  // }
    
      
  //   };
   

  }
  
  return (
    <div className="App">
      <header className="App-header">
      <input type="file" onChange={handleFileUpload} />
      </header>
    </div>
  );

}

export default App;

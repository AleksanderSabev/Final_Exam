function splitStringToArray(string) {
    return string.split(/(\r\n|\r|\n)/g);
  }
  
  function formatArrayToMatrix(arr) {
    return arr
      .filter((row) => row.trim().length !== 0)
      .map((row) => row.split(", ").map((cell) => cell.trim()));
  }
  function sanitizeArr(arr) {
    return arr.map((row) => {
      return row.map((cell) => cell.trim());
    });
  }
  

  function creteMapFromData(data){
    let projectMap = new Map();

    data.forEach(([emplId, projectId, startDate, endDate]) => {
      if(endDate==='NULL'){
        endDate=new Date();
      }
      if (!projectMap.has(projectId)) {
        projectMap.set(projectId, new Map());
      }
      let emplMap = projectMap.get(projectId);
    
      emplMap.set(emplId, {
        startDate: startDate,
        endDate: endDate 
      });
    });
    return projectMap;
  }

 
  export { splitStringToArray, formatArrayToMatrix, sanitizeArr,creteMapFromData };
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
  

  function parseDate(dateString) {
    const formats = [
      "YYYY-MM-DD",
      "MM/DD/YYYY",
      "DD/MM/YYYY",
    ];
  
    for (let format of formats) {
      const parsedDate = tryDateParse(dateString, format);
      if (parsedDate) {
        return parsedDate;
      }
    }
    return null;
  }

  function tryDateParse(dateString, format) {
    const formatRegex = format
      .replace("YYYY", "(\\d{4})")
      .replace("MM", "(\\d{2})")
      .replace("DD", "(\\d{2})")
      
  
    const regex = new RegExp(`^${formatRegex}$`);
  
    const dateMatch = dateString.match(regex);
  
    if (dateMatch) {
      let [year, month, day] = [0, 0, 0];
  
      switch (format){
        case "YYYY-MM-DD":
          [, year, month, day, ] = dateMatch;
          
          break;
        case "MM/DD/YYYY":
          [, month, day, year, ] = dateMatch;
          break;
        case "DD/MM/YYYY":
          [, day, month, year, ] = dateMatch;
          break;
      }
      
      const parsedDate = new Date(
        year,
        month - 1,
        day || 1,
      );
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }
  
    return null;
  }

  function creteMapFromData(data){
    let projectMap = new Map();

    data.forEach(([emplId, projectId, startDate, endDate]) => {
      if(endDate==='NULL'){
        endDate=new Date();
      }else {
        endDate=parseDate(endDate);
      }
      if (!projectMap.has(projectId)) {
        projectMap.set(projectId, new Map());
      }
      let emplMap = projectMap.get(projectId);
    
      emplMap.set(emplId, {
        startDate: parseDate(startDate),
        endDate: endDate 
      });
    });
    return projectMap;
  }

 
  export { splitStringToArray, formatArrayToMatrix, sanitizeArr,creteMapFromData };
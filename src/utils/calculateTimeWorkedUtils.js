import { hadWorkedTogether } from "./hadWorkedTogether";

export function calculateDaysTotal(startDate, endDate) {
  if (!startDate || !endDate) {
    console.error("Invalid date!");
    return null;
  }

  const time = Math.abs(startDate.getTime() - endDate.getTime());
  const days = Math.floor(time / (1000 * 60 * 60 * 24));

  return days;
}

function findCommonTime(projectMap, projectID) {
  const employeeMap = projectMap.get(projectID);
  const collabArray = [];

  const employeeIds = [...employeeMap.keys()];

  for (let i = 0; i < employeeIds.length - 1; i++) {
    for (let j = i + 1; j < employeeIds.length; j++) {
      const empID1 = employeeIds[i];
      const empID2 = employeeIds[j];

      const employee1 = employeeMap.get(empID1);
      const employee2 = employeeMap.get(empID2);
      if (
        hadWorkedTogether(
          employee1.startDate,
          employee1.endDate,
          employee2.startDate,
          employee2.endDate
        )
      ) {
        const commonStartDate = new Date(
          Math.max(employee1.startDate, employee2.startDate)
        );
        const commonEndDate = new Date(
          Math.min(employee1.endDate, employee2.endDate)
        );
        const totalDays = calculateDaysTotal(commonStartDate, commonEndDate);
        const newCollab = {
          projectID: projectID,
          empID1: empID1,
          empID2: empID2,
          totalDays: totalDays,
        };
        collabArray.push(newCollab);
      }
    }
  }
  
  if (collabArray.length != 0) {
    return collabArray;
  }
  return null;
}
function checkCommonProjects(emplID1, emplID2, collabArr) {
  let totalDays = 0;
  const projects = [];
  for (const obj of collabArr) {
    if (obj.empID1 === emplID1 && obj.empID2 === emplID2) {
      totalDays += obj.totalDays;
      projects.push(obj.projectID);
    }
  }

  return {
    emplID1: emplID1,
    emplID2: emplID2,
    totalDays: totalDays,
    projects: projects,
  };
}

export function longestCollabWork(projectMap) {
  let longestCollab = {
    empID1: null,
    empID2: null,
    daysWorked: 0,
    projects: null,
  };
  for (const projectID of projectMap.keys()) {
    const collabArray = findCommonTime(projectMap, projectID);
    if(!collabArray){
        continue;
    }
    for (const obj of collabArray) {
      const currentCollabWork = checkCommonProjects(
        obj.empID1,
        obj.empID2,
        collabArray
      );
      if (currentCollabWork.totalDays > longestCollab.daysWorked) {
        longestCollab = {
          empID1: obj.empID1,
          empID2: obj.empID2,
          daysWorked: currentCollabWork.totalDays,
          project: currentCollabWork.projects,
        };
      }
    }
  }
  return longestCollab;
}

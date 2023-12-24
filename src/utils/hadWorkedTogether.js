export function hadWorkedTogether(emp1startDate,emp1endDate,emp2startDate,emp2endDate) {
    if (
      emp1endDate < emp2startDate ||
      emp2endDate < emp1startDate ||
      emp1startDate > emp2endDate ||
      emp2startDate > emp1endDate
    ) {
      return false;
    }
    return true;
  }
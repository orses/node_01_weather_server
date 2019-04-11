const rangeOfYears = (
  initYear = new Date().getFullYear(),
  finalYear = new Date().getFullYear(),
) => {
  if (finalYear > initYear) {
    return `${initYear} - ${finalYear}`;
  }
  return initYear;
};

module.exports = rangeOfYears;

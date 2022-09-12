import express from "express";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
class StocksUtils {
  sanitizeDateQuery(req: express.Request) {
    let queryParam = req.query && req.query.date ? req.query.date : null;
    if (queryParam) {
      queryParam = queryParam.toString(); // if queryParam exists, convert it to string
    } else {
      return null;
    }
    const [day, month, year] = queryParam.split("-");
    const dayNum = parseInt(day);
    const yearNum = parseInt(year);
    if (
      dayNum > 0 &&
      dayNum < 31 &&
      yearNum > 1900 &&
      yearNum < 2100 &&
      months.includes(month)
    ) {
      return queryParam;
    } else return null;
  }
}
export default new StocksUtils();

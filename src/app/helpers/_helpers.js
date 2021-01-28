import _ from "lodash";

const remove = (a, b) => a.filter((x) => !b.includes(x.code));
const _select = (data, values) => _.map(data, _.partialRight(_.pick, values));
const _date = (num) => {
  const number = num ? num : 0;
  let date = new Date();
  date.setMonth(date.getMonth() + number);
  return { value: date.toISOString().substring(0, 10), date };
};
const genTaxtReciept = (gov, sequence) => `${gov.serie}${gov.type}${sequence}`;
const decimal2 = (val) => val.toFixed(2);
const upDateArrays = (arr, val, key) => _.map(arr, (item) => (item[key] = val));

export default { remove, _select, _date, genTaxtReciept, decimal2, upDateArrays };

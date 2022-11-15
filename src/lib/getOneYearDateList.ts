type GetOneYearDateListIn = number;
type GetOneYearDateListOut = Array<string>;

/**
 * targetDateに入った日付から過去12ヶ月分をYYYY-MM形式の文字列で取得する
 */
export function getOneYearDateList(
  targetDate: GetOneYearDateListIn
): GetOneYearDateListOut {
  const date = new Date(targetDate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  const yearList = [];
  const thisMonth = [year, month];
  yearList.push(thisMonth);
  for (let i = 0; i < 11; i++) {
    if (month - 1 > 0) {
      month = month - 1;
      yearList.push([year, month]);
    } else if (month - 1 === 0) {
      month = 12;
      year = year - 1;
      yearList.push([year, month]);
    }
  }
  const oneYearDateList = yearList.map((month) => {
    if (String(month[1]).length === 1) {
      const fixedMonth = `0${month[1]}`;
      const yearAndMonth = `${month[0]}-${fixedMonth}`;
      return yearAndMonth;
    } else {
      const yearAndMonth = `${month[0]}-${month[1]}`;
      return yearAndMonth;
    }
  });

  return oneYearDateList;
}

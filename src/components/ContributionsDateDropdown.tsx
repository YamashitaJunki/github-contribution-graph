import { getOneYearDateList } from "../lib/getOneYearDateList";

type ContributionsDateDropdownIn = {
  setMonth: React.Dispatch<React.SetStateAction<string>>;
};
type ContributionsDateDropdownOut = JSX.Element;
export function ContributionsDateDropdown({
  setMonth,
}: ContributionsDateDropdownIn): ContributionsDateDropdownOut {
  const nowDate = Date.now();
  const dateList = getOneYearDateList(nowDate);

  return (
    <ul className="dropdown">
      <li className="dropdown-list">
        <div>Select&nbsp;month</div>
        <ul className="list">
          {dateList.map((month) => {
            return (
              <li key={month} className="each-month">
                <div onClick={() => setMonth(month)}>{month}</div>
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
}

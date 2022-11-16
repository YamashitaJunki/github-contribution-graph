import { getOneYearDateList } from "../lib/getOneYearDateList";
import styles from "../styles/Home.module.css";

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
    <ul className={styles.dropdown}>
      <li className={styles["dropdown-list"]}>
        <div>Select&nbsp;month</div>
        <ul className={styles.list}>
          {dateList.map((month) => {
            return (
              <li key={month} className={styles["each-month"]}>
                <div onClick={() => setMonth(month)}>{month}</div>
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
}

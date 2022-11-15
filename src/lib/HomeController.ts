import {
  getGitHubContributions,
  GithubContributePerDayList,
} from "../lib/getGitHubContributions";
import { getOneYearDateList } from "../lib/getOneYearDateList";
import { AppException } from "../lib/AppException";

type GraphData = {
  labels: Array<Array<string>>;
  datasets: Array<{
    data: Array<number>;
    label: string;
    borderColor: string;
  }>;
};

export type GraphMaterial = {
  graphData: { [key: string]: GraphData };
  options: {
    responsive: boolean;
    maintainAspectRatio: boolean;
  };
  thisMonth: string;
};

type ExecuteOut = GraphMaterial;
type FlattenIn = Array<GithubContributePerDayList>;
type FlattenOut = GithubContributePerDayList;

export class HomeController {
  static async execute(): Promise<ExecuteOut> {
    const contributions = await getGitHubContributions();
    const flattenedContributionsList = _flatten(contributions);
    const nowDate = Date.now();
    const oneYearDateList = getOneYearDateList(nowDate);
    const monthlyContributionsList = oneYearDateList.map((month) => {
      return flattenedContributionsList.filter((contributionsList) => {
        return contributionsList.date.includes(month);
      });
    });
    if (monthlyContributionsList.length !== 12) {
      throw new AppException(
        monthlyContributionsList.length,
        "１２ヶ月分の配列が必要です。"
      );
    }
    const graphData = monthlyContributionsList.map((month) => {
      const data = {
        labels: month.map((day) => {
          return [day.date];
        }),
        datasets: [
          {
            data: month.map((day) => {
              return day.contributionCount;
            }),
            label: "contribution count",
            borderColor: "rgb(234,229,89)",
          },
        ],
      };
      return data;
    });

    const graphDataBox = {} as { [key: string]: GraphData };
    for (let i = 0; i < 12; i++) {
      graphDataBox[oneYearDateList[i]] = graphData[i];
    }
    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const thisMonth = Object.keys(graphDataBox)[0];

    return {
      graphData: graphDataBox,
      options: options,
      thisMonth: thisMonth,
    };
  }
}

function _flatten(contributions: FlattenIn): FlattenOut {
  return contributions.flat();
}

import { AppException } from "../lib/AppException";

export type GithubContributePerDayList = Array<{
  date: string;
  contributionCount: number;
}>;
export type GithubUserData = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
            }>;
          }>;
        };
      };
    };
  };
};

type GetGitHubContributionsOut = Array<GithubContributePerDayList>;

const TOKEN = process.env.GITHUB_TOKEN;
if (!TOKEN) {
  throw new AppException("TOKEN", "環境変数が入っていません");
}

export const getGitHubContributions =
  async (): Promise<GetGitHubContributionsOut> => {
    const query = `
{
    user(login: "YamashitaJunki") {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;
    const url = "https://api.github.com/graphql";
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + `${TOKEN}`,
      },
      body: JSON.stringify({
        query: query,
      }),
    };

    const res = await fetch(url, options);
    if (!res) {
      throw new AppException(res, "fetchの結果が空です");
    }
    if (res.status !== 200) {
      throw new AppException(res.status, "fetchに失敗しました");
    }
    const json = (await res.json()) as GithubUserData;
    const weeks =
      json.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
    if (!weeks) {
      throw new AppException(
        JSON.stringify(json),
        "コントリビューションの一覧は必須です。"
      );
    }
    if (!Array.isArray(weeks)) {
      throw new AppException(JSON.stringify(weeks), "配列が入っていません。");
    }
    if (weeks.length < 0) {
      throw new AppException(
        Number(weeks.length),
        "配列は1つ以上要素を入れてください。"
      );
    }

    const contributionWeeksList = weeks.map((contributionweeks) => {
      const contributionDays = contributionweeks.contributionDays.map(
        (contribution) => {
          return {
            date: contribution.date,
            contributionCount: contribution.contributionCount,
          };
        }
      );
      return contributionDays;
    });

    return contributionWeeksList;
  };

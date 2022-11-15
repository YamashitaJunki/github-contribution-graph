# github-contribution-graph

過去１年間の GitHub コントリビューション数が閲覧できるグラフページを作成しました。  
ドロップダウンで選択した月の、private/public を合わせたコントリビューション数を日にちごとに表示します。  
自分のポートフォリオにコンポーネントとして組み込む等、ぜひご利用ください。

# Deploy

https://feature-1.dno0zco63j2qx.amplifyapp.com/

# DEMO

![](https://user-images.githubusercontent.com/95216275/201852835-11c1bbd7-cd90-4473-92d7-f3094c2e5ffa.gif)
ドロップダウンの閲覧したい月をクリックすると  
その月のコントリビューション数遷移グラフが表示されます。

# グラフ作成に使用したライブラリ

- [chart.js@3.8.0](https://www.chartjs.org/)

# API

- コントリビューションのデータ取得元
  - [GraphQL API - GitHub Docs](https://docs.github.com/en/graphql)

# 技術

- Next.js
- Typescript

# 環境

- 動作確認済環境
  - node : v18.8.0
- Google Chrome 最新版、PC/スマートフォン表示で正しく表示確認済み

# 環境構築の手順

## ① ローカルで以下のコマンドにてリポジトリをクローンします

```
git clone git@github.com:YamashitaJunki/github-contribution-graph.git
```

## ② 以下コマンドでコンテナを作成します

```
docker compose up -d
```

## ③ Github のアクセストークンを取得します

[personal access token 取得ページ](https://github.com/settings/tokens/new)

1. Note に任意のトークン名を入力
2. Expiration で任意のトークン期限を選択
3. Select scopes を選択
4. Generate token を押下し、表示される API キーをコピーする

## ④`.env`のファイルを作成し、以下のように登録します。

```
GITHUB_TOKEN = ***********
```

## ④ コンテナ内にて以下コマンドを実行します

```
yarn run dev
```

# 各種設定ファイルの解説

- .eslintrc

  - 目的
    - eslint のルールを自動的に強制するため
  - 参考情報
    - https://eslint.org/docs/latest/user-guide/configuring/
  - 参考経緯
    - 公式の正しい書き方を確認する為

- dockerfile
  - 目的
    - ローカル環境だけではなく、仮想環境でも正しく動くことを確認できるように docker を導入するため
  - 参考情報
    - https://docs.docker.jp/engine/reference/builder.html
  - 参考経緯
    - 公式の正しい書き方を確認する為
  - OS
    - alpine(v3.15)
- docker-compose.yml
  - 目的
    - 今後開発にあたりコンテナ数が増える可能性があるため
  - 参考情報
    - https://docs.docker.com/compose/compose-file/
  - 参考経緯
    - 公式の正しい書き方を確認する為
  - port
    - 3000:3000 →DockerImage を立ち上げるポート
    - 9229:9229 → デバッグ用のポート
- prettier.json
  - 目的
    - eslint のルールを自動的に強制するため
  - 参考情報
    - https://prettier.io/docs/en/options.html
  - 参考経緯
    - 公式の正しい書き方を確認する為
- tsconfig.json
  - 目的
    - 型を宣言して未然にエラーを防ぐため typescript を導入
  - 参考情報
    - https://zenn.dev/toono_f/scraps/b9b8b5f7fb1c57
  - 参考経緯
    - オリジナルの最適設定を考える力が無い為

以上

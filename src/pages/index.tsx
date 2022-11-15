import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Line } from "react-chartjs-2";
import React, { useState } from "react";
import { ContributionsDateDropdown } from "../components/ContributionsDateDropdown";
import Chart from "chart.js/auto";
import { HomeController, GraphMaterial } from "../lib/HomeController";
import { GetServerSideProps } from "next";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);
type HomeIn = {
  contributions: GraphMaterial;
};
type HomeOut = JSX.Element;
type GetServerSidePropsOut = {
  props: {
    contributions: GraphMaterial;
  };
};

const Home = ({ contributions }: HomeIn): HomeOut => {
  const [month, setMonth] = useState(contributions.thisMonth);
  return (
    <div className={styles.container}>
      <Head>
        <title>GitHub&nbsp;contribution</title>
      </Head>
      <main className={styles.main}>
        <h1>GitHub&nbsp;Contribution&nbsp;Graph</h1>
        <ContributionsDateDropdown
          setMonth={setMonth}
        ></ContributionsDateDropdown>
        <div className="graph">
          <Line
            data={contributions.graphData[month]}
            options={contributions.options}
          />
        </div>
      </main>
    </div>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps =
  async (): Promise<GetServerSidePropsOut> => {
    const contributions = await HomeController.execute();
    return {
      props: {
        contributions: contributions,
      },
    };
  };

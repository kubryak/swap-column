import React from "react";
import Table from "../components/Table";
import styles from "./page.module.css";

const IndexPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>TABLE</h1>
      <p>Для того, чтобы поменять местами столбцы, необходимо по очереди нажать на заголовки двух столбцов</p>
      <Table />
    </div>
  );
};

export default IndexPage;

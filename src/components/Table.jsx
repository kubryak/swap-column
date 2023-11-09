"use client";

import { useState } from "react";
import styles from "./Table.module.css";

const numberOfRows = 40;
const numberOfColumns = 15;
const itemsPerPage = 10;

const initialData = Array.from({ length: numberOfRows }, (_, rowIndex) =>
  Array.from(
    { length: numberOfColumns },
    (_, columnIndex) => rowIndex * numberOfColumns + columnIndex + 1
  )
);

export default function Table() {
  const columnHeaders = Array.from({ length: 15 }, (_, index) =>
    String.fromCharCode(65 + index)
  );

  const [data, setData] = useState(initialData);
  const [headersData, setHeadersData] = useState(columnHeaders);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = initialData.slice(startIndex, endIndex);

  const handleColumnClick = (columnIndex) => {
    if (selectedColumn === null) {
      setSelectedColumn(columnIndex);
    } else {
      swapColumns(selectedColumn, columnIndex);
      setSelectedColumn(null);
    }
  };

  const swapColumns = (columnIndex1, columnIndex2) => {
    const newTableData = data.map((row) => {
      const tempIndex = row[columnIndex1];
      row[columnIndex1] = row[columnIndex2];
      row[columnIndex2] = tempIndex;
      return row;
    });

    const newHeadersData = [...headersData];
    const tempHeader = newHeadersData[columnIndex1];
    newHeadersData[columnIndex1] = newHeadersData[columnIndex2];
    newHeadersData[columnIndex2] = tempHeader;

    setData(newTableData);
    setHeadersData(newHeadersData);
  };

  const totalPages = Math.ceil(initialData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.main}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headersData.map((header, index) => (
              <th
                className={styles.table_heading}
                key={index}
                onClick={() => handleColumnClick(index)}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={
                    cellIndex === selectedColumn
                      ? `${styles.table_row_active} ${styles.table_row}`
                      : `${styles.table_row}`
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pages}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            className={styles.page}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

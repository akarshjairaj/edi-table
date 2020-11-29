import React from "react";
import "./Table.css";

export default function Table({ data, setData, originalData, colNames }) {

  const handleChange = (e, id, colName) => {
    let newValue = e.target.value;
    let oldValue = originalData.filter((obj) => obj.id === id)[0][colName];
    let updFlag = newValue !== oldValue;
    let updData = data.map((obj) =>
      obj.id !== id
        ? {
            ...obj,
          }
        : {
            ...obj,
            [colName]: newValue,
            edited: updFlag
              ? [...obj.edited, colName]
              : [...obj.edited].filter((name) => name !== colName),
          }
    );
    setData(updData);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.target.blur();
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {colNames.map((colName, index) => (
            <th key={index}>{colName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {colNames.map((colName, index) => (
              <td key={index}>
                <input
                  type="text"
                  className={`${row.edited.includes(colName) ? "edited" : ""}`}
                  value={row[colName]}
                  onKeyUp={handleKeyUp}
                  onChange={(e) => handleChange(e, row.id, colName)}
                ></input>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [originalData, setOriginalData] = useState(null);
  const [data, setData] = useState(null);
  console.log("DATA", data);

  let colNames = ["gender", "email"];
  let filteredData;
  if (data) {
    filteredData = data.map((obj) => {
      let filteredObj = {};
      colNames.forEach((colName) => {
        filteredObj[colName] = obj[colName];
      });
      return filteredObj;
    });
  }
  let jsonString = JSON.stringify(filteredData, null, 2);
  console.log(jsonString);

  let url = "https://randomuser.me/api/?results=5";
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log("JSON", json);
        let newData = json.results.map((obj) => ({
          ...obj,
          id: uuidv4(),
          edited: [],
          keepFlag: false,
        }));
        setData(newData);
        setOriginalData(newData);
      });
  }, []);

  return (
    <main className="App">
      <h1 className="title">Edi-Table</h1>
      {data ? (
        <section>
          <Table
            colNames={colNames}
            data={data}
            setData={setData}
            originalData={originalData}
          />
          <code>
            <textarea value={jsonString} className='json-viewer'></textarea>
          </code>
        </section>
      ) : (
        <p className="fetching-title">Fetching data...</p>
      )}
    </main>
  );
}

export default App;

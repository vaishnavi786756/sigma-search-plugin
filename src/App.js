import React, { useState } from "react";
import {
  client,
  useConfig,
  useElementData,
} from "@sigmacomputing/plugin";

client.config.configureEditorPanel([
  {
    name: "source",
    type: "element",
  },
]);

function App() {
  const config = useConfig();
  const data = useElementData(config.source);

  const [search, setSearch] = useState("");

  // Get all columns
  const columns = Object.keys(data || {});

  // Total rows count
  const rowCount =
    columns.length > 0
      ? data[columns[0]].length
      : 0;

  // Build row objects
  const rows = [];

  for (let i = 0; i < rowCount; i++) {
    const row = {};

    columns.forEach((col) => {
      row[col] = data[col][i];
    });

    rows.push(row);
  }

  // Search across all columns
  const filteredRows = rows.filter((row) =>
    columns.some((col) =>
      String(row[col])
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Sigma Global Search Plugin</h2>

      <input
        type="text"
        placeholder="Search any column..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "350px",
          marginBottom: "20px",
        }}
      />

      <div>
        {filteredRows.length > 0 ? (
          filteredRows.map((row, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              {columns.map((col) => (
                <div key={col}>
                  <b>{col}:</b> {String(row[col])}
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No matching results</p>
        )}
      </div>
    </div>
  );
}

export default App;
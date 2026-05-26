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

  // Sigma source data
  const data = useElementData(config.source);

  const [search, setSearch] = useState("");

  // Get all columns safely
  const columns = Object.keys(data || {});

  // Get row count safely
  const rowCount =
    columns.length > 0
      ? data[columns[0]].length
      : 0;

  // Build rows
  const rows = [];

  for (let i = 0; i < rowCount; i++) {
    const row = {};

    columns.forEach((col) => {
      row[col] = data[col][i];
    });

    rows.push(row);
  }

  // Global search across all columns
 const filteredRows = rows.filter((row) =>
  columns.some((col) =>
    String(row[col] ?? "")
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
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <pre>
  {JSON.stringify(data, null, 2)}
</pre>

      {filteredRows.length > 0 ? (
        filteredRows.map((row, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
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
) : search ? (
  <p>No matching results</p>
) : null}
    </div>
  );
}

export default App;
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

  // Real Sigma data
  const data = useElementData(config.source);

  const [search, setSearch] = useState("");

  // Handle empty data safely
  const columns = Object.keys(data || {});

  if (columns.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Sigma Global Search Plugin</h2>
        <p>Please select a source table in Sigma.</p>
      </div>
    );
  }

  const rowCount = data[columns[0]].length;

  const rows = [];

  // Build rows
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

      <p>
        <b>Total Rows:</b> {rows.length}
      </p>

      <div>
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
        ) : (
          <p>No matching results</p>
        )}
      </div>
    </div>
  );
}

export default App;
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

  // 🔵 CONFIG DEBUG
  console.log("🔵 CONFIG FULL:", config);
  console.log("🔵 SOURCE ELEMENT:", config?.source);
  console.log("🔵 SOURCE TYPE:", typeof config?.source);

    console.log("SIGMA WINDOW CHECK:", window.__SIGMA__);

  const data = useElementData(config.source);

  // 🟢 DATA DEBUG
  console.log("🟢 RAW SIGMA DATA:", data);
  console.log("🟢 DATA TYPE:", typeof data);
  console.log(
    "🟢 IS EMPTY:",
    data && Object.keys(data || {}).length === 0
  );

  const [search, setSearch] = useState("");

  // 🟡 COLUMN DEBUG
  console.log("🟡 DATA BEFORE COLUMN PARSING:", data);

  const columns =
    data && typeof data === "object"
      ? Object.keys(data)
      : [];

  console.log("🟡 COLUMNS:", columns);

  // 🔴 ROW COUNT SAFE CHECK
  const rowCount =
    columns.length > 0 && data?.[columns[0]]
      ? data[columns[0]].length
      : 0;

  console.log("🔴 ROW COUNT:", rowCount);

  // 🟣 ROW BUILD DEBUG
  console.log("🟣 ROW BUILD START");

  const rows = [];

  for (let i = 0; i < rowCount; i++) {
    const row = {};

    columns.forEach((col) => {
      row[col] = data?.[col]?.[i] ?? null;
    });

    if (i < 3) {
      console.log("🟣 SAMPLE ROW:", row);
    }

    rows.push(row);
  }

  console.log("🟣 TOTAL ROWS:", rows.length);

  // 🔍 SEARCH DEBUG
  console.log("🔴 SEARCH VALUE:", search);

  const filteredRows = rows.filter((row) =>
    columns.some((col) =>
      String(row[col] ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  console.log("🔴 FILTERED ROWS:", filteredRows.length);

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

      {/* 🔥 DEBUG PANEL (MOST IMPORTANT) */}
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: "10px",
          maxHeight: "300px",
          overflow: "auto",
        }}
      >
        {JSON.stringify(
          {
            config,
            data,
            columns,
            rowCount,
            totalRows: rows.length,
          },
          null,
          2
        )}
      </pre>

      {/* DATA RENDER */}
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
      ) : (
        <p>Loading or no data available</p>
      )}
    </div>
  );
}

export default App;
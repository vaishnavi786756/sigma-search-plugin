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

  // Get first column
  const firstColumn = Object.keys(data || {})[0];

  // Filter rows based on search
  const filteredRows =
    data && firstColumn
      ? data[firstColumn]
          .map((value, index) => ({
            value,
            index,
          }))
          .filter((row) =>
            String(row.value)
              .toLowerCase()
              .includes(search.toLowerCase())
          )
      : [];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Sigma Search Plugin</h2>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

      <div>
        {filteredRows.map((row) => (
          <div
            key={row.index}
            style={{
              padding: "8px",
              borderBottom: "1px solid #ddd",
            }}
          >
            {row.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
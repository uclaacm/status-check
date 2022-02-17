import React, { useState } from "react";
import "../styles/App.css";
import { PageInfo } from "../siteContent";
import Filter from "./Filter";
import Results from "./Results";

function App() {
  const [filteredSites, setFilteredSites] = useState<[string, PageInfo[]][]>([]);
  return (
    <div className="App">
      <h1>Status Check</h1>
      <h2>Check The Status of ACM's Projects/Tools</h2>
      <Filter onChange={(e) => setFilteredSites(e)} />
      <Results sites={filteredSites} />
    </div>
  );
}

export default App;

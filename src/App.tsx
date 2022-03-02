import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { PageInfo } from "./siteContent";
import Filter from "./components/Filter";
import Results from "./components/Results";

function App() {
  const [filteredSites, setFilteredSites] = useState<[string, string[]][]>([
    ["topic", ["url1", "url2"]],
  ]);
  const [repos, setRepos] = useState({ subject: ["url"] });

  const getRepos = async () => {
    const response = await fetch("/repos");
    const data = await response.json();
    setRepos(data);
    return;
  };

  useEffect(() => {
    getRepos();
  }, []);

  useEffect(() => {
    const list = Object.entries(repos);
    setFilteredSites(list);
  }, [repos]);

  return (
    <div className="App">
      <h1>Status Check</h1>
      <h2>Check The Status of ACM's Projects/Tools</h2>
      {/* <Filter onChange={(e) => setFilteredSites(e)} /> */}
      <Results repoList={filteredSites} />
    </div>
  );
}

export default App;

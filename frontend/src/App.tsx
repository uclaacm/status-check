import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Results from "./components/Results";

type repoListStructure = [string, string[]][];

function App() {
  const [filteredSites, setFilteredSites] = useState<repoListStructure>([
    ["topic", ["url1", "url2"]],
  ]);
  const [repos, setRepos] = useState({ subject: ["url"] });

  const getRepos = async () => {
    const response = await fetch(
      "https://acm-status-check.herokuapp.com/repos"
    );
    const data = await response.json();
    setRepos(data);
    if (data === null || data === {}) {
      return;
    }
  };

  useEffect(() => {
    getRepos();
  }, []);

  useEffect(() => {
    const list = Object.entries(repos);
    setFilteredSites(list);
  }, [repos]);

  //sort your state data here
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

import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Results from "./components/Results";
// import { convertCompilerOptionsFromJson } from "typescript";

type repoListStructure = [string, string[]][];

function App() {
  const [filteredSites, setFilteredSites] = useState<repoListStructure>([
    ["topic", ["url1", "url2"]],
  ]);
  const [repos, setRepos] = useState({ subject: ["url"] });

  const getRepos = async () => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/repos");
    const data = await response.json();
    setRepos(data);
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
      <h1 id="title">ACM Status Checker</h1>
      {/* <Filter onChange={(e) => setFilteredSites(e)} /> */}
      <Results repoList={filteredSites} />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Results, { LinkObject } from "./components/Results";

function App() {
  const [filteredSites, setFilteredSites] = useState<LinkObject[]>([]);
  const [repos, setRepos] = useState({ subject: [] });

  const getRepos = async () => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/repos");
    const data = await response.json();
    setRepos(data);
  };

  useEffect(() => {
    getRepos();
  }, []);

  useEffect(() => {
    const dataList = Object.entries(repos); // [committee,urls[]][]
    console.log(dataList)
    let objectList:LinkObject[] = [];
    dataList.forEach((topic) => {
      const [committee, ...urls] = topic;
      urls[0].forEach((link,index) => {
        const currentObject:LinkObject = {
          url:link,
          committee:committee
        };
        objectList.push(currentObject)

      });
    });
    setFilteredSites(objectList);
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

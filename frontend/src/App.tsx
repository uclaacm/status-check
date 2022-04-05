import React, { useState, useEffect } from "react";
import "./styles/App.css";
import LinkModule from "./components/LinkModule";
import Results, { LinkObject } from "./components/Results";

function App() {
  const [filteredSites, setFilteredSites] = useState<LinkObject[]>([]);
  const [repos, setRepos] = useState({ subject: ["url"] });

  const getRepos = async () => {
    const response = await fetch(
      "https://acm-status-check.herokuapp.com/repos"
    );
    const data = await response.json();
    setRepos(data);
    return;
  };

  useEffect(() => {
    getRepos();
  }, []);

  useEffect(() => {
    const dataList = Object.entries(repos); // [committee,urls[]][]
    let objectList:LinkObject[] = [];
    dataList.forEach((topic) => {
      const [committee, ...urls] = topic;
      urls[0].forEach((link,index) => {
        const currentObject:LinkObject = {
          url:link,
          component: <LinkModule
            committee={committee}
            url={link}
            key={committee+index}
            description={"TBD"}
          />,
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

import React, { useState } from "react";
import "./App.css";
import { sites } from "./siteContent";
import LinkModule from "./components/LinkModule";

function App() {
  const committees = Object.keys(sites).map((site) => (
    <button key={site}>{site}</button>
  ));
  const [displayedCommittees, setDisplayedCommittees] = useState(committees);
  const siteCheck = Object.entries(sites).map((site) => {
    const [initiative, siteInfo] = site;
    const initiativeSites = siteInfo.map((checkSite) => (
      <LinkModule
        url={checkSite.url}
        key={checkSite.url}
        description={checkSite.description}
      />
    ));
    return (
      <div key={initiative}>
        {initiative}
        <div>{initiativeSites}</div>
      </div>
    );
  });
  return (
    <div className="App">
      <h1>Status Check</h1>
      <p>Filter By: {committees}</p>
      <div>{siteCheck}</div>
    </div>
  );
}

export default App;

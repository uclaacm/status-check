import React, { useState } from "react";
import "./App.css";
import { sites, defaultCommitteeHash, Committees } from "./siteContent";
import LinkModule, { committeeLogos } from "./components/LinkModule";
import CommitteeButton from "./components/CommitteeButton";

function App() {
  const [displayedCommittees, setDisplayedCommittees] =
    useState(defaultCommitteeHash);
  //make a list of committee buttons
  const committees = Object.keys(sites).map((site) => (
    <CommitteeButton
      key={site}
      onClick={() =>
        setDisplayedCommittees({
          ...displayedCommittees,
          //@ts-ignore
          [site]: !displayedCommittees[site],
        })
      }
      //@ts-ignore
      on={displayedCommittees[site]}
      //@ts-ignore
      imgSrc={committeeLogos[site]}
      site={site}
    />
  ));
  const siteCheck = Object.entries(sites)
    .filter((site) => {
      const initiative = site[0];
      //only return the sites if they are currently being filtered
      //@ts-ignore
      return displayedCommittees[initiative];
    })
    .map((site) => {
      const [initiative, siteInfo] = site;
      const initiativeSites = siteInfo.map((checkSite) => (
        <LinkModule
          committee={initiative}
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
      <h2>Check The Status of ACM's Projects/Tools</h2>
      <p>
        Filter By:
        <div className="button-list">{committees}</div>
      </p>
      <button
        onClick={() => {
          setDisplayedCommittees(defaultCommitteeHash);
        }}
      >
        Reset All
      </button>
      <div className="site-container">{siteCheck}</div>
    </div>
  );
}

export default App;

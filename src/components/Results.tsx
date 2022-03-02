import { PageInfo } from "../siteContent";
import LinkModule from "./LinkModule";
import "../styles/results.css";
import { useEffect, useState } from "react";
import { textSpanIntersectsWithPosition } from "typescript";

interface ResultsProps {
  sites: [string, PageInfo[]][];
}

export default function Results(props: ResultsProps) {
  const [repos, setRepos] = useState({ topic: [] });

  const getRepos = async () => {
    const response = await fetch("/repos");
    const data = await response.json();
    setRepos(data);
    return;
  };

  useEffect(() => {
    getRepos();
  }, []);

  console.log(repos);

//   const list = Object.keys(repos).map((topic) => {
//     const websites = repos.topic.map((link) => (
//       <LinkModule committee={topic} url={link} key={link} description={"TBD"} />
//     ));
//     return <div key={topic}>{websites}</div>;
//   });

  const links = props.sites.map((site) => {
    const [initiative, siteInfo] = site;
    const initiativeSites = siteInfo.map((checkSite) => (
      <LinkModule
        committee={initiative}
        url={checkSite.url}
        key={checkSite.url}
        description={checkSite.description}
      />
    ));
    return <div key={initiative}>{initiativeSites}</div>;
  });

  return <div id="results">{links}</div>;
}

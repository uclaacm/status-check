import { PageInfo } from "../siteContent";
import LinkModule from "./LinkModule";
import "../styles/results.css";
import { useEffect, useState } from "react";
import { url } from "inspector";

interface ResultsProps {
  sites: [string, PageInfo[]][];
}

export default function Results(props: ResultsProps) {
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

  const list = Object.entries(repos).map((topic) => {
    const [committee, ...urls] = topic;
    const websites = urls[0].map((link) => (
      <LinkModule
        committee={committee}
        url={link}
        key={link}
        description={"TBD"}
      />
    ));
    return <div key={committee}>{websites}</div>;
  });

  return <div id="results">{list}</div>;
}

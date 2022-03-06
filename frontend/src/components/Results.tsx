import { PageInfo } from "../siteContent";
import LinkModule from "./LinkModule";
import "../styles/results.css";
import { useEffect, useState } from "react";
import { url } from "inspector";

interface ResultsProps {
  repoList: [string, string[]][];
}

export default function Results(props: ResultsProps) {
  const list = props.repoList.map((topic) => {
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

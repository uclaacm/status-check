import LinkModule from "./LinkModule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "../styles/results.css";
import { useState } from "react";

type repoListStructure = [string, string[]][];

interface ResultsProps {
  repoList: repoListStructure;
}

enum Sort {
  Site = "site",
  Committee = "committee",
  Status = "status",
}

export default function Results(props: ResultsProps) {
  const [currentSort, setCurrentSort] = useState(Sort.Site);
  const [sortDown, setSortDown] = useState(true);

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

  return (
    <div id="results">
      <div id="labelsContainer">
        <div></div>
        {[Sort.Site, Sort.Committee, Sort.Status].map((sort) => (
          <button
            className="label"
            onClick={() => {
              if (currentSort === sort) setSortDown((sortDown) => !sortDown);
              else {
                setSortDown(true);
                setCurrentSort(sort);
              }
            }}
          >
            {sort}
            {currentSort === sort && (
              <FontAwesomeIcon
                className="arrow"
                icon={sortDown ? faArrowDown : faArrowUp}
              />
            )}
          </button>
        ))}
      </div>

      {list}
    </div>
  );
}

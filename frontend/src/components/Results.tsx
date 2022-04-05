import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "../styles/results.css";
import { useEffect, useState } from "react";

interface ResultsProps {
  repoList: LinkObject[];
}

export interface LinkObject {
  component: JSX.Element,
  url: String,
  committee: String
}

enum Sort {
  Site = "site",
  Committee = "committee",
  Status = "status",
}

export default function Results(props: ResultsProps) {
  const [currentSort, setCurrentSort] = useState(Sort.Site);
  const [sortDown, setSortDown] = useState(true);
  const [currentLinks,setCurrentLinks] = useState<JSX.Element[]>([]);
  useEffect(() => {
    switch (currentSort) {
      case Sort.Committee:
        props.repoList.sort((a,b) => {
          if (a.committee < b.committee) return -1;
          if (a.committee > b.committee) return 1;
          return 0;
        });
        break;
      case Sort.Site:
        props.repoList.sort((a,b) => {
          if (a.url < b.url) return -1;
          if (a.url > b.url) return 1;
          return 0;
        });
        break;
      case Sort.Status:
        
    }
    if (!sortDown) props.repoList.reverse();
    setCurrentLinks(props.repoList.map(current => current.component))
  },[currentSort,sortDown,props.repoList])
  return (
    <div id="results">
      <div id="labelsContainer">
        <div></div>
        {[Sort.Site, Sort.Committee, Sort.Status].map((sort) => (
          <button
            key={sort}
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
      {currentLinks}
    </div>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import LinkModule from "./LinkModule";
import "../styles/results.css";
import { useEffect, useState } from "react";

interface ResultsProps {
  repoList: LinkObject[];
}

export interface LinkObject {
  component?: JSX.Element,
  url: string,
  committee: string,
  status?: number
}

enum Sort {
  Site = "site",
  Committee = "committee",
  Status = "status",
}

export default function Results(props: ResultsProps) {
  const [currentSort, setCurrentSort] = useState(Sort.Site);
  const [sortDown, setSortDown] = useState(true);
  const [currentLinks, setCurrentLinks] = useState<JSX.Element[]>([]);

  //Assign LinkModule component for each linkObject
  props.repoList.forEach((element, index) => {
    props.repoList[index].component = <LinkModule
      committee={element.committee}
      url={element.url}
      key={index}
      description={"TBD"}
      onStatusChange={(status) => {
        props.repoList[index].status = status;
        sortLinks();
      }
      }
    />
  })

  const sortLinks = () => {
    let newList;
    //Sort props.repoList w/o actually mutating props.repolist
    switch (currentSort) {
      case Sort.Committee:
        newList = [...props.repoList].sort((a, b) => {
          if (a.committee < b.committee) return -1;
          if (a.committee > b.committee) return 1;
          return 0;
        });
        break;
      case Sort.Site:
        newList = [...props.repoList].sort((a, b) => {
          if (a.url < b.url) return -1;
          if (a.url > b.url) return 1;
          return 0;
        });
        break;
      case Sort.Status:
        newList = [...props.repoList].sort((a, b) => {
          if (a.status === undefined && b.status === undefined) return 0;
          if (a.status === undefined && b.status !== undefined) return -1;
          if (a.status !== undefined && b.status === undefined) return 1;
          return a.status! - b.status!;
        });
    }
    if (!sortDown) newList.reverse();
    setCurrentLinks(newList.map(current => current.component!))
  }

  useEffect(sortLinks, [currentSort, sortDown,props])


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

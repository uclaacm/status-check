import { PageInfo } from '../siteContent';
import LinkModule from './LinkModule'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import "../styles/results.css"
import { useState } from 'react';

interface ResultsProps {
    sites: [string, PageInfo[]][];
}

enum Sort {
    Site = "site",
    Committee = "committee",
    Status = "status"
}

export default function Results(props: ResultsProps) {
    const [currentSort, setCurrentSort] = useState(Sort.Site);
    const [sortDown, setSortDown] = useState(true);

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
        return (
            <div key={initiative}>{initiativeSites}</div>
        );
    })
    return (
        <div id="results">
            <div id="labelsContainer">
                <div></div>
                {[Sort.Site, Sort.Committee, Sort.Status].map((sort) => (
                    <button 
                        className='label' 
                        onClick={() => {
                            if (currentSort === sort)
                                setSortDown(sortDown => !sortDown);
                            else {
                                setSortDown(true);
                                setCurrentSort(sort);
                            }
                        }}
                    >
                        {sort}
                        {currentSort === sort &&
                            <FontAwesomeIcon
                                className='arrow'
                                icon={sortDown ? faArrowDown : faArrowUp}
                            />
                        }
                    </button>
                ))}
            </div>
            {links}
        </div >
    )
}
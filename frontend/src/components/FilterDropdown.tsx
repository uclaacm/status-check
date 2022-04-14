import { useState, useEffect } from 'react';
import CommitteeButton from './CommitteeButton';
import { committeeLogos } from './LinkModule';
import {
  sites,
  defaultCommitteeHash,
  CommitteeHashType,
  CommitteeDict,
  PageInfo,
} from '../siteContent';

interface FilterDropdownProps {
  onChange: (links: [string, PageInfo[]][]) => void;
}

export default function FilterDropdown(props: FilterDropdownProps) {
  //make a list of committee buttons
  const [displayedCommittees, setDisplayedCommittees] =
    useState(defaultCommitteeHash);
  const committees = Object.keys(sites).map((site) => (
    <CommitteeButton
      key={site}
      onClick={() => {
        setDisplayedCommittees({
          ...displayedCommittees,
          [site]: !displayedCommittees[site as keyof CommitteeHashType],
        });
      }}
      on={displayedCommittees[site as keyof CommitteeHashType]}
      imgSrc={committeeLogos[site as keyof CommitteeDict]}
      site={site}
    />
  ));
  useEffect(() => {
    //SiteCheck holds all filtered sites
    const siteCheck = Object.entries(sites).filter((site) => {
      const initiative = site[0];
      //only return the sites if they are currently being filtered
      return displayedCommittees[initiative as keyof CommitteeHashType];
    });
    props.onChange(siteCheck);
  }, [displayedCommittees, props]);

  return (
    <div>
      <p>
        <div className="button-list">{committees}</div>
      </p>
      <button
        onClick={() => {
          setDisplayedCommittees(defaultCommitteeHash);
        }}
      >
        Reset All
      </button>
    </div>
  );
}

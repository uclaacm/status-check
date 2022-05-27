import React, { useState, useEffect } from "react";
import { CommitteeDict } from "../siteContent";
import aiLogo from "../logos/logo-ai.svg";
import cyberLogo from "../logos/logo-cyber.svg";
import designLogo from "../logos/logo-design.svg";
import hackLogo from "../logos/logo-hack.svg";
import icpcLogo from "../logos/logo-icpc.svg";
import jediLogo from "../logos/logo-jedi.svg";
import studioLogo from "../logos/logo-studio.svg";
import teachlaLogo from "../logos/logo-teachla.svg";
import wLogo from "../logos/logo-w.svg";
import internalLogo from "../logos/logo-internal.svg";
import "../styles/linkModule.css";
interface LinkModuleProps {
  url: string;
  description: string;
  committee: string;
  onStatusChange: (status:number) => void
}

export const committeeLogos = {
  AI: aiLogo,
  Cyber: cyberLogo,
  Design: designLogo,
  Hack: hackLogo,
  ICPC: icpcLogo,
  Internal: internalLogo,
  JEDI: jediLogo,
  Studio: studioLogo,
  TeachLA: teachlaLogo,
  W: wLogo,
  Impact: internalLogo,
  "no-topic": aiLogo,
};

export default function LinkModule(props: LinkModuleProps) {
  const [siteStatus, setSiteStatus] = useState<number | null>(null);
  const {url, description, committee, onStatusChange} = props;
 
  useEffect(() => {
    const checkStatus = async () => {
      const status = await getSiteStatus(url);
      setSiteStatus(status);
      onStatusChange(status);
    };
    checkStatus();
  // eslint-disable-next-line
  }, [url]); //warns that onStatusChange is a dependency
  return (
    <div className="link-card">
      <img
        src={committeeLogos[committee as keyof CommitteeDict]}
        className="logo"
        alt = "logo"
      />
      <div className="link">
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="link-title"
        >
          {url}
        </a>
        {false ? <p> {description}</p> : null /* def not good coding practice sry :|*/} 
      </div>
      <p className="committee">{committee}</p>
      <p
        className={
          siteStatus && siteStatus >= 200 && siteStatus < 300
            ? "success"
            : "fail"
        }
      >
        {siteStatus}{" "}
      </p>
    </div>
  );
}

const getSiteStatus = async (url: string) => {
  const siteRes = await fetch(
    process.env.REACT_APP_BACKEND_URL + "/proxy/" + url
  );
  return siteRes.status;
};

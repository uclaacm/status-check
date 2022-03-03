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
}

export const committeeLogos: CommitteeDict = {
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
};

export default function LinkModule(props: LinkModuleProps) {
  const [siteStatus, setSiteStatus] = useState<number | null>(null);
  useEffect(() => {
    const checkStatus = async () => {
      const status = await getSiteStatus(props.url);
      setSiteStatus(status);
    };
    checkStatus();
  }, [props.url]);
  return (
    <div className="link-card">
      <img
        src={committeeLogos[props.committee as keyof CommitteeDict]}
        alt={`logo of ${props.committee}`}
        className="logo"
      />
      <div>
        <a href={props.url} target="_blank" rel="noreferrer noopener">
          {props.url}
        </a>
        <div> {props.description}</div>
        <div>Status: {siteStatus} </div>
      </div>
    </div>
  );
}
// append the heroku backend link to the fetch

const getSiteStatus = async (url: string) => {
  const siteRes = await fetch("/proxy/" + url);
  return siteRes.status;
};

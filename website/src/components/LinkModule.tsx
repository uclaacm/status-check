import React, { useState, useEffect } from "react";
const SERVER_URL =
  process.env.NEXT_PUBLIC_CORS_SERVER || "http://localhost:8080";
interface LinkModuleProps {
  url: string;
  description: string;
}

export default function LinkModule(props: LinkModuleProps) {
  const [siteStatus, setSiteStatus] = useState<number | null>(null);
  useEffect(() => {
    const checkStatus = async () => {
      const status = await getSiteStatus(props.url);
      setSiteStatus(status);
    };
    checkStatus();
  }, []);

  return (
    <div>
      <div> {props.description}</div>
      <div>{props.url}</div>
      <div>The Site's Status is: {siteStatus} </div>
    </div>
  );
}

const getSiteStatus = async (url: string) => {
  const siteRes = await fetch("/proxy/" + url);
  return siteRes.status;
};

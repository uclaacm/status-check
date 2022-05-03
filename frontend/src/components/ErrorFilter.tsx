import React, { useEffect, useState } from "react";
import { sites } from "../siteContent";

interface Status {
  status: string;
  value: number;
}

const ErrorFilter = () => {
  const [allStatus, setAllStatus] = useState();

  useEffect(() => {
    const getAllSitesStatus = async () => {
      const urlList = Object.entries(sites).map(([, pageInfo]) =>
        pageInfo.map((p) => p.url)
      );
      // Collect urls into one Array
      const urls = ([] as any).concat.apply([], urlList);

      // append the heroku backend link to the fetch
      const getSiteStatus = async (url: string) => {
        const siteRes = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/proxy/" + url
        );
        return siteRes.status;
      };

      const statusPriomises = [];

      // Dispatch All Health Checks at once
      for (let url of urls) {
        statusPriomises.push({ url: getSiteStatus(url) });
      }
      const status = await Promise.allSettled(
        statusPriomises.map((site) => site.url)
      );
      const errorSites = [];

      for (let i = 0; i < status.length; i++) {
        if ((status[i] as Status).value !== 200) {
          errorSites.push({ [urls[i]]: status[i] });
        }
      }
      setAllStatus(allStatus);
      return allStatus;
    };

    getAllSitesStatus();
  }, [allStatus]);
  return <div>This is error status filter{}</div>;
};

export default ErrorFilter;

import { PageInfo } from '../siteContent';
import LinkModule from './LinkModule'
import "../styles/results.css"

interface ResultsProps {
    sites: [string, PageInfo[]][];
}

export default function Results(props: ResultsProps) {
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
            {links}
        </div>
    )
}
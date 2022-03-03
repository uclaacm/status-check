import { PageInfo } from '../siteContent';
import LinkModule from './LinkModule'

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
            <div key={initiative}>
                {initiative}
                <div>{initiativeSites}</div>
            </div>
        );
    })
    return (
        <div>
            {links}
        </div>
    )
}
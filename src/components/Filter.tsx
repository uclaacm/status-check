import '../styles/Filter.css'
import { PageInfo } from "../siteContent";
import FilterDropdown from './FilterDropdown';
import { useState } from 'react';

interface FilterProps {
    onChange: (links: [string, PageInfo[]][]) => void;
}

export default function Filter(props: FilterProps) {
    const [dropdownOpen,setDropdownOpen] = useState(false);
    return (
        <div>
            <div>
                <input placeholder='Search sites...' />
                <button>Search</button>
                <button onClick={() => setDropdownOpen(dropdownOpen => !dropdownOpen)}>Filter</button>
            </div>
            {dropdownOpen && <FilterDropdown onChange={(sites) => props.onChange(sites)} />}
        </div>
    )
}
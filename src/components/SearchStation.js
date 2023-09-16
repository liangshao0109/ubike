import './StationInfo.css';
import { useState } from 'react';

function SearchStation({onChange}) {
    const [focused, setFocused] = useState(false);

    return (
        <div className='search-station'>
            <input 
                type="text"
                id="sna"
                className='sna'
                name="sna"
                placeholder="搜尋站點"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={onChange}/>
            <div className="search-icon">
                <i className={focused ? "fa-solid fa-magnifying-glass fa-sm focus" : "fa-solid fa-magnifying-glass fa-sm"}></i>
            </div>
        </div>
    );
}

export default SearchStation;

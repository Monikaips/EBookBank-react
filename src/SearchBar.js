import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchInput, setSearchInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchInput);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginRight: '20px',marginBottom: '20px' ,borderRadius:'30px'}}>
        <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search books..."
            style={{ padding: '8px', marginRight: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: 'blue', color: 'white', border: 'none' }}>Search</button>
    </form>
);
}

export default SearchBar;
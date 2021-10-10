import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

export default function SearchOption() {
    const context = useContext(noteContext);
    // destructuring of context
    const { searchByTitle, sortNotes } = context;
    return (
        <div>
            <input className="form-control container my-4 searchTitle" type="search" placeholder="Search By Title" aria-label="Search" onChange={(e) => searchByTitle(e.target.value)} />
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={sortNotes} />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Sort By Date
                </label>
            </div>
        </div>
    )
}

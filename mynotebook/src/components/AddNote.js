import React, { useContext, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';


export default function AddNote() {
    const ref = useRef(null);
    const context = useContext(noteContext);
    // destructuring of context
    const { addnote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const handleClick = (e) => {
        e.preventDefault();
        ref.current.click();
        addnote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }
    return (
        <div className="dropdown my-4">
            <button ref={ref} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Add Notes
            </button>
            <ul className="dropdown-menu" style={{ width: "800px" }} aria-labelledby="dropdownMenuButton1">
                <h2 className="text-center text-info m-3">Add Notes</h2>
                <form className='m-3' onSubmit={handleClick}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description<span className="text-danger">*</span></label>
                        <textarea type="text" className="form-control" name="description" id="description" rows="10" onChange={onchange} minLength={5} required value={note.description} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} />
                    </div>
                    {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button> */}
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </form>
            </ul>
        </div>
    )
}

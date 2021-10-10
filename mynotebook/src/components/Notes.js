import React, { useContext, useEffect, useRef, useState } from 'react'
import NotesItem from './NotesItem';
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import { useHistory } from 'react-router';

export default function Notes() {
    const context = useContext(noteContext);
    let history = useHistory();
    // destructuring of context
    const { notes, getnotes, editnote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    useEffect(() => {
        if (localStorage.getItem('token'))
            getnotes();
        else
            history.push('/login');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
        // console.log(e.target.value);
    }
    const handleClick = (e) => {
        e.preventDefault();
        editnote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    }
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>List of Notes</h2>
                <button ref={ref} type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-center text-info" id="exampleModalLabel">Edit Notes</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={handleClick}>
                                <div className="modal-body">
                                    {/* <h2 className=" my-3"></h2> */}
                                    <div className='my-3' >
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Title<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="etitle" name="etitle" onChange={onchange} value={note.etitle} minLength={3} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description<span className="text-danger">*</span></label>
                                            <textarea type="text" className="form-control" name="edescription" id="edescription" rows="5" onChange={onchange} minLength={5} required value={note.edescription} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="tag" className="form-label">Tag</label>
                                            <input type="text" className="form-control" id="etag" name="etag" onChange={onchange} value={note.etag} />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {/* <button type="button" className="btn btn-primary" onSubmit={handleClick}>Update Note</button> */}
                                    <input type="submit" value="Update Note" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="container mx-2">
                    {localStorage.getItem('token') && notes.length === 0 && `No Notes to Display.`}
                </div>
                {
                    notes.map((element) => {
                        return <NotesItem key={element._id} note={element} updateNote={updateNote} />
                    })
                }
            </div>
        </>
    )
}

import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'


export default function NotesItem(props) {

    const context = useContext(noteContext);
    // destructuring of context
    const { deletenote } = context;
    const { note, updateNote } = props;
    const handleClick = (note) => {
        updateNote(note);
    }
    // console.log(note);
    return (
        <div className="col-md-6 col-sm-12 col-lg-4 my-3">
            <div className="card ">
                <span className="position-absolute bg-danger badge text-white">
                    {note.tag}
                </span>
                <div className="card-body">
                    <h5 className="card-title text-center text-primary">{note.title.toUpperCase()}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text text-secondary">{(new Date(note.date).toDateString())}</p>

                    <p className="text-center">
                        <i className="fas fa-trash mx-2" onClick={() => { deletenote(props.note._id) }} data-bs-placement="bottom" title="Delete"></i>
                        <i className="fas fa-edit mx-2" data-bs-placement="bottom" title="Edit" onClick={() => { handleClick(note) }}></i>
                    </p>
                </div>
            </div>
        </div >
    )
}

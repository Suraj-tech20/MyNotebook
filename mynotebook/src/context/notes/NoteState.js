/* eslint-disable no-unused-vars */
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:5000';
    const { showAlert } = props;
    const [notes, setNotes] = useState([]);
    const [allNotes, setAllNotes] = useState([]);
    // Get all note
    const getnotes = async () => {
        // Api calls
        // fectch all notes from backend
        const response = await fetch(`${host}/notes/allnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
        setAllNotes(json);
    }

    // Add note
    const addnote = async (title, description, tag) => {
        // Api calls
        // Logic to addnote on backend
        try {
            const response = await fetch(`${host}/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
            let note = await response.json();
            setNotes(notes.concat(note.note));
            setAllNotes(notes.concat(note.note));
            showAlert("New note is added successfully", "success");

        } catch (error) {
            showAlert("Note is not added", "danger");
        }
    }


    const deletenote = async (id) => {
        // Logic to deletenote on backend
        const response = await fetch(`${host}/notes/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        // Logic to deletenote on frontend
        setNotes(notes.filter(note => note._id !== id));
        setAllNotes(notes.filter(note => note._id !== id));
        showAlert("Node is Deleted successfully", "success");
    }

    const editnote = async (id, title, description, tag) => {
        // Logic to editnote on backend
        const response = await fetch(`${host}/notes/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        // Logic to editnote on frontend
        let updateNotes = await JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < updateNotes.length; i++) {
            if (updateNotes[i]._id === id) {
                updateNotes[i].title = title;
                updateNotes[i].description = description;
                updateNotes[i].tag = tag;
                break;
            }
        }
        setNotes(updateNotes);
        setAllNotes(updateNotes);
        showAlert("Note is updated Success", "success");
    }

    const searchByTitle = (val) => {
        setNotes(allNotes.filter((note) => {
            if (val === "") {
                return true;
            } else if (note.title.toLowerCase().includes(val.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        }));
    }

    const sortNotes = () => {
        setNotes([...notes].reverse());
    }
    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes, searchByTitle, sortNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
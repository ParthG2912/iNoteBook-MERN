import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    //Fetch All Notes
    const fetchNotes = async () => {
        //API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZWFjODcwYmYxMzM2ZWU1N2E1N2Y3In0sImlhdCI6MTY0MzExNzg5NH0.sJk0_BdOZlX_lkaGPHXnR_YlSGbuYb9UGt00n4Ziaho",
            },
        });
        const json = await response.json();

        setNotes(json);
    };

    //Add a Note
    const addNote = async (title, description, tag) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZWFjODcwYmYxMzM2ZWU1N2E1N2Y3In0sImlhdCI6MTY0MzExNzg5NH0.sJk0_BdOZlX_lkaGPHXnR_YlSGbuYb9UGt00n4Ziaho",
            },

            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();

        setNotes(notes.concat(json));
    };

    //Delete a Note
    const deleteNote = async (id) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZWFjODcwYmYxMzM2ZWU1N2E1N2Y3In0sImlhdCI6MTY0MzExNzg5NH0.sJk0_BdOZlX_lkaGPHXnR_YlSGbuYb9UGt00n4Ziaho",
            },
        });
        // eslint-disable-next-line
        const json = await response.json();

        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    };

    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZWFjODcwYmYxMzM2ZWU1N2E1N2Y3In0sImlhdCI6MTY0MzExNzg5NH0.sJk0_BdOZlX_lkaGPHXnR_YlSGbuYb9UGt00n4Ziaho",
            },

            body: JSON.stringify({ title, description, tag }),
        });
        // eslint-disable-next-line
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    };

    return <NoteContext.Provider value={{ notes, fetchNotes, addNote, deleteNote, editNote }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;

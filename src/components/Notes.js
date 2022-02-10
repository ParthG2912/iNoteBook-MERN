import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./Addnote";

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, fetchNotes, editNote } = context;

    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClick = useRef(null);
    const [note, setNote] = useState({ id: "", newtitle: "", newdescription: "", newtag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, newtitle: currentNote.title, newdescription: currentNote.description, newtag: currentNote.tag });
    };

    const handleClick = (e) => {
        editNote(note.id, note.newtitle, note.newdescription, note.newtag);
        refClick.current.click();
    };
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Edit Note
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3 mx-2">
                                <div className="mb-3">
                                    <label htmlFor="newtitle" className="form-label">
                                        newTitle
                                    </label>
                                    <input type="text" className="form-control" id="newtitle" name="newtitle" onChange={handleChange} value={note.newtitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newdescription" className="form-label">
                                        newDescription
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="newdescription"
                                        name="newdescription"
                                        onChange={handleChange}
                                        value={note.newdescription}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newtag" className="form-label">
                                        newTag
                                    </label>
                                    <input type="text" className="form-control" id="newtag" name="newtag" onChange={handleChange} value={note.newtag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClick} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button
                                disabled={note.newtitle.length < 5 || note.newdescription.length < 5 || note.newtag.length < 3}
                                type="button"
                                className="btn btn-primary"
                                onClick={handleClick}>
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row my-3">
                    <h2>Yours Notes</h2>
                    <div className="container">{notes.length === 0 && "No notes to display"}</div>
                    {notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
                    })}
                </div>
            </div>
        </>
    );
};
export default Notes;

import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./Addnote";

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, fetchNotes } = context;

    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const [note, setNote] = useState({ newtitle: "", newdescription: "", newtag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        console.log(currentNote);
        setNote({ newtitle: currentNote.title, newdescription: currentNote.description, newtag: currentNote.tag });
    };

    const handleClick = (e) => {
        e.preventDefault();
    };
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
        console.log(note);
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
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="newtitle" className="form-label">
                                        newTitle
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="newtitle"
                                        name="newtitle"
                                        aria-describedby="emailHelp"
                                        onChange={handleChange}
                                        value={note.newtitle}
                                    />
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
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="newtag"
                                        name="newtag"
                                        onChange={handleChange}
                                        value={note.newtag}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row my-3">
                    <h2>Yours Notes</h2>
                    {notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
                    })}
                </div>
            </div>
        </>
    );
};
export default Notes;

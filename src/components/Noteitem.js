import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { capitalize } from "./Alert";

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{capitalize(note.title)}</h5>
                        <i
                            className="fas fa-trash-alt mx-2"
                            style={{ color: "#dc0000" }}
                            onClick={() => {
                                deleteNote(note._id);
                            }}></i>
                        <i
                            className="far fa-edit mx-2"
                            style={{ color: "blue" }}
                            onClick={() => {
                                updateNote(note);
                            }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Noteitem;

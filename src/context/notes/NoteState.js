import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            _id: "1",
            user: "61eeac870bf1336ee57a57f7",
            title: "Title",
            description: "This is description",
            tag: "tag",
            date: "2022-01-27T17:10:04.011Z",
            __v: 0,
        },
        {
            _id: "2",
            user: "61eeac870bf1336ee57a57f7",
            title: "Title2",
            description: "This is description2",
            tag: "tag2",
            date: "2022-02-01T12:55:39.278Z",
            __v: 0,
        },
        {
            _id: "3",
            user: "61eeac870bf1336ee57a57f7",
            title: "Title2",
            description: "This is description2",
            tag: "tag2",
            date: "2022-02-01T12:55:39.278Z",
            __v: 0,
        },
        {
            _id: "4",
            user: "61eeac870bf1336ee57a57f7",
            title: "Title2",
            description: "This is description2",
            tag: "tag2",
            date: "2022-02-01T12:55:39.278Z",
            __v: 0,
        },
        {
            _id: "5",
            user: "61eeac870bf1336ee57a57f7",
            title: "Title2",
            description: "This is description2",
            tag: "tag2",
            date: "2022-02-01T12:55:39.278Z",
            __v: 0,
        },
        {
            _id: "6",
            user: "61eeac870bf1336ee57a57f7",
            title: "Title2",
            description: "This is description2",
            tag: "tag2",
            date: "2022-02-01T12:55:39.278Z",
            __v: 0,
        },
        {
            _id: "7",
            user: "61eeac870bf1336ee57a57f7",
            title: "Title2",
            description: "This is description2",
            tag: "tag2",
            date: "2022-02-01T12:55:39.278Z",
            __v: 0,
        },
        {
            _id: "8",
            user: "61eeac870bf1336ee57a57f7",
            title: "Title2",
            description: "This is description2",
            tag: "tag2",
            date: "2022-02-01T12:55:39.278Z",
            __v: 0,
        },
    ];

    const [notes, setNotes] = useState(notesInitial);

    //Add a Note
    const addNote = (title, description, tag) => {
        //TODO: API CALL
        console.log("Adding a Note");
        const note = {
            _id: "9",
            user: "61eeac870bf1336ee57a57f7",
            title: "Title2",
            description: "This is added",
            tag: "tag2",
            date: "2022-02-01T12:55:39.278Z",
            __v: 0,
        };
        setNotes(notes.concat(note));
    };

    //Delete a Note
    const deleteNote = (id) => {
        // setNotes(notes.)
    };

    //Edit a Note
    const editNote = () => {};
    return <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;

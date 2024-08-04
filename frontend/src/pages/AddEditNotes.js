import React, { useState } from "react";
import "../Style/AddEditNotes.css";

const AddEditNotes = ({ noteData, type, onClose }) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [priority, setPriority] = useState("medium"); // Default to medium priority
    const [dueDate, setDueDate] = useState("");
    

    return (
        <div className="add-edit-notes-modal">
            <button className="close-button" onClick={onClose}>
                &times;
            </button>
            <div className="input-group">
                <label className="input-label">TITLE</label>
                <input
                    type="text"
                    className="input-field title-input"
                    placeholder="Go To Gym At 5"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label className="input-label">CONTENT</label>
                <textarea
                    className="input-field content-area"
                    placeholder="Content"
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label className="input-label">PRIORITY</label>
                <div className="priority-options">
                    {['high', 'medium', 'low'].map((level) => (
                        <button
                            key={level}
                            className={`priority-button ${level} ${priority === level ? 'selected' : ''}`}
                            onClick={() => setPriority(level)}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <div className="input-group">
                <label className="input-label">DUE DATE</label>
                <input
                    type="date"
                    className="input-field"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            <button className="add-button-EditMode"> ADD </button>
        </div>
    );
};

export default AddEditNotes;

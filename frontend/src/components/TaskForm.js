import React, { useState, useEffect } from "react";
import "../Style/AddEditNotes.css";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";


const TaskForm = ({ onClose, taskData, isEditing, onUpdate  }) => {
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    

    const { dispatch } = useTasksContext();
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    console.log({title, description, priority, dueDate});
    console.log(taskData);

    useEffect(() => {
        console.log("TaskData changed:", taskData);
        if (isEditing && taskData) {
            setTitle(taskData.title || "");
            setDescription(taskData.description || "");
            setPriority(taskData.priority || "medium");
            setDueDate(taskData.dueDate || "");
            setCompleted(taskData.completed || 'false');
        }
        else {
            // Reset form when not editing
            setTitle("");
            setDescription("");
            setPriority("medium");
            setDueDate("");
          }
    }, [taskData, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in");
            return;
        }

        const task = { title, description, priority, dueDate, completed };
        console.log("Inside that handle submit shit");
        console.log(task);

        const url = isEditing ? `/api/tasks/${taskData._id}` : "/api/tasks";
        const method = isEditing ? "PATCH" : "POST";
        const type = isEditing ? 'UPDATE_TASK' : 'CREATE_TASK'

        console.log(user.token);

        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();
        console.log(json);

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setTitle("");
            setDescription("");
            setPriority("");
            setDueDate("");
            setError(null);
            setEmptyFields([]);
            dispatch({ type: type, payload: isEditing ? { ...json, _id: taskData._id } : json });
            onClose();
        }
    };

    return (
        <form className="add-edit-notes-modal" onSubmit={handleSubmit}>
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
                    onChange={(e) => setTitle((currentTitle) => {
                        currentTitle = e.target.value;
                        return currentTitle;
                    })}
                />
            </div>

            <div className="input-group">
                <label className="input-label">DESCRIPTION</label>
                <textarea
                    className="input-field content-area"
                    placeholder="Description"
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription((currentDescription) => {
                        currentDescription = e.target.value;
                        return currentDescription;
                    })}
                />
            </div>

            <div className="input-group">
                <label className="input-label">PRIORITY</label>
                <div className="priority-options">
                    {["high", "medium", "low"].map((level) => (
                        <button
                            key={level}
                            className={`priority-button ${level} ${priority === level ? "selected" : ""
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                setPriority(level);
                            }}
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
                    onChange={(e) => setDueDate((currentDate) => {
                        currentDate = e.target.value;
                        return currentDate;
                    })}
                />
            </div>

            <button className="add-button-EditMode">
                {isEditing ? "Update" : "Add"}
            </button>
        </form>
    );
};

export default TaskForm;

import React, { useEffect, useState } from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete, MdAccessTime, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import '../Style/NoteCard.css';
import Modal from "react-modal";
import TaskForm from './TaskForm';
import { useTasksContext } from '../hooks/useTasksContext';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const NoteCard = ({
    _id,
    title,
    dueDate,
    description,
    priority,
    completed,
    onDelete,
    onPinNote
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [openAddEditModal, setOpenAddEditModal] = useState({ isShown: false, type: "add", data: null });
    const [isCompleted, setIsCompleted] = useState(completed || false);
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const { dispatch } = useTasksContext();

    const closeModal = () => {
        setOpenAddEditModal({ isShown: false, type: "add", data: null });
        setIsEditing(false);
    };


    const handleDelete = async () => {
        console.log(_id);
        const response = await fetch('/api/tasks/' + _id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_TASKS', payload: json });
        }
        else {
            if (response.status == 401) {
                console.log(response);
                logout();
                return;
            }
        }
    }

    const handleEdit = () => {
        setOpenAddEditModal({
            isShown: true,
            type: "update",
            data: {
                _id,
                title,
                dueDate,
                description,
                priority
            }
        });
    }

    const handleToggleComplete = async () => {
        if (!user) {
            logout();
            return;
        }

        const updatedTask = { completed: !completed };

        const response = await fetch(`/api/tasks/${_id}`, {
            method: "PATCH",
            body: JSON.stringify(updatedTask),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'UPDATE_TASK', payload: json });
        } else if (response.status === 401) {
            logout();
        }
    };



    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#ff4d4f';
            case 'medium': return '#faad14';
            case 'low': return '#52c41a';
            default: return '#666';
        }
    }


    return (
        <div className={`note-card ${completed ? 'completed' : ''}`}>
            <div className='note-header'>
                <div>
                    <h6 className='note-title'>{title}</h6>
                    <span className='note-priority' style={{ color: getPriorityColor(priority) }}>
                        {priority}
                    </span>
                </div>
                <div className='note-due-date'>
                    <MdAccessTime className='due-date-icon' />
                    <span>{formatDate(dueDate)}</span>
                </div>
            </div>

            <p className='note-content'>{description?.slice(0, 60)}</p>

            <div className='note-footer'>
                <div className='note-actions'>
                    {completed ? (
                        <MdCheckBox
                            className='action-icon complete-icon'
                            onClick={handleToggleComplete}
                        />
                    ) : (
                        <MdCheckBoxOutlineBlank
                            className='action-icon complete-icon'
                            onClick={handleToggleComplete}
                        />
                    )}
                    <MdCreate
                        className='action-icon edit-icon'
                        onClick={handleEdit}
                    />
                    <MdDelete
                        className='action-icon delete-icon'
                        onClick={handleDelete}
                    />
                </div>
            </div>
            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={closeModal}
                contentLabel="Add/Edit Task"
                className="modal-content"
                key={_id + "NoteCardModal"}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                }}
            >
                <TaskForm
                    key={_id + "TaskForm"}
                    onClose={closeModal}
                    taskData={openAddEditModal.data}
                    isEditing={openAddEditModal.type === "update"} />
            </Modal>
        </div>
    )
}

export default NoteCard;
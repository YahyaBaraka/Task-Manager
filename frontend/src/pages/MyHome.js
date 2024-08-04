import React, { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import "../Style/MyHome.css";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import TaskForm from "../components/TaskForm"
import FilterSortBar from '../components/FilterSortBar'
import { useLogout } from "../hooks/useLogout";

const MyHome = () => {
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [unauthorized, setUnauthorized] = useState(false);
  const { logout } = useLogout();
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all'
  });
  const [sortBy, setSortBy] = useState('dueDate');

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };
  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const sortTasks = (tasks, sortBy) => {
    return [...tasks].sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  };

  const filteredTasks = tasks ? tasks.filter(task => {
    return (filters.status === 'all' || (filters.status === 'completed' && task.completed) || (filters.status === 'active' && !task.completed)) &&
      (filters.priority === 'all' || task.priority === filters.priority);
  }) : [];

  const sortedAndFilteredTasks = sortTasks(filteredTasks, sortBy);


  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });



  // Get All Tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (response.status == "401") {
          throw new Error("Request is not authorized");
        }

        const json = await response.json();
        console.log(json);
        console.log(user.token);

        if (response.ok) {
          dispatch({ type: "SET_TASKS", payload: json });
        }
      } catch (error) {
        console.log(error);
        if (error.message === "Request is not authorized") {
          logout();
          return;
        }
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  return (
    <div className="home-container">
      <FilterSortBar 
        filters={filters} 
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      <div className="notes-grid">
        {sortedAndFilteredTasks && sortedAndFilteredTasks.length > 0 ? (
          sortedAndFilteredTasks.map((task) => (
            <NoteCard
              key={task._id}
              {...task}
              onEdit={() => {}}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>

      <button
        className="add-button"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="add-icon" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
        key={"MyHome"}
        contentLabel=""
        className="modal-content"
      >
        <TaskForm
          key="TheOneInMyHome"
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>
    </div>
  );
};

export default MyHome;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../store/slices/taskSlice';
import { showNotification } from '../../store/slices/uiSlice';
import SubTask from '../../components/SubTask/SubTask';
import './TaskDetailPage.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TaskDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/api/tasks/${id}`);
                if (!response.ok) throw new Error('Failed to fetch task');
                const taskData = await response.json();
                setTask(taskData);
            } catch (error) {
                console.error('Error fetching task details:', error);
                dispatch(showNotification({
                    message: 'Failed to load task details',
                    type: 'error'
                }));
            } finally {
                setLoading(false);
            }
        };

        fetchTaskDetails();
    }, [id, dispatch]);

    // Called by SubTask when a subtask is toggled — re-fetch to stay in sync
    const handleSubTaskToggle = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/tasks/${id}`);
            if (!response.ok) throw new Error('Failed to refresh task');
            const taskData = await response.json();
            setTask(taskData);
        } catch (error) {
            console.error('Error refreshing task:', error);
        }
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(parseInt(id)));
            dispatch(showNotification({
                message: 'Task deleted successfully',
                type: 'success'
            }));
            navigate('/');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPriorityColor = (priority) => {
        const colors = {
            high: '#ff6b6b',
            medium: '#ffd43b',
            low: '#51cf66'
        };
        return colors[priority] || '#adb5bd';
    };

    const getStatusColor = (status) => {
        const colors = {
            'todo': '#ff6b6b',
            'in progress': '#4ecdc4',
            'completed': '#51cf66',
            'canceled': '#adb5bd'
        };
        return colors[status] || '#667eea';
    };

    if (loading) {
        return (
            <div className="task-detail-loading">
                <div className="loading-spinner"></div>
                <p>Loading task details...</p>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="task-not-found">
                <h2>Task not found</h2>
                <p>The task you're looking for doesn't exist.</p>
                <button onClick={() => navigate('/')}>Go Back Home</button>
            </div>
        );
    }

    return (
        <div className="task-detail-page">
            <div className="task-detail-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    ← Back to Tasks
                </button>
                <div className="header-actions">
                    <button className="delete-button" onClick={handleDelete}>
                        Delete Task
                    </button>
                </div>
            </div>

            <div className="task-detail-card">
                <div className="task-main-info">
                    <div className="task-title-section">
                        <h1>{task.title}</h1>
                        <div className="task-meta">
                            <span
                                className="priority-badge"
                                style={{ backgroundColor: getPriorityColor(task.priority) }}
                            >
                                {task.priority ? task.priority.toUpperCase() : 'MEDIUM'}
                            </span>
                            <span
                                className="status-badge"
                                style={{ backgroundColor: getStatusColor(task.status) }}
                            >
                                {task.status ? task.status.replace('_', ' ').toUpperCase() : 'TODO'}
                            </span>
                            <span className="category-badge">{task.category || 'Uncategorized'}</span>
                        </div>
                    </div>

                    <div className="task-description">
                        <h3>Description</h3>
                        <p>{task.description || 'No description provided.'}</p>
                    </div>

                    <div className="task-dates">
                        <div className="date-info">
                            <span className="date-label">Created:</span>
                            <span className="date-value">{formatDate(task.creation_date)}</span>
                        </div>
                        <div className="date-info">
                            <span className="date-label">Deadline:</span>
                            <span className="date-value deadline-value">
                                {formatDate(task.deadline)}
                            </span>
                        </div>
                        <div className="date-info">
                            <span className="date-label">Last Updated:</span>
                            <span className="date-value">{formatDate(task.updated_date)}</span>
                        </div>
                    </div>
                </div>

                <div className="subtasks-section">
                    <div className="subtasks-header">
                        <h2>Subtasks</h2>
                        <span className="subtasks-count">
                            {task.subTasks ? task.subTasks.length : 0} subtasks
                        </span>
                    </div>

                    <div className="subtasks-list">
                        {task.subTasks && task.subTasks.length > 0 ? (
                            task.subTasks.map(subTask => (
                                <SubTask
                                    key={subTask.sub_task_id}
                                    subTask={subTask}
                                    taskId={parseInt(id)}
                                    onToggle={handleSubTaskToggle}
                                />
                            ))
                        ) : (
                            <div className="no-subtasks">
                                <p>No subtasks for this task.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailPage;

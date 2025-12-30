import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../store/slices/taskSlice';
import { showNotification } from '../../store/slices/uiSlice';
import SubTask from '../../components/SubTask/SubTask';
import './TaskDetailPage.css';

const TaskDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    // TODO: Replace with actual API call to fetch task details
    useEffect(() => {
        const fetchTaskDetails = async () => {
        try {
            setLoading(true);
            // In real app: const response = await fetch(`/api/tasks/${id}`);
            // const taskData = await response.json();
            
            // Mock data - replace with API call
            const mockTask = {
            task_id: parseInt(id),
            title: 'Finish AI Agent',
            description: 'Core logic for AI agent. This involves implementing the prompt engineering, response parsing, and integration with the task management system.',
            deadline: '2025-12-17T00:00:00',
            creation_date: '2025-12-16T18:43:36',
            category: 'Development',
            priority: 'high',
            status: 'in progress',
            updated_date: '2025-12-24T20:28:23',
            deleted_at: null,
            subTasks: [
                {
                sub_task_id: 1,
                title: 'Design prompt flow',
                description: 'Chat UX design and user interaction flow',
                deadline: '2025-12-17T18:57:03',
                creation_date: '2025-12-16T18:57:03',
                is_done: 0,
                task_id: parseInt(id),
                updated_date: null,
                deleted_at: null
                },
                {
                sub_task_id: 2,
                title: 'Implement intent parser',
                description: 'Natural language to SQL query parsing',
                deadline: '2025-12-18T18:57:03',
                creation_date: '2025-12-16T18:57:03',
                is_done: null,
                task_id: parseInt(id),
                updated_date: null,
                deleted_at: null
                },
                {
                sub_task_id: 3,
                title: 'Test AI responses',
                description: 'Validate AI responses and edge cases',
                deadline: '2025-12-19T18:57:03',
                creation_date: '2025-12-16T18:57:03',
                is_done: 1,
                task_id: parseInt(id),
                updated_date: '2025-12-17T18:57:03',
                deleted_at: null
                }
            ]
            };
            
            setTask(mockTask);
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
        'high': '#ff6b6b',
        'medium': '#ffd43b',
        'low': '#51cf66'
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
                    <SubTask key={subTask.sub_task_id} subTask={subTask} />
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
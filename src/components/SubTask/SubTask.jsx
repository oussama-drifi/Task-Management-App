import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSubTaskStatus } from '../../store/slices/taskSlice';
import './SubTask.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SubTask = ({ subTask, taskId, onToggle }) => {
    const dispatch = useDispatch();
    const [isUpdating, setIsUpdating] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return 'No deadline';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusText = (isDone) => {
        if (isDone === 1) return 'Completed';
        if (isDone === 0) return 'Not Started';
        return 'In Progress';
    };

    const getStatusColor = (isDone) => {
        if (isDone === 1) return '#51cf66';
        if (isDone === 0) return '#ff6b6b';
        return '#ffd43b';
    };

    // Cycle: Not Started (0) → In Progress (null) → Completed (1) → Not Started (0)
    const getNextStatus = (isDone) => {
        if (isDone === 0) return null;
        if (isDone === null) return 1;
        return 0;
    };

    const handleToggle = async () => {
        if (isUpdating) return;

        const nextStatus = getNextStatus(subTask.is_done);
        setIsUpdating(true);

        try {
            const response = await fetch(`${BASE_URL}/api/subtasks/${subTask.sub_task_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_done: nextStatus }),
            });

            if (!response.ok) throw new Error('Failed to update subtask');

            // Update Redux store
            dispatch(updateSubTaskStatus({
                taskId,
                subTaskId: subTask.sub_task_id,
                isDone: nextStatus,
            }));

            // Notify parent to re-fetch if needed
            if (onToggle) onToggle();

        } catch (error) {
            console.error('Error updating subtask:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className={`subtask-item ${isUpdating ? 'updating' : ''}`}>
            <div className="subtask-header">
                <div className="subtask-title-section">
                    <div className="subtask-toggle-area">
                        <button
                            className={`subtask-checkbox ${subTask.is_done === 1 ? 'checked' : subTask.is_done === null ? 'in-progress' : ''}`}
                            onClick={handleToggle}
                            disabled={isUpdating}
                            title="Click to cycle status: Not Started → In Progress → Completed"
                            aria-label={`Mark subtask as ${getStatusText(getNextStatus(subTask.is_done))}`}
                        >
                            {subTask.is_done === 1 && <i className="bi bi-check-lg"></i>}
                            {subTask.is_done === null && <i className="bi bi-arrow-right"></i>}
                        </button>
                        <h4 className={subTask.is_done === 1 ? 'completed-title' : ''}>{subTask.title}</h4>
                    </div>
                    <span
                        className="subtask-status"
                        style={{ backgroundColor: getStatusColor(subTask.is_done) }}
                    >
                        {isUpdating ? '...' : getStatusText(subTask.is_done)}
                    </span>
                </div>
            </div>

            {subTask.description && (
                <p className="subtask-description">{subTask.description}</p>
            )}

            <div className="subtask-footer">
                <div className="subtask-deadline">
                    <span className="deadline-label">Due:</span>
                    <span className="deadline-date">{formatDate(subTask.deadline)}</span>
                </div>

                <div className="subtask-meta">
                    <span className="created-date">
                        Created: {formatDate(subTask.creation_date)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SubTask;

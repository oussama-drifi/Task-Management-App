import React from 'react';
import './SubTask.css';

const SubTask = ({ subTask }) => {
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

    return (
        <div className="subtask-item">
        <div className="subtask-header">
            <div className="subtask-title-section">
            <h4>{subTask.title}</h4>
            <span 
                className="subtask-status"
                style={{ backgroundColor: getStatusColor(subTask.is_done) }}
            >
                {getStatusText(subTask.is_done)}
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
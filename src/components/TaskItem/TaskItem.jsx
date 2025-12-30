import { useNavigate } from 'react-router-dom';
import './TaskItem.css';

const TaskItem = ({ task }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/task/${task.task_id}`);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No deadline';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
        });
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'high': '#ff6b6b',
            'medium': '#ffcb0eff',
            'low': '#51cf66'
        };
        const backgrounds = {
            'high': '#ffdcdcff',
            'medium': '#fff3c8ff',
            'low': '#beffc9ff'
        };
        return [backgrounds[priority], colors[priority]] || '#adb5bd';
    };

    const getPriorityLabel = (priority) => {
        return priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : 'Medium';
    };

    return (
        <div className="task-item" onClick={handleClick}>
        <div className="task-item-header">
            <span 
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority)[0], color: getPriorityColor(task.priority)[1]}}
            >
                <i className="bi bi-flag"></i> {task.priority.toLowerCase() || "medium"}
            </span>
            <span className="task-category">{task.category || 'Uncategorized'}</span>
        </div>
        
        <h4 className="task-title"><i className="bi bi-dash"></i> {task.title}</h4>
        <p className='task-description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, ex dolor omnis</p>
        
        <div className="task-item-footer">
            <div className="deadline">
                <span className="deadline-label"><i className="bi bi-calendar-minus"></i> Deadline:</span>
                <span className="deadline-date">{formatDate(task.deadline)}</span>
            </div>
            
            {task.subTasks && task.subTasks.length > 0 && (
                <div className="subtasks-count">
                    <span className="subtasks-icon"><i className="bi bi-arrow-return-right"></i></span>
                    <span>{task.subTasks.length} subtasks</span>
                </div>
            )}
        </div>
        </div>
    );
};

export default TaskItem;
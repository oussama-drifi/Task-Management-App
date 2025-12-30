import { useSelector } from 'react-redux';
import { selectTasksByStatus } from '../../store/selectors';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

const TaskList = ({ status }) => {
    const tasks = useSelector((state) => selectTasksByStatus(state, status));

    const getStatusColor = (status) => {
        const colors = {
            'todo': '#ff6b6b',
            'in progress': '#4ecdc4',
            'completed': '#51cf66',
        };
        return colors[status] || '#667eea';
    };

    return (
        <div className="task-list">
        <div className="list-header" style={{ borderLeftColor: getStatusColor(status) }}>
            <h3>{status}</h3>
            <span className="task-count">{tasks.length} tasks</span>
        </div>
        
        <div className="tasks-container">
            {tasks.length === 0 ? (
            <div className="empty-state">
                <p>No tasks in {status}</p>
            </div>
            ) : (
                tasks.map(task => (
                    <TaskItem key={task.task_id} task={task} />
                ))
            )}
        </div>
        </div>
    );
};

export default TaskList;
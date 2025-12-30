import React from 'react';
import { useSelector } from 'react-redux';
import { selectTaskSummary } from '../../store/selectors';
import './TaskSummary.css';

const TaskSummary = () => {
    const summary = useSelector(selectTaskSummary);

    return (
        <div className="task-summary">
            <h1 className='headline'><span>Welcome Back,</span> <span>Oussama Drifi</span></h1>
            {/* <div className="summary-card total">
                <h3>Total Tasks</h3>
                <div className="summary-count">{summary.total}</div>
                <p>All active tasks</p>
            </div>
            
            <div className="summary-card todo">
                <h3>To Do</h3>
                <div className="summary-count">{summary.todo}</div>
                <p>Tasks pending</p>
            </div>
            
            <div className="summary-card in-progress">
                <h3>In Progress</h3>
                <div className="summary-count">{summary.inProgress}</div>
                <p>Currently working</p>
            </div>
            
            <div className="summary-card completed">
                <h3>Completed</h3>
                <div className="summary-count">{summary.completed}</div>
                <p>Tasks done</p>
            </div> */}
        </div>
    );
};

export default TaskSummary;
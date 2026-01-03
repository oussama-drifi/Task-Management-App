import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTasks } from '../../store/slices/taskSlice';
import TaskList from '../../components/TaskList/TaskList';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import './HomePage.css';

const HomePage = () => {
    const dispatch = useDispatch();

    // TODO: Replace with actual API call to fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/tasks');
                const tasks = await response.json();
                dispatch(setTasks(tasks.tasks));
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [dispatch]);

    return (
        <div className="home-page">
        <header className="app-header">
            <h1 className='headline'><span>Welcome Back,</span> <span>Oussama Drifi</span></h1>
            <p>Plan, Manage and execute your tasks, all in one place</p>
        </header>

        <main className="main-content">
            <div className="tasks-section">
                <TaskList status="todo" />
                <TaskList status="in progress" />
                <TaskList status="completed" />
            </div>
        </main>

        <ChatWindow />
        </div>
    );
};

export default HomePage;
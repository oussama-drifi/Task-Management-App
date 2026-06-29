import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTasks } from '../../store/slices/taskSlice';
import { showNotification } from '../../store/slices/uiSlice';
import TaskList from '../../components/TaskList/TaskList';
import TaskSummary from '../../components/TaskSummary/TaskSummary';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import './HomePage.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/tasks`);
                if (!response.ok) throw new Error(`Server error: ${response.status}`);
                const data = await response.json();
                dispatch(setTasks(data.tasks));
            } catch (error) {
                console.error('Error fetching tasks:', error);
                dispatch(showNotification({
                    message: 'Could not load tasks. Is the backend running?',
                    type: 'error',
                }));
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
                <TaskSummary />

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

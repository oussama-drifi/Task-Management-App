import { createSlice } from '@reduxjs/toolkit';

// Initial state based on your database schema
const initialState = {
    tasks: [
        // {
        // task_id: 5,
        // title: 'Finish AI Agent',
        // description: 'Core logic for AI agent',
        // deadline: '2025-12-17T00:00:00',
        // creation_date: '2025-12-16T18:43:36',
        // category: 'Development',
        // priority: 'high',
        // status: 'in progress',
        // updated_date: '2025-12-24T20:28:23',
        // deleted_at: null,
        // subTasks: [
        //     {
        //     sub_task_id: 1,
        //     title: 'Design prompt flow',
        //     description: 'Chat UX',
        //     deadline: '2025-12-17T18:57:03',
        //     creation_date: '2025-12-16T18:57:03',
        //     is_done: 0,
        //     task_id: 5,
        //     updated_date: null,
        //     deleted_at: null
        //     },
        //     {
        //     sub_task_id: 2,
        //     title: 'Implement intent parser',
        //     description: 'NL → SQL',
        //     deadline: '2025-12-18T18:57:03',
        //     creation_date: '2025-12-16T18:57:03',
        //     is_done: null,
        //     task_id: 5,
        //     updated_date: null,
        //     deleted_at: null
        //     }
        // ]
        // },
        // Add more tasks here based on your SQL data
    ],
    isLoading: false,
    error: null,
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        updateTaskStatus: (state, action) => {
            const { taskId, newStatus } = action.payload;
            const task = state.tasks.find(t => t.task_id === taskId);
            if (task) {
                task.status = newStatus;
                task.updated_date = new Date().toISOString();
            }
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            const { taskId, updatedData } = action.payload;
            const index = state.tasks.findIndex(t => t.task_id === taskId);
            if (index !== -1) {
                state.tasks[index] = {
                ...state.tasks[index],
                ...updatedData,
                updated_date: new Date().toISOString(),
                };
            }
        },
        deleteTask: (state, action) => {
            const taskId = action.payload;
            const index = state.tasks.findIndex(t => t.task_id === taskId);
            if (index !== -1) {
                state.tasks[index].deleted_at = new Date().toISOString();
            }
        },
        // For AI agent to modify tasks
        aiUpdateTasks: (state, action) => {
            state.tasks = action.payload;
        },
        // Sub-task reducers
        updateSubTaskStatus: (state, action) => {
            const { taskId, subTaskId, isDone } = action.payload;
            const task = state.tasks.find(t => t.task_id === taskId);
            if (task && task.subTasks) {
                const subTask = task.subTasks.find(st => st.sub_task_id === subTaskId);
                if (subTask) {
                subTask.is_done = isDone;
                subTask.updated_date = new Date().toISOString();
                }
            }
        },
    },
});

export const {
    setTasks,
    updateTaskStatus,
    addTask,
    updateTask,
    deleteTask,
    aiUpdateTasks,
    updateSubTaskStatus,
} = taskSlice.actions;

export default taskSlice.reducer;
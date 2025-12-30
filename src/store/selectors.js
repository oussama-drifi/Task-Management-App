export const selectAllTasks = (state) => state.tasks.tasks;

export const selectActiveTasks = (state) => 
    state.tasks.tasks.filter(task => !task.deleted_at);

export const selectTaskById = (state, taskId) => 
    state.tasks.tasks.find(task => task.task_id === taskId);

export const selectTasksByStatus = (state, status) => 
    state.tasks.tasks.filter(task => task.status === status && !task.deleted_at);

export const selectTaskSummary = (state) => {
    const tasks = state.tasks.tasks.filter(task => !task.deleted_at);
    return {
        total: tasks.length,
        todo: tasks.filter(task => task.status === 'todo').length,
        inProgress: tasks.filter(task => task.status === 'in progress').length,
        completed: tasks.filter(task => task.status === 'completed').length,
    };
};

export const selectChatWindowOpen = (state) => state.ui.chatWindowOpen;
export const selectTasksCollapsed = (state) => state.ui.tasksCollapsed;
export const selectSelectedTaskId = (state) => state.ui.selectedTaskId;
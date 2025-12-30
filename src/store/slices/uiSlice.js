import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatWindowOpen: false,
  tasksCollapsed: false,
  selectedTaskId: null,
  loading: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleChatWindow: (state) => {
      const willOpen = !state.chatWindowOpen;
      state.chatWindowOpen = willOpen;
      // Collapse tasks when chat window opens, expand when closes
      state.tasksCollapsed = willOpen;
    },
    closeChatWindow: (state) => {
      state.chatWindowOpen = false;
      state.tasksCollapsed = false;
    },
    openChatWindow: (state) => {
      state.chatWindowOpen = true;
      state.tasksCollapsed = true;
    },
    toggleTasksCollapsed: (state) => {
      state.tasksCollapsed = !state.tasksCollapsed;
    },
    collapseTasks: (state) => {
      state.tasksCollapsed = true;
    },
    expandTasks: (state) => {
      state.tasksCollapsed = false;
    },
    setSelectedTask: (state, action) => {
      state.selectedTaskId = action.payload;
    },
    clearSelectedTask: (state) => {
      state.selectedTaskId = null;
    },
    showNotification: (state, action) => {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type || 'info', // 'info', 'success', 'error', 'warning'
      };
    },
    clearNotification: (state) => {
      state.notification = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  toggleChatWindow,
  closeChatWindow,
  openChatWindow,
  toggleTasksCollapsed,
  collapseTasks,
  expandTasks,
  setSelectedTask,
  clearSelectedTask,
  showNotification,
  clearNotification,
  setLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
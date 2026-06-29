# Task Management App

A modern, AI-powered task management application built with React. Organize your work into tasks and subtasks, track progress across three status lanes, and interact with a built-in AI assistant that can create, update, and analyze your tasks through natural language.

---

## Features

- **Kanban-style board** — three columns: To Do, In Progress, and Completed
- **Task summary** — live counters showing total, todo, in-progress, and completed task counts
- **Task detail view** — full task information including description, priority, category, deadline, and subtasks
- **Subtask management** — each task can have multiple subtasks with their own status (Not Started / In Progress / Completed) and a toggle to mark them done
- **AI chat assistant** — floating chat window powered by a backend AI agent; send natural language instructions to create, update, or reorganize tasks, and the board updates in real time
- **Redux state management** — all tasks and UI state (chat open/close, selected task, notifications) are managed globally with Redux Toolkit
- **Responsive design** — works on desktop and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Routing | React Router DOM v7 |
| State Management | Redux Toolkit + React Redux |
| Build Tool | Vite (rolldown-vite) |
| Styling | Plain CSS, Bootstrap Icons, Poppins font |
| HTTP | Fetch API |
| Backend | Python Flask (separate repo) |

---

## Project Structure

```
src/
├── App.jsx                   # Root component, route definitions
├── main.jsx                  # Entry point, Redux Provider, Router
├── server.js                 # MirageJS mock server (development only)
│
├── pages/
│   ├── HomePage/             # Main board: summary + 3-column kanban + chat
│   └── TaskDetailPage/       # Full task view with subtasks
│
├── components/
│   ├── TaskList/             # Renders a column of tasks for a given status
│   ├── TaskItem/             # Individual task card (clickable)
│   ├── TaskSummary/          # Stats cards (total, todo, in progress, done)
│   ├── SubTask/              # Individual subtask row with toggle
│   └── ChatWindow/           # Floating AI chat panel
│
└── store/
    ├── store.js              # Redux store configuration
    ├── selectors.js          # Memoized selectors (tasks by status, summary, etc.)
    └── slices/
        ├── taskSlice.js      # Task CRUD reducers + AI update action
        └── uiSlice.js        # Chat open/close, collapse, notifications
```

---

## Data Model

### Task

```json
{
  "task_id": 5,
  "title": "Finish AI Agent",
  "description": "Core logic for AI agent",
  "deadline": "2025-12-17T00:00:00",
  "creation_date": "2025-12-16T18:43:36",
  "category": "Development",
  "priority": "high",
  "status": "in progress",
  "updated_date": "2025-12-24T20:28:23",
  "deleted_at": null,
  "subTasks": [ ]
}
```

**Priority values:** `"low"` | `"medium"` | `"high"`

**Status values:** `"todo"` | `"in progress"` | `"completed"`

### SubTask

```json
{
  "sub_task_id": 1,
  "title": "Design prompt flow",
  "description": "Chat UX design",
  "deadline": "2025-12-17T18:57:03",
  "creation_date": "2025-12-16T18:57:03",
  "is_done": 0,
  "task_id": 5,
  "updated_date": null,
  "deleted_at": null
}
```

**`is_done` values:** `0` = Not Started · `null` = In Progress · `1` = Completed

---

## Backend API

The frontend expects a REST API running at the URL defined in `.env`. All endpoints are prefixed with `/api`.

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Returns `{ tasks: Task[] }` |
| `GET` | `/api/tasks/:id` | Returns a single task with its `subTasks` array |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Soft-delete a task (sets `deleted_at`) |

### SubTasks

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks/:id/subtasks` | Returns subtasks for a task |
| `POST` | `/api/tasks/:id/subtasks` | Create a subtask under a task |
| `PUT` | `/api/subtasks/:id` | Update a subtask (e.g. toggle `is_done`) |
| `DELETE` | `/api/subtasks/:id` | Delete a subtask |

### AI Chat

| Method | Endpoint | Body | Response |
|---|---|---|---|
| `POST` | `/api/chat` | `{ user_prompt: string, history: array }` | `{ response: string, history: array }` |

The AI agent has full access to the task database. After each chat message, the frontend automatically re-fetches all tasks and updates the Redux store so any AI-created or AI-modified tasks appear immediately.

---

## Getting Started

### Prerequisites

- Node.js 18+
- The backend server running at `http://127.0.0.1:5000` (or update `.env`)

### Installation

```bash
git clone https://github.com/oussama-drifi/Task-Management-App.git
cd Task-Management-App
npm install
```

### Environment

Create a `.env` file at the project root (already included):

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
```

Change the URL to point to your backend if it runs on a different host or port.

### Running in Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## How It Works

### Board Flow

1. On load, `HomePage` fetches all tasks from `GET /api/tasks` and dispatches them into the Redux store.
2. `TaskList` components read tasks filtered by status from the store via selectors and render the appropriate column.
3. `TaskSummary` reads aggregate counts from the store and displays them above the board.
4. Clicking a task card navigates to `/task/:id`, which fetches full task details including subtasks from `GET /api/tasks/:id`.

### Subtask Toggling

On the Task Detail page, each subtask has a checkbox. Clicking it calls `PUT /api/subtasks/:id` with the toggled `is_done` value and updates the Redux store via `updateSubTaskStatus`.

### AI Assistant

1. Click **"Chat with AI"** in the bottom-right corner.
2. Type a natural language instruction — e.g. *"Create a task called Write unit tests with high priority"* or *"Mark the AI Agent task as completed"*.
3. The message and full conversation history are sent to `POST /api/chat`.
4. The backend AI agent processes the request, modifies the database, and returns a reply.
5. The frontend re-fetches all tasks and syncs the board automatically.

### Soft Deletes

Tasks are never hard-deleted. The `deleteTask` reducer sets `deleted_at` to the current timestamp. All selectors filter out tasks where `deleted_at` is not null, so they disappear from the UI while remaining in the database.

---

## Redux State Shape

```js
{
  tasks: {
    tasks: Task[],       // all tasks including soft-deleted
    isLoading: boolean,
    error: string | null
  },
  ui: {
    chatWindowOpen: boolean,
    tasksCollapsed: boolean,
    selectedTaskId: number | null,
    loading: boolean,
    notification: { message: string, type: 'info'|'success'|'error'|'warning' } | null
  }
}
```

---

## License

MIT

import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { Task } from '../../utils/interfaces/task';
import agent from '../../api/agent';

interface TaskState {
  tasks: Task[] | [];
  taskModal: { isOpen: boolean; taskId?: string };
  selectedTask: Task | null;
}

const initialState: TaskState = {
  tasks: [],
  taskModal: {
    isOpen: false,
    taskId: ''
  },
  selectedTask: null
};

export const getTasks = createAsyncThunk<Task[]>('task/getTasks', async (_, thunkAPI) => {
  try {
    return await agent.Tasks.list();
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const getTask = createAsyncThunk<Task, string>('task/getTask', async (taskId, thunkAPI) => {
  try {
    return await agent.Tasks.details(taskId);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const createTask = createAsyncThunk<void, { projectId: string; body: Task }>(
  'task/createTask',
  async (payload, thunkAPI) => {
    try {
      return await agent.Tasks.create(payload.projectId, payload.body);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const editTask = createAsyncThunk<void, Task>('task/editTask', async (payload, thunkAPI) => {
  try {
    return await agent.Tasks.edit(payload);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const updateStatus = createAsyncThunk<void, { id: string; status: string }>(
  'task/updateStatus',
  async (payload, thunkAPI) => {
    try {
      return await agent.Tasks.update(payload.id, payload.status);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const uploadImage = createAsyncThunk<void, { file: Blob; id: string }>(
  'task/uploadImage',
  async (payload, thunkAPI) => {
    try {
      await agent.Tasks.uploadImage(payload.file, payload.id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const deleteTask = createAsyncThunk<void, string>(
  'task/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      return await agent.Tasks.delete(taskId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    toggleTaskModal: (state, action) => {
      state.taskModal = action.payload;
    },
    resetSelectedTask: (state) => {
      state.selectedTask = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getTask.fulfilled, (state, action) => {
      state.selectedTask = action.payload;
    });
    builder.addMatcher(
      isAnyOf(
        getTasks.rejected,
        getTask.rejected,
        createTask.rejected,
        editTask.rejected,
        updateStatus.rejected,
        uploadImage.rejected,
        deleteTask.rejected
      ),
      (state, action) => {
        throw action.payload;
      }
    );
  }
});

export const { toggleTaskModal, resetSelectedTask } = taskSlice.actions;

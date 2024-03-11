import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ error: err.data });
  }
});

export const getTask = createAsyncThunk<Task, string>('task/getTask', async (taskId, thunkAPI) => {
  try {
    return await agent.Tasks.details(taskId);
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ error: err.data });
  }
});

export const createTask = createAsyncThunk<void, Task>(
  'task/createTasks',
  async (payload, thunkAPI) => {
    try {
      return await agent.Tasks.create(payload);
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

// export const editTask = createAsyncThunk<void, Task>(
//   'task/createTasks',
//   async (payload, thunkAPI) => {
//     try {
//       return await agent.Tasks.create(payload);
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue({ error: err.data });
//     }
//   }
// );

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    toggleTaskModal: (state, action) => {
      state.taskModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(getTask.fulfilled, (state, action) => {
      state.selectedTask = action.payload;
    });
    builder.addCase(getTask.rejected, (state, action) => {
      console.log(action.payload);
    });
  }
});

export const { toggleTaskModal } = taskSlice.actions;

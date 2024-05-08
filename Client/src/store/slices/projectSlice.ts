import { createAction, createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { Project } from '../../utils/interfaces/project';
import agent from '../../api/agent';

interface ProjectState {
  projects: Project[] | [];
  myProjects: Project[] | [];
}

const initialState: ProjectState = {
  projects: [],
  myProjects: []
};

export const setMyProjects = createAction<Project[]>('project/setMyProjects');

export const getProjects = createAsyncThunk<Project[] | void, boolean>(
  'project/getProjects',
  async (filterUserTasks = false, thunkAPI) => {
    try {
      const projects = await agent.Projects.list(filterUserTasks);
      if (filterUserTasks) {
        thunkAPI.dispatch(setMyProjects(projects));
      } else {
        return projects;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload !== undefined) {
        state.projects = action.payload;
      }
    });
    builder.addCase(setMyProjects, (state, action) => {
      state.myProjects = action.payload;
    });
    builder.addMatcher(isAnyOf(getProjects.rejected), (state, action) => {
      throw action.payload;
    });
  }
});

import { createAction, createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { Project } from '../../utils/interfaces/project';
import agent from '../../api/agent';

interface ProjectState {
  projects: Project[] | [];
  myProjects: Project[] | [];
  project: Project | null;
}

interface GetProjectsParams {
  userId: string;
  filterProjects?: boolean;
  searchTerm?: string;
}

const initialState: ProjectState = {
  projects: [],
  myProjects: [],
  project: null
};

export const setMyProjects = createAction<Project[]>('project/setMyProjects');

export const getProjects = createAsyncThunk<Project[] | void, GetProjectsParams>(
  'project/getProjects',
  async ({ userId, filterProjects = false, searchTerm }, thunkAPI) => {
    try {
      const projects = await agent.Projects.list(userId, filterProjects, searchTerm);
      if (filterProjects) {
        thunkAPI.dispatch(setMyProjects(projects));
      } else {
        return projects;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const getProject = createAsyncThunk<Project, string>(
  'project/getProject',
  async (projectId, thunkAPI) => {
    try {
      return await agent.Projects.details(projectId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const createProject = createAsyncThunk<void, string>(
  'project/createProject',
  async (name, thunkAPI) => {
    try {
      return await agent.Projects.create(name);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const updateMembers = createAsyncThunk<void, { projectId: string; appUserIds: string[] }>(
  'project/updateMembers',
  async (payload, thunkAPI) => {
    try {
      console.log(payload.appUserIds);
      return await agent.Projects.update(payload.projectId, payload.appUserIds);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const deleteProject = createAsyncThunk<void, string>(
  'project/deleteProject',
  async (id, thunkAPI) => {
    try {
      return await agent.Projects.delete(id);
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
      if (action.payload !== undefined) {
        state.projects = action.payload;
      }
    });
    builder.addCase(setMyProjects, (state, action) => {
      state.myProjects = action.payload;
    });
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.project = action.payload;
    });
    builder.addMatcher(
      isAnyOf(
        getProjects.rejected,
        getProject.rejected,
        createProject.rejected,
        updateMembers.rejected,
        deleteProject.rejected
      ),
      (state, action) => {
        throw action.payload;
      }
    );
  }
});

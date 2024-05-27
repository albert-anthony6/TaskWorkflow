import { createAction, createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { Pagination, PagingParams } from '../../utils/interfaces/pagination';
import { Project } from '../../utils/interfaces/project';
import agent from '../../api/agent';

interface ProjectState {
  projects: Project[] | [];
  myProjects: Project[] | [];
  project: Project | null;
  myProjectsPagination: Pagination | null;
  projectsPagination: Pagination | null;
}

interface GetProjectsParams {
  pagingParams: PagingParams | undefined;
  userId: string;
  filterProjects?: boolean;
  searchTerm?: string;
}

const initialState: ProjectState = {
  projects: [],
  myProjects: [],
  project: null,
  myProjectsPagination: null,
  projectsPagination: null
};

export const setMyProjects = createAction<Project[]>('project/setMyProjects');

export const getProjects = createAsyncThunk<Project[] | void, GetProjectsParams>(
  'project/getProjects',
  async (
    { pagingParams = { pageNumber: 1, pageSize: 10 }, userId, filterProjects = false, searchTerm },
    thunkAPI
  ) => {
    try {
      const results = await agent.Projects.list(
        pagingParams.pageNumber as number,
        pagingParams.pageSize as number,
        userId,
        filterProjects,
        searchTerm
      );
      if (filterProjects) {
        thunkAPI.dispatch(setMyProjectsPagination(results.pagination));
        thunkAPI.dispatch(setMyProjects(results.data));
      } else {
        thunkAPI.dispatch(setProjectsPagination(results.pagination));
        return results.data;
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
  reducers: {
    setMyProjectsPagination: (state, action) => {
      state.myProjectsPagination = action.payload;
    },
    setProjectsPagination: (state, action) => {
      state.projectsPagination = action.payload;
    }
  },
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

export const { setMyProjectsPagination, setProjectsPagination } = projectSlice.actions;

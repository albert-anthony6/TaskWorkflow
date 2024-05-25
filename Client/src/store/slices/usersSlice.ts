import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import agent from '../../api/agent';
import { User, UserProfile } from '../../utils/interfaces/user';
import { Pagination, PagingParams } from '../../utils/interfaces/pagination';

interface UserState {
  users: User[] | null;
  profile: UserProfile | null;
  pagination: Pagination | null;
}

interface GetUsersParams {
  pagingParams?: PagingParams | undefined;
  searchTerm?: string;
}

const initialState: UserState = {
  users: null,
  profile: null,
  pagination: null
};

export const getUsers = createAsyncThunk<User[], GetUsersParams>(
  'users/getUsers',
  async ({ pagingParams = { pageNumber: 1, pageSize: 12 }, searchTerm }, thunkAPI) => {
    try {
      const results = await agent.Profile.list(
        pagingParams.pageNumber,
        pagingParams.pageSize,
        searchTerm
      );
      thunkAPI.dispatch(setPagination(results.pagination));
      return results.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const getProfile = createAsyncThunk<UserProfile, string>(
  'user/getProfile',
  async (id, thunkAPI) => {
    try {
      return await agent.Profile.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.pagination = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addMatcher(isAnyOf(getUsers.fulfilled), (state, action) => {
      state.users = action.payload;
    });
    builder.addMatcher(isAnyOf(getUsers.rejected, getProfile.rejected), (state, action) => {
      throw action.payload;
    });
  }
});

export const { setPagination } = usersSlice.actions;

import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import agent from '../../api/agent';
import { User, UserFormValues } from '../../utils/interfaces/user';
import { router } from '../../routes/router';

interface UserState {
  user: User | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem('jwt') || null
};

export const signInUser = createAsyncThunk<User, UserFormValues>(
  'user/signInUser',
  async (user, thunkAPI) => {
    try {
      const response = await agent.Account.login(user);
      thunkAPI.dispatch(setToken(response.token));
      router.navigate('/projects/123');
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const registerUser = createAsyncThunk<User, UserFormValues>(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const response = await agent.Account.register(user);
      thunkAPI.dispatch(setToken(response.token));
      router.navigate('/projects/123');
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const getUser = createAsyncThunk<User>('user/getUser', async (_, thunkAPI) => {
  try {
    return await agent.Account.current();
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem('jwt', action.payload);
      state.token = action.payload;
    },
    logoutUser: (state) => {
      state.token = null;
      localStorage.removeItem('jwt');
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, registerUser.fulfilled, getUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(signInUser.rejected, registerUser.rejected, getUser.rejected),
      (state, action) => {
        throw action.payload;
      }
    );
  }
});

export const { setToken, logoutUser } = userSlice.actions;

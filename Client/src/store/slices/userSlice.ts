import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import agent from '../../api/agent';
import { CurrentUser, AuthUserFormValues, EditUserFormValues } from '../../utils/interfaces/user';
import { router } from '../../routes/router';
import { UserProfile } from '../../utils/interfaces/user';

interface UserState {
  currentUser: CurrentUser | null;
  token: string | null;
  profile: UserProfile | null;
}

const initialState: UserState = {
  currentUser: null,
  token: localStorage.getItem('jwt') || null,
  profile: null
};

export const signInUser = createAsyncThunk<CurrentUser, AuthUserFormValues>(
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

export const registerUser = createAsyncThunk<CurrentUser, AuthUserFormValues>(
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

export const getCurrentUser = createAsyncThunk<CurrentUser>(
  'user/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      return await agent.Account.current();
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

export const editProfile = createAsyncThunk<void, EditUserFormValues>(
  'user/editProfile',
  async (payload, thunkAPI) => {
    try {
      return await agent.Profile.edit(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const uploadImage = createAsyncThunk<void, { file: Blob; type: string }>(
  'user/uploadImage',
  async (payload, thunkAPI) => {
    try {
      await agent.Profile.uploadImage(payload.file, payload.type);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

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
      state.currentUser = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, registerUser.fulfilled, getCurrentUser.fulfilled),
      (state, action) => {
        state.currentUser = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(
        signInUser.rejected,
        registerUser.rejected,
        getCurrentUser.rejected,
        getProfile.rejected,
        editProfile.rejected,
        uploadImage.rejected
      ),
      (state, action) => {
        throw action.payload;
      }
    );
  }
});

export const { setToken, logoutUser } = userSlice.actions;

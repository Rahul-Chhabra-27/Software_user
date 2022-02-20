import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { goalService } from "./goalService";
const initialState = {
  goals: [],
  isLoading: false,
  isSuccess: false,
  isErorr: false,
  message: "",
};

// GET GOALS
export const getGoals = createAsyncThunk(
  "/goals/getGoal",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoal(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createGoal = createAsyncThunk(
  "/goals/create",
  async (goal, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goal, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals.push(action.payload);
        state.isSuccess = true;
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isErorr = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = action.payload;
        state.isSuccess = true;
        console.log(typeof action.payload);
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isErorr = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;

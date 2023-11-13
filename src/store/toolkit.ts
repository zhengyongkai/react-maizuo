import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getMovice = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([1, 23, 4]);
    }, 5000);
  });
};

export const asyncActionRequest: any = createAsyncThunk(
  'user/getAsync',
  async () => {
    const data = await getMovice();
    return data;
  }
);

export const slice = createSlice({
  name: 'user',
  reducers: {
    setName: (state, { payload }) => {
      state.name = payload.value;
    },
    setList: (state, { payload }) => {
      state.list = payload;
      return state;
    },
  },
  initialState: {
    name: '',
    list: [],
    loading: false,
  },
  extraReducers(builder) {
    builder.addCase(asyncActionRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(asyncActionRequest.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.list = payload as [];
    });
  },
});

const { setName, setList } = slice.actions;

export { setName, setList };

export default slice.reducer;

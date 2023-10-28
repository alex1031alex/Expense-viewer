import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  records: []
};

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setRecords: (state, action) => {
      if (action.payload) {
        state.records = action.payload;
      }
    },
    deleteRecord: (state, action) => {
      state.records = state.records.filter((it) => it.id !== action.payload);
    },
    addRecord: (state, action) => {
      state.records.push(action.payload);
    }
  }
});

export const {setRecords, deleteRecord, addRecord} = recordsSlice.actions;
export default recordsSlice.reducer;
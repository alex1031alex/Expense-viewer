import {createAsyncThunk} from "@reduxjs/toolkit";
import {setRecords, deleteRecord, addRecord} from "./reducer";
import {apiAddRecord, apiDeleteRecord, apiFetchRecords} from "../api";
import {convertRecordsToClientFormat, convertRecordToClientFormat} from "../utils";

export const fetchRecordsThunk = createAsyncThunk("api/fetchRecords", (_, thunk) => {
  return apiFetchRecords().then((records) => {
    const convertedRecords = convertRecordsToClientFormat(records);
    thunk.dispatch(setRecords(convertedRecords));
  })
});

export const deleteRecordThunk = createAsyncThunk("api/deleteRecord", (id, thunk) => {
  return apiDeleteRecord(id).then(() => {
    thunk.dispatch(deleteRecord(id));
  })
});

export const addRecordThunk = createAsyncThunk("api/addRecord", (data, thunk) => {
  return apiAddRecord(data).then((id) => {
    const adaptedData = convertRecordToClientFormat({...data, id});
    thunk.dispatch(addRecord(adaptedData));
  });
});

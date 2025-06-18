import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCountryOptions,
  getCountryCodeOptions,
  getRoleOptions,
  getCertificateOptions,
  getagentOptions
} from '../api/basic';
import { IOption } from '../api/basic/types';

export const fetchCountryOptions = createAsyncThunk('options/fetchCountryOptions', async () => {
  return await getCountryOptions();
});

export const fetchCountryCodeOptions = createAsyncThunk('options/fetchCountryCodeOptions', async () => {
  return await getCountryCodeOptions();
});

export const fetchRoleOptions = createAsyncThunk('options/fetchRoleOptions', async () => {
  return await getRoleOptions();
});

export const fetchCertificateOptions = createAsyncThunk('options/fetchCertificateOptions', async () => {
  return await getCertificateOptions();
});

export const fetchAgentOptions = createAsyncThunk('options/fetchAgentOptions', async () => {
  return await getagentOptions();
});

interface OptionsState {
  countryOptions: IOption[];
  countryCodeOptions: IOption[];
  roleOptions: IOption[];
  certificateOptions: IOption[];
  agentOptions: {id:string,name:string}[];
}

const initialState: OptionsState = {
  countryOptions: [],
  countryCodeOptions: [],
  roleOptions: [],
  certificateOptions: [],
  agentOptions: [],
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryOptions.fulfilled, (state, action) => {
        state.countryOptions = action.payload;
      })
      .addCase(fetchCountryCodeOptions.fulfilled, (state, action) => {
        state.countryCodeOptions = action.payload;
      })
      .addCase(fetchRoleOptions.fulfilled, (state, action) => {
        state.roleOptions = action.payload;
      })
      .addCase(fetchCertificateOptions.fulfilled, (state, action) => {
        state.certificateOptions = action.payload;
      })
      .addCase(fetchAgentOptions.fulfilled, (state, action) => {
        state.agentOptions = action.payload;
      });
  },
});

export default optionsSlice.reducer;


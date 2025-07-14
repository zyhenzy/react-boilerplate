import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCountryOptions,
  getCountryCodeOptions,
  getRoleOptions,
  getCertificateOptions,
  getAgentOptions,
  getCustomerOptions, getProductOptions
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
  return await getAgentOptions();
});

export const fetchCustomerOptions = createAsyncThunk('options/fetchCustomerOptions', async () => {
  return await getCustomerOptions();
});

export const fetchProductOptions = createAsyncThunk('options/fetchProductOptions', async () => {
  return await getProductOptions();
});

interface OptionsState {
  countryOptions: IOption[];
  countryCodeOptions: IOption[];
  roleOptions: IOption[];
  certificateOptions: IOption[];
  agentOptions: IOption[];
  customerOptions: IOption[];
  productOptions: IOption[];
}

const initialState: OptionsState = {
  countryOptions: [],
  countryCodeOptions: [],
  roleOptions: [],
  certificateOptions: [],
  agentOptions: [],
  customerOptions: [],
  productOptions: [],
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
      })
      .addCase(fetchCustomerOptions.fulfilled, (state, action) => {
        state.customerOptions = action.payload;
      })
      .addCase(fetchProductOptions.fulfilled, (state, action) => {
        state.productOptions = action.payload;
      });
  },
});

export default optionsSlice.reducer;

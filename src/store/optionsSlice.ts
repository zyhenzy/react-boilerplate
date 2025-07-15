import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCountryOptions,
  getCountryCodeOptions,
  getRoleOptions,
  getCertificateOptions,
  getAgentOptions,
  getCustomerOptions,
  getProductOptions,
  getAirlineOptions,
  getAirportOptions,
  getClassTypeOptions,
  getMealsOptions
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

export const fetchAirlineOptions = createAsyncThunk('options/fetchAirlineOptions', async () => {
  return await getAirlineOptions();
});

export const fetchAirportOptions = createAsyncThunk('options/fetchAirportOptions', async () => {
  return await getAirportOptions();
});

export const fetchClassTypeOptions = createAsyncThunk('options/fetchClassTypeOptions', async () => {
  return await getClassTypeOptions();
});

export const fetchMealsOptions = createAsyncThunk('options/fetchMealsOptions', async () => {
  return await getMealsOptions();
});


interface OptionsState {
  countryOptions: IOption[]; // 电话区号
  countryCodeOptions: IOption[]; // 国家编码
  roleOptions: IOption[];
  certificateOptions: IOption[];
  agentOptions: IOption[];
  customerOptions: IOption[];
  productOptions: IOption[];
  airlineOptions: IOption[];
  airportOptions: IOption[];
  classTypeOptions: IOption[];
  mealsOptions: IOption[];
}

const initialState: OptionsState = {
  countryOptions: [],
  countryCodeOptions: [],
  roleOptions: [],
  certificateOptions: [],
  agentOptions: [],
  customerOptions: [],
  productOptions: [],
  airlineOptions: [],
  airportOptions: [],
  classTypeOptions: [],
  mealsOptions: []
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
      })
      .addCase(fetchAirlineOptions.fulfilled, (state, action) => {
        state.airlineOptions = action.payload;
      })
      .addCase(fetchAirportOptions.fulfilled, (state, action) => {
        state.airportOptions = action.payload;
      })
      .addCase(fetchClassTypeOptions.fulfilled, (state, action) => {
        state.classTypeOptions = action.payload;
      })
      .addCase(fetchMealsOptions.fulfilled, (state, action) => {
        state.mealsOptions = action.payload;
      })
  },
});

export default optionsSlice.reducer;

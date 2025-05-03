import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCountries: [],
  countriesList: [],
  regionList: [],
  loading: { initialLoading: false, buttonLoading: false },
  pageCount: 10,
  isWidthChange: false,
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setAllCountries: (state, action) => {
      state.allCountries = action.payload;
    },
    setCountriesList: (state, action) => {
      state.countriesList = action.payload
    },
    setRegionList: (state, action) => {
      state.regionList = action.payload
    },
    setLoading: (state, action) => {
      state.loading = { ...state.loading, ...action.payload }
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload
    },
    setIsWidthChange(state, action) {
      state.isWidthChange = action.payload;
    },
  },
});

export const { setAllCountries, setCountriesList, setLoading, setRegionList, setPageCount, setIsWidthChange } = homeSlice.actions;

export default homeSlice.reducer;

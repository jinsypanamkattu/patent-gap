import { createSlice } from "@reduxjs/toolkit";

const patentSlice = createSlice({
  name: "patents",
  initialState: {
    patents: [],
    selectedPatent: null,
    stats: {
      activeScans: 0,
      patentsAnalyzed: 0,
      highRiskMatches: 0,
      clearedPatents: 0,
      lastScanDate: null,
      newResults: 0,
    },
    filters: {
      status: "all",
      category: "all",
      searchQuery: "",
    },
  },
  reducers: {
    setPatents: (state, action) => {
      state.patents = action.payload;
    },
    setSelectedPatent: (state, action) => {
      state.selectedPatent = action.payload;
    },
    addPatent: (state, action) => {
      state.patents.push(action.payload);
    },
    updatePatent: (state, action) => {
      const index = state.patents.findIndex(p => p._id === action.payload._id);
      if (index !== -1) state.patents[index] = action.payload;
    },
    deletePatent: (state, action) => {
      state.patents = state.patents.filter(p => p._id !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setStats: (state, action) => {          // ← new
      state.stats = { ...state.stats, ...action.payload };
    },
  },
});

export const {
  setPatents,
  setSelectedPatent,
  addPatent,
  updatePatent,
  deletePatent,
  setFilters,
  setStats,
} = patentSlice.actions;

export default patentSlice.reducer;

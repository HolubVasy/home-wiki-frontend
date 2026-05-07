import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from '../../types';

const initialState: SearchState = {
  recentSearches: [],
  currentSearch: '',
  loading: false,
  error: null
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCurrentSearch: (state, action: PayloadAction<string>) => {
      state.currentSearch = action.payload;
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const search = action.payload;
      // Remove if exists and add to beginning
      state.recentSearches = state.recentSearches.filter(s => s !== search);
      state.recentSearches.unshift(search);
      // Keep only last 5 searches
      state.recentSearches = state.recentSearches.slice(0, 5);
    },
    clearRecentSearches: state => {
      state.recentSearches = [];
    },
  },
});

export const { setCurrentSearch, addRecentSearch, clearRecentSearches } = searchSlice.actions;
export default searchSlice.reducer;

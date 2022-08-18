import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ResponseItem } from "@features/repos/api/getRecommendations";

export interface SongState {
  songsCount: number;
  songs: any[];
  error?: string;
}

const initialState: SongState = {
  songsCount: 0,
  songs: [],
  error: undefined,
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    successGetSongs: (state: SongState, action: PayloadAction<any[]>) => {
      state.songs = action.payload;
      state.songsCount = 0;
    },
  },
});

export const { successGetSongs } = songsSlice.actions;

export default songsSlice.reducer;

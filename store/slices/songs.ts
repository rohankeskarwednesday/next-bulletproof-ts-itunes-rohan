import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ResponseItem } from "@features/repos/api/getRecommendations";

export interface SongState {
  songsCount: number;
  songs: any[];
  activeSong: any;
  error?: string;
}

const initialState: SongState = {
  songsCount: 0,
  songs: [],
  activeSong: {},
  error: undefined,
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    successGetSongs: (state: SongState, action: PayloadAction<any[]>) => {
      state.songs = action.payload;
      state.songsCount = action.payload.length;
    },
    getSongById: (state: SongState, action: PayloadAction<any>) => {
      const { entity, trackId } = action.payload;

      if (!state.songsCount) return undefined;

      state.songs.forEach(song => {
        if (entity == "track") {
          if (song.trackId == trackId) {
            state.activeSong = song;
          }
        } else {
          if (song.collectionId == trackId) {
            state.activeSong = song;
          }
        }
      });
    },
  },
});

export const { successGetSongs, getSongById } = songsSlice.actions;

export default songsSlice.reducer;

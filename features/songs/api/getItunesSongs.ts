import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { convertObjectToCamelCase } from "@utils";
import { itunesApiService } from "@utils/apiUtils";

type Params = {
  searchTerm: string;
  offset: number;
  limit: number;
};

const songsAdapter = createEntityAdapter({
  selectId: (track: any) => (track.trackId ? track.trackId : track.collectionId),
});

const initialState = songsAdapter.getInitialState();

export const songsApi = itunesApiService.injectEndpoints({
  endpoints: builder => ({
    fetchSongs: builder.query<any, object>({
      query: (params: Params) => {
        if (!params.searchTerm || !params.offset || !params.limit) {
          throw new Error("Invalid params");
        }

        return `search?term=${params.searchTerm}&offset=${params.offset}&limit=${params.limit}`;
      },
      transformResponse: (response: any) => {
        return songsAdapter.setAll(initialState, response.results);
        // return convertObjectToCamelCase<any>(response);
      },
      providesTags: (result, error, arg) => [
        { type: "Track", id: "LIST" },
        ...result.ids.map(id => ({ type: "Track", id })),
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useFetchSongsQuery } = songsApi;

export const selectSongsResult: any = songsApi.endpoints.fetchSongs.select({
  searchTerm: "new song",
  offset: 0,
  limit: 10,
});

const selectSongsData = createSelector(selectSongsResult, songResult => {
  console.log({ songResult });
  return songResult.itunes;
});

export const {
  selectAll: selectAllSongs,
  selectById: selectSongById,
  selectIds: selectSongIds,
} = songsAdapter.getSelectors((state: any) => {
  console.log({ state });
  return selectSongsData(state) ?? initialState;
});

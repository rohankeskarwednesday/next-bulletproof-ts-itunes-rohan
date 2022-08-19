import { RepoInfoTypes as RepoInfoResponse } from "@features/info/types";
import { convertObjectToCamelCase } from "@utils";
import { itunesApiService } from "@utils/apiUtils";

type Params = {
  searchTerm: string;
  offset: number;
  limit: number;
};

export const songsApi = itunesApiService.injectEndpoints({
  endpoints: builder => ({
    fetchSongs: builder.query<RepoInfoResponse, object>({
      query: (params: Params) => {
        if (!params.searchTerm || !params.offset || !params.limit) {
          throw new Error("Invalid params");
        }

        return `search?term=${params.searchTerm}&offset=${params.offset}&limit=${params.limit}`;
      },
      transformResponse: (response: RepoInfoResponse) => {
        return convertObjectToCamelCase<RepoInfoResponse>(response);
      },
      providesTags: ["Tracks"],
    }),
  }),
  overrideExisting: false,
});

export const { useFetchSongsQuery } = songsApi;

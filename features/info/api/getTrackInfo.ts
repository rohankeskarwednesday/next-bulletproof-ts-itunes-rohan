import { RepoInfoTypes as RepoInfoResponse } from "@features/info/types";
import { convertObjectToCamelCase } from "@utils";
import { itunesApiService } from "@utils/apiUtils";

type Params = {
  trackId: string;
  entity: string;
};

export const trackInfoApi = itunesApiService.injectEndpoints({
  endpoints: builder => ({
    fetchTrackInfo: builder.query<RepoInfoResponse, object>({
      query: (params: Params) => {
        if (!params.trackId) {
          throw new Error("Invalid params");
        }

        return `lookup?id=${params.trackId}&entity=${params.entity}`;
      },
      transformResponse: (response: RepoInfoResponse) => {
        return convertObjectToCamelCase<RepoInfoResponse>(response);
      },
    }),
  }),
  overrideExisting: false,
});

export const { useFetchTrackInfoQuery } = trackInfoApi;

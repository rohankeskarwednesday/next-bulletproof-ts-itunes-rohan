import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import songReducer from "./slices/songs";
// import { recommendationsApi } from "@features/repos/api/getRecommendations";
// import { repoInfoApi } from "@features/info/api/getRepoInfo";
import middlewares from "./middlewares";
import { songsApi } from "@app/features/songs/api/getItunesSongs";
import { trackInfoApi } from "@app/features/info/api/getTrackInfo";
import { itunesApiService } from "@app/utils/apiUtils";

export const store = configureStore({
  reducer: {
    [itunesApiService.reducerPath]: itunesApiService.reducer,
    // [songsApi.reducerPath]: songsApi.reducer,
    // [trackInfoApi.reducerPath]: trackInfoApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

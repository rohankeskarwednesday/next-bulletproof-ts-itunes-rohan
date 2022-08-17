import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import songReducer from "@app/store/slices/songs";
// import { recommendationsApi } from "@features/repos/api/getRecommendations";
// import { repoInfoApi } from "@features/info/api/getRepoInfo";
import middlewares from "./middlewares";
import { songsApi } from "@app/features/songs/api/getItunesSongs";

export const store = configureStore({
  reducer: {
    songs: songReducer,
    [songsApi.reducerPath]: songsApi.reducer,
    // [repoInfoApi.reducerPath]: repoInfoApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

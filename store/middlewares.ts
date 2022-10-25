// import { repoInfoApi } from "@features/info";
import { itunesApiService } from "@app/utils/apiUtils";
// import { songsApi } from "@features/songs";

const middlewares = [itunesApiService.middleware];

export default middlewares;

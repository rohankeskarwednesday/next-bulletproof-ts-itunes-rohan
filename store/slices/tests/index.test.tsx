import reducer, { successGetSongs } from "../songs";

test("should return initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    songsCount: 0,
    songs: [],
    error: undefined,
  });
});

test("Should add given songs", () => {
  expect(
    reducer(
      undefined,
      successGetSongs([
        {
          trackName: "Test",
          collectionCensoredName: "Little Dragon",
          trackCensoredName: "Test",
          previewUrl:
            "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/af/83/79/af837916-90f9-d503-bf08-13ffb9957f21/mzaf_16662673119862695322.plus.aac.p.m4a",
          artworkUrl100:
            "https://is4-ssl.mzstatic.com/image/thumb/Music/a0/74/81/mzi.ybszkvnq.tif/100x100bb.jpg",
        },
      ])
    )
  ).toEqual({
    songsCount: 0,
    songs: [
      {
        trackName: "Test",
        collectionCensoredName: "Little Dragon",
        trackCensoredName: "Test",
        previewUrl:
          "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/af/83/79/af837916-90f9-d503-bf08-13ffb9957f21/mzaf_16662673119862695322.plus.aac.p.m4a",
        artworkUrl100:
          "https://is4-ssl.mzstatic.com/image/thumb/Music/a0/74/81/mzi.ybszkvnq.tif/100x100bb.jpg",
      },
    ],
    error: undefined,
  });
});

// import { render } from "@testing-library/react";
import { render } from "@utils/testUtils";
import SongsList from "../index";

describe("<SongsList />", () => {
  const songsListProps = {
    loading: false,
    error: undefined,
    data: {
      resultCount: 1,
      results: [
        {
          wrapperType: "track",
          kind: "song",
          artistId: 258535972,
          collectionId: 258615649,
          trackId: 258618600,
          artistName: "Little Dragon",
          collectionName: "Little Dragon",
          trackName: "Test",
          collectionCensoredName: "Little Dragon",
          trackCensoredName: "Test",
          artistViewUrl: "https://music.apple.com/us/artist/little-dragon/258535972?uo=4",
          collectionViewUrl: "https://music.apple.com/us/album/test/258615649?i=258618600&uo=4",
          trackViewUrl: "https://music.apple.com/us/album/test/258615649?i=258618600&uo=4",
          previewUrl:
            "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/af/83/79/af837916-90f9-d503-bf08-13ffb9957f21/mzaf_16662673119862695322.plus.aac.p.m4a",
          artworkUrl30:
            "https://is4-ssl.mzstatic.com/image/thumb/Music/a0/74/81/mzi.ybszkvnq.tif/30x30bb.jpg",
          artworkUrl60:
            "https://is4-ssl.mzstatic.com/image/thumb/Music/a0/74/81/mzi.ybszkvnq.tif/60x60bb.jpg",
          artworkUrl100:
            "https://is4-ssl.mzstatic.com/image/thumb/Music/a0/74/81/mzi.ybszkvnq.tif/100x100bb.jpg",
          collectionPrice: 9.99,
          trackPrice: 0.99,
          releaseDate: "2007-08-28T12:00:00Z",
          collectionExplicitness: "notExplicit",
          trackExplicitness: "notExplicit",
          discCount: 1,
          discNumber: 1,
          trackCount: 12,
          trackNumber: 10,
          trackTimeMillis: 268040,
          country: "USA",
          currency: "USD",
          primaryGenreName: "Electronic",
          isStreamable: true,
        },
      ],
    },
  };

  it("should render and match the snapshot", () => {
    const { baseElement } = render(<SongsList {...songsListProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  it("should contain 1 Song card", () => {
    const { getAllByTestId } = render(<SongsList {...songsListProps} />);
    expect(getAllByTestId("songs-list").length).toBe(1);
  });
});

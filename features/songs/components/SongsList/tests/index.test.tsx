// import { render } from "@testing-library/react";
import { fireEvent, render } from "@utils/testUtils";

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
          artworkUrl100:
            "https://is4-ssl.mzstatic.com/image/thumb/Music/a0/74/81/mzi.ybszkvnq.tif/100x100bb.jpg",
        },
        {
          wrapperType: "track",
          kind: "song",
          artistId: 420203509,
          collectionId: 1440858222,
          trackId: 1440858321,
          artistName: "Bastille",
          collectionName: "Bad Blood (Bonus Track Version)",
          trackName: "Pompeii",
          collectionCensoredName: "Bad Blood (Bonus Track Version)",
          trackCensoredName: "Pompeii",
          artistViewUrl: "https://music.apple.com/us/artist/bastille/420203509?uo=4",
          collectionViewUrl:
            "https://music.apple.com/us/album/pompeii/1440858222?i=1440858321&uo=4",
          trackViewUrl: "https://music.apple.com/us/album/pompeii/1440858222?i=1440858321&uo=4",
          previewUrl:
            "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/1e/e3/20/1ee32037-f1a3-e46b-011f-76552e7c5fa2/mzaf_6001471003681391544.plus.aac.p.m4a",

          artworkUrl100:
            "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e6/d8/61/e6d86177-ae8c-e84e-dfcc-0042687066ed/13UAAIM41955.rgb.jpg/100x100bb.jpg",
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

  it("should play one song at a time", async () => {
    const { getByTestId } = render(<SongsList {...songsListProps} />);
    const firstTrack: any = getByTestId("258618600");
    const secondTrack = getByTestId("1440858321");

    fireEvent.play(firstTrack);
    fireEvent.play(secondTrack);

    expect(firstTrack.paused).toBe(true);
  });
});

window.HTMLMediaElement.prototype.load = () => {
  /* do nothing */
};

window.HTMLMediaElement.prototype.pause = () => {
  /* do nothing */
};

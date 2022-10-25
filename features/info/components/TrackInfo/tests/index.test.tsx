import { render } from "@utils/testUtils";
import TrackInfo from "../index";

describe("<TrackInfo />", () => {
  const songInfoProps = {
    data: {
      results: [
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
          artworkUrl30:
            "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e6/d8/61/e6d86177-ae8c-e84e-dfcc-0042687066ed/13UAAIM41955.rgb.jpg/30x30bb.jpg",
          artworkUrl60:
            "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e6/d8/61/e6d86177-ae8c-e84e-dfcc-0042687066ed/13UAAIM41955.rgb.jpg/60x60bb.jpg",
          artworkUrl100:
            "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e6/d8/61/e6d86177-ae8c-e84e-dfcc-0042687066ed/13UAAIM41955.rgb.jpg/100x100bb.jpg",
          collectionPrice: 6.99,
          trackPrice: 1.29,
          releaseDate: "2013-01-11T12:00:00Z",
          collectionExplicitness: "notExplicit",
          trackExplicitness: "notExplicit",
          discCount: 1,
          discNumber: 1,
          trackCount: 15,
          trackNumber: 1,
          trackTimeMillis: 214148,
          country: "USA",
          currency: "USD",
          //   primaryGenreName: "Alternative",
          isStreamable: true,
        },
      ],
    },
  };

  it("should not show track genre", () => {
    const { queryByTestId } = render(<TrackInfo {...songInfoProps} />);

    const genreName = queryByTestId("track-genre");

    expect(genreName).toBe(null);
  });

  it("should show view details link", () => {
    const { queryByTestId } = render(<TrackInfo {...songInfoProps} />);

    const genreName = queryByTestId("view-details");

    expect(genreName).not.toBe(null);
  });
});

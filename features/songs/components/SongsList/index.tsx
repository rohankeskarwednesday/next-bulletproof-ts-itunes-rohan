/**
 *
 * RepoList
 *
 */

import React, { useState } from "react";
import Link from "next/link";
import get from "lodash/get";
import { Skeleton, Card, Alert } from "antd";
import { T, If } from "@common";
import { useIntl } from "react-intl";
import styles from "@app/styles/SongList.module.css";
import AudioPlayer from "@features/songs/components/AudioPlayer";

interface SongListProps {
  data?: any;
  loading: boolean;
  error?: any;
}

const { Meta } = Card;

const SongsList: React.FC<SongListProps> = props => {
  const { data, loading, error } = props;

  const [currentSong, setCurrentSong] = useState<string>("");

  const intl = useIntl();

  const items: any[] = get(data, "results", []);
  const totalCount: number = get(data, "resultCount", 0);
  const BlockText = props => <T display="block" {...props} />;

  const errorOccured = error != undefined && error.message != "Invalid params";

  return errorOccured ? (
    <Alert
      type="error"
      message={intl.formatMessage({ id: "song_search_failed" })}
      style={{ marginTop: "10px" }}
    />
  ) : (
    <If condition={items.length !== 0 || loading}>
      <div data-testid="songs-list" className={styles.SongList}>
        <Skeleton loading={loading} active>
          {items.map((item, index: number) => (
            <Link
              href={`/tracks/${item.trackId ? item.trackId : item.collectionId}?entity=${
                item.wrapperType == "track" ? "song" : item.wrapperType
              }`}
              key={index}
            >
              <Card
                hoverable
                style={{ width: 200, marginTop: "30px", backgroundColor: "#f5f5f5" }}
                cover={
                  <div
                    style={{
                      backgroundImage: `url(${item.artworkUrl100.replace("100x100", "600x600")})`,
                      width: "100%",
                      height: "200px",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  // <img
                  //   src={item.artworkUrl100.replace("100x100", "600x600")}
                  //   style={{ maxHeight: "200px" }}
                  // />
                }
              >
                <Meta
                  title={
                    <BlockText
                      id="song_name"
                      values={{ collectionCensoredName: item.collectionCensoredName }}
                    />
                  }
                  description={""}
                />
                <AudioPlayer
                  currentSongUrl={currentSong}
                  playSong={(songUrl: string) => {
                    setCurrentSong(songUrl);
                  }}
                  songUrl={item.previewUrl}
                  trackId={item.trackId}
                />
              </Card>
            </Link>
          ))}
        </Skeleton>
      </div>
    </If>
  );
};

export default SongsList;

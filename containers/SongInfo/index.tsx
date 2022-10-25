import { EmptyResult } from "@features/info/components";
import { If, Loader } from "@common";
import React, { useEffect } from "react";
import { ReactComponentLike } from "prop-types";
import TrackInfo from "@app/features/info/components/TrackInfo";
import isEmpty from "lodash/isEmpty";
import { useFetchTrackInfoQuery } from "@app/features/info/api/getTrackInfo";
import { Alert } from "antd";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { selectAllSongs, selectSongById } from "@app/features/songs/api/getItunesSongs";

interface SongInfoProps {
  trackId: string;
  entity: string;
}

const SongInfo: React.FC<SongInfoProps> = ({ trackId, entity }) => {
  const tracks = useSelector(selectAllSongs);

  console.log(tracks);

  const track = useSelector(state => selectSongById(state, Number(trackId)));

  const { data, error, isLoading } = useFetchTrackInfoQuery({
    trackId: trackId,
    entity: entity,
  });

  const intl = useIntl();

  if (isLoading) return <Loader />;

  if (error || !data)
    return (
      <Alert
        type="error"
        message={intl.formatMessage({ id: "track_details_failed" })}
        style={{ margin: "10px" }}
      />
    );

  return (
    <If condition={!isEmpty(data)} otherwise={<EmptyResult />}>
      <TrackInfo data={data} />
    </If>
  );
};

export default SongInfo as ReactComponentLike;

import { If, T } from "@common";
import { Card, Tag } from "antd";
import isEmpty from "lodash/isEmpty";
import { ReactComponentLike } from "prop-types";
import React, { memo } from "react";
import { injectIntl, IntlShape } from "react-intl";
import { compose } from "redux";
import Link from "next/link";

const { Meta } = Card;

interface TrackInfoProps {
  intl: IntlShape;
  data: any;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ intl, data }) => {
  const trackInfo = data.results[0];

  const {
    trackCensoredName,
    collectionCensoredName,
    artistName,
    primaryGenreName,
    artworkUrl100,
    kind,
    trackViewUrl,
    collectionViewUrl,
  } = trackInfo;

  const colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];

  const BlockText = props => <T display="block" {...props} />;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        style={{ width: 400, height: "auto", maxHeight: 630, margin: "20px" }}
        cover={
          <div
            style={{
              backgroundImage: `url(${artworkUrl100.replace("100x100", "600x600")})`,
              width: "100%",
              height: "400px",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        }
      >
        <Meta
          title={trackCensoredName ? trackCensoredName : collectionCensoredName}
          description={artistName}
        />
        <If condition={!isEmpty(primaryGenreName)}>
          <p style={{ marginTop: "20px" }} data-testid="track-genre">
            {intl.formatMessage({ id: "track_genre" })}
            <Tag
              style={{ borderRadius: "100px", marginLeft: "10px" }}
              color={colors[Math.floor(Math.random() * (colors.length - 0 + 1)) + 0]}
            >
              {primaryGenreName}
            </Tag>
          </p>
        </If>
        <If condition={!isEmpty(kind)}>
          <BlockText
            id="track_kind"
            data-testid="track-kind"
            values={{ kind: kind }}
            style={{ fontSize: "15px", marginTop: "10px" }}
          />
        </If>
        <If condition={!isEmpty(collectionViewUrl)}>
          <Link href={collectionViewUrl}>
            <a href={collectionViewUrl} target="__blank" data-testid="view-details">
              <p style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}>
                {intl.formatMessage({ id: "view_track_details" })}
              </p>
            </a>
          </Link>
        </If>
      </Card>
    </div>
  );
};

export default compose(injectIntl, memo)(TrackInfo) as ReactComponentLike;

/**
 *
 * RepoList
 *
 */

import React from "react";
import get from "lodash/get";
import { Skeleton, Card, Alert } from "antd";
import { T, If } from "@common";
import { useIntl } from "react-intl";

interface SongListProps {
  data?: any;
  loading: boolean;
  error?: any;
}

const { Meta } = Card;

const SongsList: React.FC<SongListProps> = props => {
  const { data, loading, error } = props;
  const intl = useIntl();

  const items: any[] = get(data, "results", []);
  const totalCount: number = get(data, "resultCount", 0);
  const BlockText = props => <T display="block" {...props} />;

  const errorOccured = error != undefined && error.message != "Invalid params";

  return errorOccured ? (
    <Alert
      type="error"
      message={intl.formatMessage({ id: "request_failed" })}
      // message={}
      style={{ marginTop: "10px" }}
    />
  ) : (
    <If condition={items.length !== 0 || loading}>
      {totalCount !== 0 && (
        <BlockText id="matching_songs" values={{ totalCount }} style={{ marginTop: "10px" }} />
      )}
      <div data-testid="songs-list" style={{ display: "flex", flexWrap: "wrap" }}>
        <Skeleton loading={loading} active>
          {items.map((item, index: number) => (
            <Card
              key={index}
              hoverable
              style={{ width: 200, marginLeft: "20px", marginTop: "30px" }}
              cover={<img src={item.artworkUrl100} />}
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
            </Card>
          ))}
        </Skeleton>
      </div>
    </If>
  );
};

export default SongsList;
